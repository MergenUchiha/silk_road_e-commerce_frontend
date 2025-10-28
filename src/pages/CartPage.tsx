import React from "react";
import { ShoppingCart } from "lucide-react";
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
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="text-center py-16 bg-white rounded-lg shadow-md">
                    <ShoppingCart
                        size={64}
                        className="mx-auto text-gray-300 mb-4"
                    />
                    <h2 className="text-2xl font-bold mb-2">Cart is Empty</h2>
                    <p className="text-gray-600 mb-6">
                        Add products from catalog
                    </p>
                    <button
                        onClick={() => setCurrentPage("products")}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                    >
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="space-y-4 mb-8">
                {basket.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromBasket}
                    />
                ))}
            </div>

            <CartSummary
                total={total}
                onCheckout={onCheckout}
                user={user}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default CartPage;
