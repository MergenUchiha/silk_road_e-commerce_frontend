import React, { useState, useEffect, useCallback } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import NotFoundPage from "./pages/NotFoundPage";

import {
    Category,
    Product,
    BasketItem,
    User,
    ShippingData,
    RegisterData,
} from "./types";
import * as api from "./services/api";
import {
    identifyUser,
    trackEvent,
    resetUser,
    setUserProperties,
} from "./services/posthog";

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [productsCount, setProductsCount] = useState<number>(0);
    const [basket, setBasket] = useState<BasketItem[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    const loadBasket = useCallback(async () => {
        try {
            const basketData = await api.getMyBasket();
            setBasket(basketData.basketItems || []);
        } catch (error) {
            setBasket([]);
        }
    }, []);

    const loadInitialData = useCallback(async () => {
        try {
            setLoading(true);
            setLoadError(null);

            const [categoriesData, productsData] = await Promise.all([
                api.getCategories(),
                api.getProducts({ page: 1, take: 15 }),
            ]);

            setCategories(categoriesData);
            setProducts(productsData.products);
            setProductsCount(productsData.count);

            const token = localStorage.getItem("accessToken");
            if (token) {
                try {
                    const userData = await api.getMe();
                    setUser(userData);

                    identifyUser(userData.id, {
                        email: userData.email,
                        firstName: userData.firstName,
                        secondName: userData.secondName,
                    });

                    await loadBasket();
                } catch (error) {
                    // The session could not be restored — start as a guest.
                    localStorage.removeItem("accessToken");
                }
            }
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Unknown error";
            setLoadError(message);
            trackEvent("error", { type: "load_initial_data", message });
        } finally {
            setLoading(false);
        }
    }, [loadBasket]);

    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);

    // One page_view per navigation, keyed by the real URL.
    useEffect(() => {
        trackEvent("page_view", { path: location.pathname });
    }, [location.pathname]);

    const loadProducts = async (
        page: number,
        take: number = 15,
        categoryId?: string
    ) => {
        try {
            const productsData = await api.getProducts({ page, take });
            setProducts(productsData.products);
            setProductsCount(productsData.count);

            trackEvent("products_loaded", {
                page,
                count: productsData.count,
                categoryId,
            });
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Unknown error";
            trackEvent("error", { type: "load_products", message });
            alert(`Failed to load products: ${message}`);
        }
    };

    const handleLogin = async (email: string, password: string) => {
        try {
            const loginData = await api.login(email, password);

            const userData = {
                id: loginData.id,
                email: loginData.email,
                firstName: loginData.firstName,
                secondName: loginData.secondName,
            };

            setUser(userData);

            identifyUser(userData.id, {
                email: userData.email,
                firstName: userData.firstName,
                secondName: userData.secondName,
            });

            trackEvent("user_logged_in", { userId: userData.id });

            await loadBasket();
            navigate("/");
        } catch (error: any) {
            trackEvent("login_failed", { error: error.message });
            alert(error.message || "Login failed");
        }
    };

    const handleRegister = async (
        userData: RegisterData & { firstName: string; secondName: string }
    ) => {
        try {
            const result = await api.register(userData);

            trackEvent("user_registered", { userId: result.userId });

            navigate(`/verification/${result.userId}`);
        } catch (error: any) {
            trackEvent("registration_failed", { error: error.message });
            alert(error.message || "Registration failed");
        }
    };

    const handleVerification = async (userId: string, code: string) => {
        try {
            await api.verifyUser(userId, code);

            trackEvent("user_verified", { userId });

            alert("Account verified successfully! Please login.");
            navigate("/login");
        } catch (error: any) {
            trackEvent("verification_failed", { error: error.message });
            alert(error.message || "Verification failed");
        }
    };

    const handleResendCode = async (userId: string) => {
        try {
            await api.resendVerificationCode(userId);
            trackEvent("verification_code_resent", { userId });
            alert("Verification code resent!");
        } catch (error: any) {
            alert(error.message || "Failed to resend code");
        }
    };

    const handleLogout = async () => {
        try {
            await api.logout();
            trackEvent("user_logged_out", { userId: user?.id });
        } catch (error) {
            // The session is being dropped locally regardless of the result.
            localStorage.removeItem("accessToken");
        } finally {
            resetUser();
            setUser(null);
            setBasket([]);
        }
    };

    const addToBasket = async (productId: string, quantity: number = 1) => {
        if (!user) {
            navigate("/login");
            return;
        }

        try {
            const basketData = await api.addToBasket(productId, quantity);
            setBasket(basketData.basketItems || []);

            trackEvent("product_added_to_cart", {
                productId,
                quantity,
                userId: user.id,
            });

            alert(`${quantity} item(s) added to cart!`);
        } catch (error: any) {
            trackEvent("add_to_cart_failed", {
                productId,
                error: error.message,
            });
            alert(error.message || "Failed to add to basket");
        }
    };

    const updateQuantity = async (itemId: string, quantity: number) => {
        if (quantity < 1) return;

        try {
            const basketData = await api.updateBasketItem(itemId, quantity);
            setBasket(basketData.basketItems || []);

            trackEvent("cart_quantity_updated", {
                itemId,
                quantity,
                userId: user?.id,
            });
        } catch (error: any) {
            alert(error.message || "Failed to update quantity");
        }
    };

    const removeFromBasket = async (itemId: string) => {
        try {
            await api.removeBasketItem(itemId);
            setBasket(basket.filter((item) => item.id !== itemId));

            trackEvent("product_removed_from_cart", {
                itemId,
                userId: user?.id,
            });
        } catch (error: any) {
            alert(error.message || "Failed to remove item");
        }
    };

    const handleCheckout = async (shippingData: ShippingData) => {
        try {
            const order = await api.createOrder(shippingData);

            const totalAmount = basket.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
            );

            trackEvent("order_completed", {
                orderId: order.id,
                totalAmount,
                itemsCount: basket.length,
                userId: user?.id,
                city: shippingData.city,
                deliveryDate: shippingData.dateOfDelivery,
            });

            setBasket([]);
            navigate("/orders");
            alert("Order placed successfully!");
        } catch (error: any) {
            trackEvent("checkout_failed", {
                error: error.message,
                userId: user?.id,
            });
            alert(error.message || "Failed to place order");
        }
    };

    const updateProfile = async (updatedData: Partial<User>) => {
        try {
            const updatedUser = await api.updateProfile(updatedData);
            setUser(updatedUser);

            setUserProperties({
                firstName: updatedUser.firstName,
                secondName: updatedUser.secondName,
                email: updatedUser.email,
            });

            trackEvent("profile_updated", { userId: updatedUser.id });

            alert("Profile updated successfully!");
        } catch (error: any) {
            alert(error.message || "Failed to update profile");
        }
    };

    /** Sends signed-out visitors to the login page, remembering where they were. */
    const RequireAuth = ({ children }: { children: React.ReactElement }) =>
        user ? (
            children
        ) : (
            <Navigate to="/login" state={{ from: location }} replace />
        );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-2xl font-bold text-indigo-600">
                    Loading...
                </div>
            </div>
        );
    }

    if (loadError) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 px-4 text-center">
                <h1 className="text-2xl font-bold text-gray-800">
                    Could not reach the store
                </h1>
                <p className="text-gray-600">{loadError}</p>
                <button
                    onClick={loadInitialData}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                    Try again
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar
                user={user}
                basketCount={basket.length}
                onLogout={handleLogout}
            />

            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<HomePage />} />

                    <Route
                        path="/products"
                        element={
                            <ProductsPage
                                categories={categories}
                                products={products}
                                totalCount={productsCount}
                                onAddToCart={addToBasket}
                                onLoadProducts={loadProducts}
                            />
                        }
                    />

                    <Route
                        path="/products/:productId"
                        element={
                            <ProductDetailPage
                                user={user}
                                onAddToCart={addToBasket}
                            />
                        }
                    />

                    <Route path="/about" element={<AboutPage />} />

                    <Route
                        path="/cart"
                        element={
                            <CartPage
                                basket={basket}
                                updateQuantity={updateQuantity}
                                removeFromBasket={removeFromBasket}
                                user={user}
                                onCheckout={handleCheckout}
                            />
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            user ? (
                                <Navigate to="/" replace />
                            ) : (
                                <LoginPage handleLogin={handleLogin} />
                            )
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            user ? (
                                <Navigate to="/" replace />
                            ) : (
                                <RegisterPage handleRegister={handleRegister} />
                            )
                        }
                    />

                    <Route
                        path="/verification/:userId"
                        element={
                            <VerificationPage
                                onVerified={handleVerification}
                                onResendCode={handleResendCode}
                            />
                        }
                    />

                    <Route
                        path="/orders"
                        element={
                            <RequireAuth>
                                <OrdersPage />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <RequireAuth>
                                <ProfilePage
                                    user={user as User}
                                    updateProfile={updateProfile}
                                />
                            </RequireAuth>
                        }
                    />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;
