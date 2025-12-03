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

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Helper function to get auth headers (with Content-Type)
const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem("accessToken");
    return {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };
};

// Helper function to get auth headers WITHOUT Content-Type (for DELETE/GET)
const getAuthHeadersWithoutContentType = (): HeadersInit => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        return {
            Authorization: `Bearer ${token}`,
        };
    }
    return {};
};

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response
            .json()
            .catch(() => ({ message: "An error occurred" }));
        throw new Error(
            error.message || `HTTP error! status: ${response.status}`
        );
    }

    const json = await response.json();

    // Возвращаем весь ответ (включая count)
    if (json && typeof json === "object" && "good" in json) {
        return json as T;
    }

    return json as T;
}

// Authentication
export const register = async (
    userData: RegisterData & { firstName?: string; secondName?: string }
): Promise<{ user: User; userId: string }> => {
    const requestBody = {
        phoneNumber: userData.phoneNumber,
        password: userData.password,
        firstName: userData.firstName?.trim() || "",
        secondName: userData.secondName?.trim() || "",
    };

    const response = await fetch(`${API_URL}/client/auth/registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
    });
    const data: any = await handleResponse(response);
    const user = data.response || data;
    return { user, userId: user.id };
};

export const verifyUser = async (
    userId: string,
    code: string
): Promise<boolean> => {
    const response = await fetch(
        `${API_URL}/client/auth/verification/${userId}`,
        {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
        }
    );
    await handleResponse<any>(response);
    return true;
};

export const resendVerificationCode = async (
    userId: string
): Promise<boolean> => {
    const response = await fetch(
        `${API_URL}/client/auth/resend-verification/${userId}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }
    );
    await handleResponse<any>(response);
    return true;
};

export const login = async (
    phoneNumber: string,
    password: string
): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/client/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, password }),
        credentials: "include",
    });
    const data: any = await handleResponse(response);
    const loginData = data.response || data;

    if (loginData.accessToken) {
        localStorage.setItem("accessToken", loginData.accessToken);
    }
    if (loginData.refreshToken) {
        localStorage.setItem("refreshToken", loginData.refreshToken);
    }

    return loginData;
};

export const logout = async (): Promise<void> => {
    await fetch(`${API_URL}/client/auth/logout`, {
        method: "POST",
        headers: getAuthHeadersWithoutContentType(),
        credentials: "include",
    });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

export const getMe = async (): Promise<User> => {
    const response = await fetch(`${API_URL}/client/auth/me`, {
        method: "GET",
        headers: getAuthHeadersWithoutContentType(),
        credentials: "include",
    });
    const data: any = await handleResponse(response);
    return data.response || data;
};

export const updateProfile = async (userData: Partial<User>): Promise<User> => {
    const response = await fetch(`${API_URL}/client/auth/me/edit`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(userData),
    });
    const data: any = await handleResponse(response);
    return data.response || data;
};

