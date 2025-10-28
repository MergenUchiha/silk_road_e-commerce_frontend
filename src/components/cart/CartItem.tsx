import React from "react";
import { Package, Plus, Minus, Trash2 } from "lucide-react";
import { BasketItem } from "../../types";

interface CartItemProps {
    item: BasketItem;
    onUpdateQuantity: (itemId: string, quantity: number) => void;
    onRemove: (itemId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
    item,
    onUpdateQuantity,
    onRemove,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex-shrink-0 flex items-center justify-center">
                {item.product.images && item.product.images.length > 0 ? (
                    <img
                        src={item.product.images[0].filePath}
                        alt={item.product.title}
                        className="w-full h-full object-cover rounded-lg"
                    />
                ) : (
                    <Package size={32} className="text-gray-400" />
                )}
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg mb-1">{item.product.title}</h3>
                <p className="text-gray-600">
                    ${item.product.price.toLocaleString()}
                </p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-2 border rounded-lg hover:bg-gray-100 transition"
                >
                    <Minus size={16} />
                </button>
                <span className="w-12 text-center font-bold">
                    {item.quantity}
                </span>
                <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-2 border rounded-lg hover:bg-gray-100 transition"
                >
                    <Plus size={16} />
                </button>
            </div>

            <div className="font-bold text-lg w-28 text-right">
                ${(item.product.price * item.quantity).toLocaleString()}
            </div>

            <button
                onClick={() => onRemove(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
            >
                <Trash2 size={20} />
            </button>
        </div>
    );
};

export default CartItem;
