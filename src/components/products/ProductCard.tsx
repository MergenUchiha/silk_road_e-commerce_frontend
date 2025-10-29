import React from "react";
import { Package } from "lucide-react";
import { Product } from "../../types";

interface ProductCardProps {
    product: Product;
    onAddToCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    const imageUrl =
        product.images && product.images.length > 0
            ? `${product.images[0].filePath}`
            : null;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition h-full flex flex-col">
            <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <Package size={48} className="text-gray-400" />
                )}
            </div>
            <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-lg mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
                    {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-indigo-600">
                        ${product.price.toLocaleString()}
                    </span>
                    <button
                        onClick={() => onAddToCart(product.id)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
