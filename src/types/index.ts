export interface Category {
    id: string;
    title: string;
    products?: Product[];
}

export interface Image {
    id: string;
    fileName: string;
    filePath: string;
    size: string;
    mimeType: string;
    originalName: string;
    logo: boolean;
    createdAt?: string;
    updatedAt?: string;
    productId?: string | null;
}

export interface User {
    id: string;
    firstName?: string;
    secondName?: string;
    email: string;
}

export interface BasketItem {
    id: string;
    quantity: number;
    product: Product;
}

export interface Basket {
    id: string;
    basketItems: BasketItem[];
}

export interface ShippingData {
    city: string;
    street: string;
    dateOfDelivery: string;
}

export interface OrderItem {
    id: string;
    quantity: string;
    product: Product;
}

export interface Order {
    id: string;
    totalPrice: number;
    status: "PROCESSING" | "CANCELLED" | "COMPLETED";
    orderItems: OrderItem[];
    shipping: ShippingData;
}

export interface RegisterData {
    email: string;
    password: string;
}

export interface LoginResponse {
    id: string;
    email: string;
    firstName?: string;
    secondName?: string;
    accessToken: string;
    refreshToken: string;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
}

export interface PageQuery {
    page?: number;
    take?: number;
    q?: string;
}

export interface Review {
    id: string;
    comment: string;
    rating: number;
    user: User;
}

export interface Product {
    id: string;
    title: string;
    description: string;
    size: string;
    price: number;
    categoryId: string;
    images?: Image[];
    reviews?: Review[];
}

export interface CreateReviewData {
    productId: string;
    comment: string;
    rating: number;
}
