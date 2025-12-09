import { Category, Product, User } from "../types";

export const mockCategories: Category[] = [
    { id: "1", title: "Electronics" },
    { id: "2", title: "Clothing" },
    { id: "3", title: "Books" },
    { id: "4", title: "Sports" },
    { id: "5", title: "Home & Garden" },
    { id: "6", title: "Toys" },
    { id: "7", title: "Beauty" },
];

export const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
    id: `product-${i + 1}`,
    title: `Product ${i + 1}`,
    description:
        "High-quality product with amazing features and great value for money. Perfect for everyday use.",
    price: Math.floor(Math.random() * 10000) + 1000,
    size: "Universal",
    categoryId:
        mockCategories[Math.floor(Math.random() * mockCategories.length)].id,
    images: [],
}));

export const mockUser: User = {
    id: "user-1",
    firstName: "John",
    secondName: "Doe",
    email: "john@gmail.com",
};
