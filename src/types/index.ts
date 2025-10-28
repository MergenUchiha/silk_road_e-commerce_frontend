export interface Category {
    id: string;
    title: string;
}

export interface Image {
    id: string;
    fileName: string;
    filePath: string;
    size: string;
    mimeType: string;
    originalName: string;
    logo: boolean;
    productId?: string;
}

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    size: string;
    categoryId: string;
    images: Image[];
}

export interface User {
    id: string;
    firstName: string;
    secondName: string;
    phoneNumber: string;
    isVerified: boolean;
}

export interface BasketItem {
    id: string;
    productId: string;
    product: Product;
    quantity: number;
}

export interface ShippingData {
    city: string;
    street: string;
    dateOfDelivery: string;
}

export interface Order {
    id: string;
    totalPrice: number;
    userId: string;
    status: "PROCESSING" | "CANCELLED" | "COMPLETED";
    createdAt: string;
    orderItems: OrderItem[];
    shipping?: ShippingData;
}

export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    product: Product;
    quantity: number;
}

export interface RegisterData {
    firstName: string;
    secondName: string;
    phoneNumber: string;
    password: string;
}
