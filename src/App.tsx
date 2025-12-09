import React, { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import VerificationPage from "./pages/VerificationPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import OrdersPage from "./pages/OrdersPage";

import {
    Category,
    Product,
    BasketItem,
    User,
    ShippingData,
    RegisterData,
} from "./types";
import * as api from "./services/api";

function App() {
    const [currentPage, setCurrentPage] = useState<string>("home");
    const [selectedProductId, setSelectedProductId] = useState<string | null>(
        null
    );
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [productsCount, setProductsCount] = useState<number>(0);
    const [basket, setBasket] = useState<BasketItem[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [pendingVerificationUserId, setPendingVerificationUserId] = useState<
        string | null
    >(null);

    useEffect(() => {
        const savedPage = localStorage.getItem("currentPage");
        if (savedPage) {
            setCurrentPage(savedPage);
        }
        loadInitialData();
    }, []);

    const navigateToPage = (page: string, productId?: string) => {
        setCurrentPage(page);
        localStorage.setItem("currentPage", page);
        if (productId) {
            setSelectedProductId(productId);
        }
    };

    const loadInitialData = async () => {
        try {
            setLoading(true);

            const [categoriesData, productsData] = await Promise.all([
                api.getCategories(),
                api.getProducts({ page: 1, take: 15 }),
            ]);

            console.log("Categories loaded:", categoriesData);
            console.log("Products loaded:", productsData);

            setCategories(categoriesData);
            setProducts(productsData.products);
            setProductsCount(productsData.count);

            const token = localStorage.getItem("accessToken");
            if (token) {
                try {
                    const userData = await api.getMe();
                    console.log("User data:", userData);
                    setUser(userData);
                    await loadBasket();
                } catch (error) {
                    console.error("Failed to get user:", error);
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                }
            }
        } catch (error) {
            console.error("Failed to load initial data:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadProducts = async (
        page: number,
        take: number = 15,
        categoryId?: string
    ) => {
        try {
            const productsData = await api.getProducts({ page, take });
            console.log(`Products loaded for page ${page}:`, productsData);
            setProducts(productsData.products);
            setProductsCount(productsData.count);
        } catch (error) {
            console.error("Failed to load products:", error);
        }
    };

    const loadBasket = async () => {
        try {
            const basketData = await api.getMyBasket();
            console.log("Basket loaded:", basketData);
            setBasket(basketData.basketItems || []);
        } catch (error) {
            console.error("Failed to load basket:", error);
            setBasket([]);
        }
    };

    const handleLogin = async (email: string, password: string) => {
        try {
            const loginData = await api.login(email, password);
            console.log("Login response:", loginData);
            setUser({
                id: loginData.id,
                email: loginData.email,
                firstName: loginData.firstName,
                secondName: loginData.secondName,
            });
            await loadBasket();
            navigateToPage("home");
        } catch (error: any) {
            console.error("Login error:", error);
            alert(error.message || "Login failed");
        }
    };

    const handleRegister = async (
        userData: RegisterData & { firstName: string; secondName: string }
    ) => {
        try {
            const result = await api.register(userData);
            console.log("Registration result:", result);
            setPendingVerificationUserId(result.userId);
            navigateToPage("verification");
        } catch (error: any) {
            console.error("Registration error:", error);
            alert(error.message || "Registration failed");
        }
    };

    const handleVerification = async (code: string) => {
        if (!pendingVerificationUserId) return;

        try {
            await api.verifyUser(pendingVerificationUserId, code);
            alert("Account verified successfully! Please login.");
            setPendingVerificationUserId(null);
            navigateToPage("login");
        } catch (error: any) {
            console.error("Verification error:", error);
            alert(error.message || "Verification failed");
        }
    };

    const handleResendCode = async () => {
        if (!pendingVerificationUserId) return;

        try {
            await api.resendVerificationCode(pendingVerificationUserId);
            alert("Verification code resent!");
        } catch (error: any) {
            console.error("Resend code error:", error);
            alert(error.message || "Failed to resend code");
        }
    };

    const handleLogout = async () => {
        try {
            await api.logout();
            setUser(null);
            setBasket([]);
            localStorage.removeItem("currentPage");
            navigateToPage("home");
        } catch (error) {
            console.error("Logout failed:", error);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("currentPage");
            setUser(null);
            setBasket([]);
            navigateToPage("home");
        }
    };

    const addToBasket = async (productId: string, quantity: number = 1) => {
        if (!user) {
            navigateToPage("login");
            return;
        }

        try {
            const basketData = await api.addToBasket(productId, quantity);
            console.log("Basket after adding:", basketData);
            setBasket(basketData.basketItems || []);
            alert(`${quantity} item(s) added to cart!`);
        } catch (error: any) {
            console.error("Add to basket error:", error);
            alert(error.message || "Failed to add to basket");
        }
    };

    const updateQuantity = async (itemId: string, quantity: number) => {
        if (quantity < 1) return;

        try {
            const basketData = await api.updateBasketItem(itemId, quantity);
            console.log("Basket after update:", basketData);
            setBasket(basketData.basketItems || []);
        } catch (error: any) {
            console.error("Update quantity error:", error);
            alert(error.message || "Failed to update quantity");
        }
    };

    const removeFromBasket = async (itemId: string) => {
        try {
            await api.removeBasketItem(itemId);
            setBasket(basket.filter((item) => item.id !== itemId));
        } catch (error: any) {
            console.error("Remove from basket error:", error);
            alert(error.message || "Failed to remove item");
        }
    };

    const handleCheckout = async (shippingData: ShippingData) => {
        try {
            await api.createOrder(shippingData);
            setBasket([]);
            navigateToPage("home");
            alert("Order placed successfully!");
        } catch (error: any) {
            console.error("Checkout error:", error);
            alert(error.message || "Failed to place order");
        }
    };

    const updateProfile = async (updatedData: Partial<User>) => {
        try {
            const updatedUser = await api.updateProfile(updatedData);
            console.log("Profile updated:", updatedUser);
            setUser(updatedUser);
            alert("Profile updated successfully!");
        } catch (error: any) {
            console.error("Update profile error:", error);
            alert(error.message || "Failed to update profile");
        }
    };

    const handleViewProduct = (productId: string) => {
        console.log("Viewing product:", productId);
        navigateToPage("product-detail", productId);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-2xl font-bold text-indigo-600">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar
                currentPage={currentPage}
                setCurrentPage={navigateToPage}
                user={user}
                basketCount={basket.length}
                onLogout={handleLogout}
            />

            <main className="flex-1">
                {currentPage === "home" && (
                    <HomePage setCurrentPage={navigateToPage} />
                )}

                {currentPage === "products" && (
                    <ProductsPage
                        categories={categories}
                        products={products}
                        totalCount={productsCount}
                        onAddToCart={addToBasket}
                        onLoadProducts={loadProducts}
                        onViewProduct={handleViewProduct}
                    />
                )}

                {currentPage === "product-detail" && selectedProductId && (
                    <ProductDetailPage
                        productId={selectedProductId}
                        user={user}
                        setCurrentPage={navigateToPage}
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
                        setCurrentPage={navigateToPage}
                        onCheckout={handleCheckout}
                    />
                )}

                {currentPage === "login" && (
                    <LoginPage
                        handleLogin={handleLogin}
                        setCurrentPage={navigateToPage}
                    />
                )}

                {currentPage === "register" && (
                    <RegisterPage
                        handleRegister={handleRegister}
                        setCurrentPage={navigateToPage}
                    />
                )}

                {currentPage === "verification" &&
                    pendingVerificationUserId && (
                        <VerificationPage
                            userId={pendingVerificationUserId}
                            onVerified={handleVerification}
                            onResendCode={handleResendCode}
                        />
                    )}

                {currentPage === "orders" && (
                    <OrdersPage setCurrentPage={navigateToPage} />
                )}

                {currentPage === "profile" && user && (
                    <ProfilePage user={user} updateProfile={updateProfile} />
                )}
            </main>

            <Footer setCurrentPage={navigateToPage} />
        </div>
    );
}

export default App;