export const refreshToken = async (): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/client/auth/refresh`, {
        method: "GET",
        credentials: "include",
    });
    const data: any = await handleResponse(response);
    const loginData = data.response || data;

    if (loginData.accessToken) {
        localStorage.setItem("accessToken", loginData.accessToken);
    }

    return loginData;
};

// Categories
export const getCategories = async (query?: PageQuery): Promise<Category[]> => {
    try {
        const params = new URLSearchParams();
        if (query?.page) params.append("page", query.page.toString());
        if (query?.take) params.append("take", query.take.toString());
        if (query?.q) params.append("q", query.q);

        const url = `${API_URL}/category${
            params.toString() ? `?${params.toString()}` : ""
        }`;
        const response = await fetch(url);
        const data: any = await handleResponse(response);
        const categories = data.response || data;

        if (Array.isArray(categories)) {
            return categories;
        }

        console.warn("Categories response is not an array:", categories);
        return [];
    } catch (error) {
        console.error("Failed to load categories:", error);
        return [];
    }
};

export const getCategory = async (categoryId: string): Promise<Category> => {
    const response = await fetch(`${API_URL}/category/${categoryId}`);
    const data: any = await handleResponse(response);
    return data.response || data;
};

// Products
export const getProducts = async (
    query?: PageQuery
): Promise<{ products: Product[]; count: number }> => {
    try {
        const params = new URLSearchParams();
        if (query?.page) params.append("page", query.page.toString());
        if (query?.take) params.append("take", query.take.toString());
        if (query?.q) params.append("q", query.q);

        const url = `${API_URL}/product${
            params.toString() ? `?${params.toString()}` : ""
        }`;
        const response = await fetch(url);
        const data: any = await handleResponse(response);

        console.log("Products API response:", data);

        if (data && data.response && Array.isArray(data.response)) {
            return {
                products: data.response,
                count: data.count || data.response.length,
            };
        }

        if (Array.isArray(data)) {
            console.warn("Backend returned array instead of object with count");
            return {
                products: data,
                count: data.length,
            };
        }

        console.warn("Unexpected products response:", data);
        return {
            products: [],
            count: 0,
        };
    } catch (error) {
        console.error("Failed to load products:", error);
        return {
            products: [],
            count: 0,
        };
    }
};

export const getProduct = async (productId: string): Promise<Product> => {
    const response = await fetch(`${API_URL}/product/${productId}`);
    const data: any = await handleResponse(response);
    return data.response || data;
};

// Basket
export const getMyBasket = async (): Promise<Basket> => {
    const response = await fetch(`${API_URL}/basket/my`, {
        method: "GET",
        headers: getAuthHeadersWithoutContentType(),
        credentials: "include",
    });
    const data: any = await handleResponse(response);
    return data.response || data;
};

export const addToBasket = async (
    productId: string,
    quantity: number = 1
): Promise<Basket> => {
    const response = await fetch(`${API_URL}/basket`, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({ productId, quantity }),
    });
    const data: any = await handleResponse(response);
    return data.response || data;
};

export const updateBasketItem = async (
    basketItemId: string,
    quantity: number
): Promise<Basket> => {
    const response = await fetch(`${API_URL}/basket/${basketItemId}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({ quantity }),
    });
    const data: any = await handleResponse(response);
    return data.response || data;
};

export const removeBasketItem = async (
    basketItemId: string
): Promise<boolean> => {
    const response = await fetch(`${API_URL}/basket/${basketItemId}`, {
        method: "DELETE",
        headers: getAuthHeadersWithoutContentType(),
        credentials: "include",
    });
    await handleResponse<any>(response);
    return true;
};

export const clearBasket = async (): Promise<boolean> => {
    const response = await fetch(`${API_URL}/basket`, {
        method: "DELETE",
        headers: getAuthHeadersWithoutContentType(),
        credentials: "include",
    });
    await handleResponse<any>(response);
    return true;
};

// Orders - UPDATED TO MATCH BACKEND
export const createOrder = async (
    shippingData: ShippingData
): Promise<Order> => {
    const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(shippingData),
    });
    const data: any = await handleResponse(response);
    return data.response || data;
};

export const getMyOrders = async (): Promise<Order[]> => {
    try {
        const response = await fetch(`${API_URL}/orders/my`, {
            method: "GET",
            headers: getAuthHeadersWithoutContentType(),
            credentials: "include",
        });
        const data: any = await handleResponse(response);
        const orders = data.response || data;

        if (Array.isArray(orders)) {
            return orders;
        }

        return [];
    } catch (error) {
        console.error("Failed to load orders:", error);
        return [];
    }
};

export const getOrder = async (orderId: string): Promise<Order> => {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "GET",
        headers: getAuthHeadersWithoutContentType(),
        credentials: "include",
    });
    const data: any = await handleResponse(response);
    return data.response || data;
};

export const updateOrderStatus = async (
    orderId: string,
    status: "PROCESSING" | "COMPLETED" | "CANCELLED"
): Promise<Order> => {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({ status }),
    });
    const data: any = await handleResponse(response);
    return data.response || data;
};

export const cancelOrder = async (orderId: string): Promise<boolean> => {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "DELETE",
        headers: getAuthHeadersWithoutContentType(),
        credentials: "include",
    });
    await handleResponse<any>(response);
    return true;
};

// Reviews
export const createReview = async (
    productId: string,
    comment: string,
    rating: number
): Promise<boolean> => {
    const response = await fetch(`${API_URL}/review`, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({ productId, comment, rating }),
    });
    await handleResponse<any>(response);
    return true;
};

export const deleteReview = async (reviewId: string): Promise<boolean> => {
    const response = await fetch(`${API_URL}/review/${reviewId}`, {
        method: "DELETE",
        headers: getAuthHeadersWithoutContentType(),
        credentials: "include",
    });
    await handleResponse<any>(response);
    return true;
};
