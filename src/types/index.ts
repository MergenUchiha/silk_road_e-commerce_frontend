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

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    size: string;
    categoryId: string;
    images?: Image[];
}

export interface User {
    id: string;
    firstName?: string;
    secondName?: string;
    phoneNumber: string;
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
    phoneNumber: string;
    password: string;
}

export interface LoginResponse {
    id: string;
    phoneNumber: string;
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
