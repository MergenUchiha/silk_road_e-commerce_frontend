import React, { useState } from "react";
import { ShippingData, User } from "../../types";

interface CartSummaryProps {
    total: number;
    onCheckout: (shippingData: ShippingData) => void;
    user: User | null;
    setCurrentPage: (page: string) => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
    total,
    onCheckout,
    user,
    setCurrentPage,
}) => {
    const [showCheckout, setShowCheckout] = useState(false);
    const [shippingData, setShippingData] = useState<ShippingData>({
        city: "",
        street: "",
        dateOfDelivery: "",
    });

    const handleCheckout = () => {
        if (!user) {
            setCurrentPage("login");
            return;
        }

        if (
            !shippingData.city ||
            !shippingData.street ||
            !shippingData.dateOfDelivery
        ) {
            alert("Please fill in all shipping information");
            return;
        }

        onCheckout(shippingData);
        setShowCheckout(false);
        setShippingData({
            city: "",
            street: "",
            dateOfDelivery: "",
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center text-2xl font-bold mb-6">
                <span>Total:</span>
                <span className="text-indigo-600">
                    ${total.toLocaleString()}
                </span>
            </div>

            {!showCheckout ? (
                <button
                    onClick={() => {
                        if (!user) {
                            setCurrentPage("login");
                        } else {
                            setShowCheckout(true);
                        }
                    }}
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-lg font-bold"
                >
                    Proceed to Checkout
                </button>
            ) : (
                <div className="space-y-4">
                    <h3 className="font-bold text-lg">Shipping Information</h3>
                    <input
                        type="text"
                        placeholder="City"
                        value={shippingData.city}
                        onChange={(e) =>
                            setShippingData({
                                ...shippingData,
                                city: e.target.value,
                            })
                        }
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Street and house number"
                        value={shippingData.street}
                        onChange={(e) =>
                            setShippingData({
                                ...shippingData,
                                street: e.target.value,
                            })
                        }
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <input
                        type="date"
                        value={shippingData.dateOfDelivery}
                        onChange={(e) =>
                            setShippingData({
                                ...shippingData,
                                dateOfDelivery: e.target.value,
                            })
                        }
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        min={new Date().toISOString().split("T")[0]}
                    />
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowCheckout(false)}
                            className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleCheckout}
                            className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-bold"
                        >
                            Confirm Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartSummary;
