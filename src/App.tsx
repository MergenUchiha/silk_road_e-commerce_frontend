import React, { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import { mockCategories, mockProducts, mockUser } from "./utils/mockData";
import {
    Category,
    Product,
    BasketItem,
    User,
    ShippingData,
    RegisterData,
} from "./types";

function App() {
    const [currentPage, setCurrentPage] = useState<string>("home");
    const [categories] = useState<Category[]>(mockCategories);
    const [products] = useState<Product[]>(mockProducts);
    const [basket, setBasket] = useState<BasketItem[]>([]);
    const [user, setUser] = useState<User | null>(null); // Change to mockUser to test logged-in state

    // Authentication handlers
    const handleLogin = (phoneNumber: string, password: string) => {
        // Mock login - replace with API call
        setUser(mockUser);
        setCurrentPage("home");
        alert("Login successful! (demo)");
    };

    const handleRegister = (userData: RegisterData) => {
        // Mock register - replace with API call
        setUser({ ...mockUser, ...userData });
        setCurrentPage("home");
        alert("Registration successful! (demo)");
    };

    const handleLogout = () => {
        setUser(null);
        setBasket([]);
        setCurrentPage("home");
    };

    // Cart handlers
    const addToBasket = (productId: string) => {
        if (!user) {
            setCurrentPage("login");
            return;
        }

        const product = products.find((p) => p.id === productId);
        if (!product) return;

        const existingItem = basket.find(
            (item) => item.productId === productId
        );

        if (existingItem) {
            setBasket(
                basket.map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setBasket([
                ...basket,
                {
                    id: `basket-${Date.now()}`,
                    productId,
                    product,
                    quantity: 1,
                },
            ]);
        }
    };

    const updateQuantity = (itemId: string, quantity: number) => {
        if (quantity < 1) return;
        setBasket(
            basket.map((item) =>
                item.id === itemId ? { ...item, quantity } : item
            )
        );
    };

    const removeFromBasket = (itemId: string) => {
        setBasket(basket.filter((item) => item.id !== itemId));
    };

    const handleCheckout = (shippingData: ShippingData) => {
        // Mock checkout - replace with API call
        console.log("Order placed:", { basket, shippingData });
        alert("Order placed successfully! (demo)");
        setBasket([]);
        setCurrentPage("home");
    };

    // Profile handler
    const updateProfile = (updatedData: Partial<User>) => {
        if (user) {
            setUser({ ...user, ...updatedData });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                user={user}
                basketCount={basket.length}
                onLogout={handleLogout}
            />

            <main className="flex-1">
                {currentPage === "home" && (
                    <HomePage setCurrentPage={setCurrentPage} />
                )}

                {currentPage === "products" && (
                    <ProductsPage
                        categories={categories}
                        products={products}
                        onAddToCart={addToBasket}
                    />
                )}

                {currentPage === "about" && <AboutPage />}

                {currentPage === "cart" && (
                    <CartPage
                        basket={basket}
                        updateQuantity={updateQuantity}
                        removeFromBasket={removeFromBasket}
                        user={user}
                        setCurrentPage={setCurrentPage}
                        onCheckout={handleCheckout}
                    />
                )}

                {currentPage === "login" && (
                    <LoginPage
                        handleLogin={handleLogin}
                        setCurrentPage={setCurrentPage}
                    />
                )}

                {currentPage === "register" && (
                    <RegisterPage
                        handleRegister={handleRegister}
                        setCurrentPage={setCurrentPage}
                    />
                )}

                {currentPage === "profile" && user && (
                    <ProfilePage user={user} updateProfile={updateProfile} />
                )}
            </main>

            <Footer setCurrentPage={setCurrentPage} />
        </div>
    );
}

export default App;
