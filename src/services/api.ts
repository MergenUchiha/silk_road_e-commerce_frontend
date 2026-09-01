import {
    Category,
    Product,
    Basket,
    ShippingData,
    Order,
    RegisterData,
    User,
    LoginResponse,
    PageQuery,
} from "../types";

const API_URL = process.env.REACT_APP_BACKEND_URL ?? "";

const ACCESS_TOKEN_KEY = "accessToken";

/**
 * Reports a missing base URL as a normal request failure, so the app renders
 * its error screen instead of firing requests at "undefined/...".
 */
function requireApiUrl(): string {
    if (!API_URL) {
        throw new Error(
            "REACT_APP_BACKEND_URL is not set. Copy .env.example to .env and set it."
        );
    }
    return API_URL;
}

interface RequestOptions {
    method?: string;
    /** Serialized as a JSON body with the matching Content-Type. */
    body?: unknown;
    /** Sends the bearer token and allows a refresh retry on 401. */
    auth?: boolean;
}

/** Unwraps the `{ good, response, count }` envelope used by the API. */
interface ApiEnvelope<T> {
    good?: boolean;
    response?: T;
    count?: number;
    message?: string;
}

async function parseResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response
            .json()
            .catch(() => ({ message: "An error occurred" }));
        throw new Error(
            error.errorMessage ||
                error.message ||
                `Request failed with status ${response.status}`
        );
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return (await response.json()) as T;
}

let refreshInFlight: Promise<void> | null = null;

/**
 * Exchanges the httpOnly refresh cookie for a new access token.
 *
 * Concurrent callers share one request, so a burst of 401s does not trigger a
 * burst of refreshes.
 */
function refreshSession(): Promise<void> {
    if (!refreshInFlight) {
        refreshInFlight = (async () => {
            const response = await fetch(`${requireApiUrl()}/client/auth/refresh`, {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Session expired");
            }

            const data = (await response.json()) as ApiEnvelope<LoginResponse>;
            const payload = data.response ?? (data as unknown as LoginResponse);

            if (!payload?.accessToken) {
                throw new Error("Session expired");
            }

            localStorage.setItem(ACCESS_TOKEN_KEY, payload.accessToken);
        })().finally(() => {
            refreshInFlight = null;
        });
    }

    return refreshInFlight;
}

async function request<T>(
    path: string,
    { method = "GET", body, auth = false }: RequestOptions = {},
    allowRetry = true
): Promise<T> {
    const headers: Record<string, string> = {};

    if (body !== undefined) {
        headers["Content-Type"] = "application/json";
    }

    if (auth) {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
    }

    const response = await fetch(`${requireApiUrl()}${path}`, {
        method,
        headers,
        credentials: "include",
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });

    // The access token is short-lived; renew it once and replay the request
    // before surfacing an error to the user.
    if (
        response.status === 401 &&
        auth &&
        allowRetry &&
        localStorage.getItem(ACCESS_TOKEN_KEY)
    ) {
        try {
            await refreshSession();
        } catch {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            throw new Error("Your session has expired. Please sign in again.");
        }

        return request<T>(path, { method, body, auth }, false);
    }

    return parseResponse<T>(response);
}

/** Reads the payload out of the API envelope. */
function unwrap<T>(data: ApiEnvelope<T> | T): T {
    if (data && typeof data === "object" && "response" in data) {
        return (data as ApiEnvelope<T>).response as T;
    }
    return data as T;
}

function buildQuery(query?: PageQuery): string {
    const params = new URLSearchParams();
    if (query?.page) params.append("page", query.page.toString());
    if (query?.take) params.append("take", query.take.toString());
    if (query?.q) params.append("q", query.q);
    const search = params.toString();
    return search ? `?${search}` : "";
}

// ---------------------------------------------------------------- Auth

export const register = async (
    userData: RegisterData & { firstName?: string; secondName?: string }
): Promise<{ user: User; userId: string }> => {
    const data = await request<ApiEnvelope<User>>("/client/auth/registration", {
        method: "POST",
        body: {
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName?.trim() || "",
            secondName: userData.secondName?.trim() || "",
        },
    });

    const user = unwrap<User>(data);
    return { user, userId: user.id };
};

export const verifyUser = async (
    userId: string,
    code: string
): Promise<boolean> => {
    await request(`/client/auth/verification/${userId}`, {
        method: "PATCH",
        body: { code },
    });
    return true;
};

export const resendVerificationCode = async (
    userId: string
): Promise<boolean> => {
    await request(`/client/auth/resend-verification/${userId}`, {
        method: "POST",
    });
    return true;
};

export const login = async (
    email: string,
    password: string
): Promise<LoginResponse> => {
    const data = await request<ApiEnvelope<LoginResponse>>(
        "/client/auth/login",
        { method: "POST", body: { email, password } }
    );

    const loginData = unwrap<LoginResponse>(data);

    if (loginData.accessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, loginData.accessToken);
    }
    // The refresh token is deliberately not stored: the backend sends it as an
    // httpOnly cookie that `credentials: "include"` replays on /refresh.

    return loginData;
};

