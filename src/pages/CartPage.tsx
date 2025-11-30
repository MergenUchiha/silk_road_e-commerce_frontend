import React from "react";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { BasketItem, ShippingData, User } from "../types";

interface CartPageProps {
    basket: BasketItem[];
    updateQuantity: (itemId: string, quantity: number) => void;
    removeFromBasket: (itemId: string) => void;
    user: User | null;
    setCurrentPage: (page: string) => void;
    onCheckout: (shippingData: ShippingData) => void;
}

const CartPage: React.FC<CartPageProps> = ({
    basket,
    updateQuantity,
    removeFromBasket,
    user,
    setCurrentPage,
    onCheckout,
}) => {
    const total = basket.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    if (basket.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center py-16 bg-white rounded-2xl shadow-xl border border-amber-100">
                        <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingCart
                                size={64}
                                className="text-amber-600"
                            />
                        </div>
                        <h2 className="text-3xl font-bold mb-4 text-slate-800">
                            Your Cart is Empty
                        </h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            Discover our exclusive collection of premium
                            textiles
                        </p>
                        <button
                            onClick={() => setCurrentPage("products")}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 rounded-lg hover:from-amber-500 hover:to-yellow-600 transition font-bold text-lg shadow-lg"
                        >
                            <ShoppingCart size={20} />
                            Start Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => setCurrentPage("products")}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4 font-medium transition"
                    >
                        <ArrowLeft size={20} />
                        Continue Shopping
                    </button>
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">
                        Shopping Cart
                    </h1>
                    <p className="text-gray-600">
                        {basket.length} {basket.length === 1 ? "item" : "items"}{" "}
                        in your cart
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {basket.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeFromBasket}
                            />
                        ))}
                    </div>

                    {/* Cart Summary - Sticky */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <CartSummary
                                total={total}
                                onCheckout={onCheckout}
                                user={user}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