export const logout = async (): Promise<void> => {
    try {
        await request("/client/auth/logout", { method: "POST", auth: true });
    } finally {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
};

export const getMe = async (): Promise<User> => {
    const data = await request<ApiEnvelope<User>>("/client/auth/me", {
        auth: true,
    });
    return unwrap<User>(data);
};

export const updateProfile = async (userData: Partial<User>): Promise<User> => {
    const data = await request<ApiEnvelope<User>>("/client/auth/me/edit", {
        method: "PATCH",
        body: userData,
        auth: true,
    });
    return unwrap<User>(data);
};

// ------------------------------------------------------------ Categories

export const getCategories = async (query?: PageQuery): Promise<Category[]> => {
    const data = await request<ApiEnvelope<Category[]>>(
        `/category${buildQuery(query)}`
    );
    const categories = unwrap<Category[]>(data);
    return Array.isArray(categories) ? categories : [];
};

export const getCategory = async (categoryId: string): Promise<Category> => {
    const data = await request<ApiEnvelope<Category>>(
        `/category/${categoryId}`
    );
    return unwrap<Category>(data);
};

// -------------------------------------------------------------- Products

export const getProducts = async (
    query?: PageQuery
): Promise<{ products: Product[]; count: number }> => {
    const data = await request<ApiEnvelope<Product[]>>(
        `/product${buildQuery(query)}`
    );

    const products = unwrap<Product[]>(data);

    if (!Array.isArray(products)) {
        return { products: [], count: 0 };
    }

    return {
        products,
        count: (data as ApiEnvelope<Product[]>).count ?? products.length,
    };
};

export const getProduct = async (productId: string): Promise<Product> => {
    const data = await request<ApiEnvelope<Product>>(`/product/${productId}`);
    return unwrap<Product>(data);
};

// ---------------------------------------------------------------- Basket

export const getMyBasket = async (): Promise<Basket> => {
    const data = await request<ApiEnvelope<Basket>>("/basket/my", {
        auth: true,
    });
    return unwrap<Basket>(data);
};

export const addToBasket = async (
    productId: string,
    quantity: number = 1
): Promise<Basket> => {
    const data = await request<ApiEnvelope<Basket>>("/basket", {
        method: "POST",
        body: { productId, quantity },
        auth: true,
    });
    return unwrap<Basket>(data);
};

export const updateBasketItem = async (
    basketItemId: string,
    quantity: number
): Promise<Basket> => {
    const data = await request<ApiEnvelope<Basket>>(
        `/basket/${basketItemId}`,
        { method: "PATCH", body: { quantity }, auth: true }
    );
    return unwrap<Basket>(data);
};

export const removeBasketItem = async (
    basketItemId: string
): Promise<boolean> => {
    await request(`/basket/${basketItemId}`, {
        method: "DELETE",
        auth: true,
    });
    return true;
};

export const clearBasket = async (): Promise<boolean> => {
    await request("/basket", { method: "DELETE", auth: true });
    return true;
};

// ---------------------------------------------------------------- Orders

export const createOrder = async (
    shippingData: ShippingData
): Promise<Order> => {
    const data = await request<ApiEnvelope<Order>>("/orders", {
        method: "POST",
        body: shippingData,
        auth: true,
    });
    return unwrap<Order>(data);
};

export const getMyOrders = async (): Promise<Order[]> => {
    const data = await request<ApiEnvelope<Order[]>>("/orders/my", {
        auth: true,
    });
    const orders = unwrap<Order[]>(data);
    return Array.isArray(orders) ? orders : [];
};

export const getOrder = async (orderId: string): Promise<Order> => {
    const data = await request<ApiEnvelope<Order>>(`/orders/${orderId}`, {
        auth: true,
    });
    return unwrap<Order>(data);
};

export const updateOrderStatus = async (
    orderId: string,
    status: "PROCESSING" | "COMPLETED" | "CANCELLED"
): Promise<Order> => {
    const data = await request<ApiEnvelope<Order>>(`/orders/${orderId}`, {
        method: "PATCH",
        body: { status },
        auth: true,
    });
    return unwrap<Order>(data);
};

export const cancelOrder = async (orderId: string): Promise<boolean> => {
    await request(`/orders/${orderId}`, { method: "DELETE", auth: true });
    return true;
};

// --------------------------------------------------------------- Reviews

export const createReview = async (
    productId: string,
    comment: string,
    rating: number
): Promise<boolean> => {
    await request("/review", {
        method: "POST",
        body: { productId, comment, rating },
        auth: true,
    });
    return true;
};

export const deleteReview = async (reviewId: string): Promise<boolean> => {
    await request(`/review/${reviewId}`, { method: "DELETE", auth: true });
    return true;
};
