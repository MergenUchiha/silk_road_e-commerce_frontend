import React from "react";
import { Package, Eye } from "lucide-react";
import { Product } from "../../types";

interface ProductCardProps {
    product: Product;
    onAddToCart: (productId: string) => void;
    onViewProduct: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onAddToCart,
    onViewProduct,
}) => {
    const imageUrl =
        product.images && product.images.length > 0
            ? `${product.images[0].filePath}`
            : null;

    const handleViewClick = () => {
        console.log("ProductCard: View clicked for", product.id);
        onViewProduct(product.id);
    };

    const handleAddToCartClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log("ProductCard: Add to cart clicked for", product.id);
        onAddToCart(product.id);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition h-full flex flex-col">
            <div
                className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative cursor-pointer"
                onClick={handleViewClick}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <Package size={48} className="text-gray-400" />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition">
                        <div className="bg-white rounded-full p-3">
                            <Eye size={24} className="text-indigo-600" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <h3
                    className="font-bold text-lg mb-2 cursor-pointer hover:text-indigo-600 transition"
                    onClick={handleViewClick}
                >
                    {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
                    {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto gap-2">
                    <span className="text-2xl font-bold text-indigo-600">
                        ${product.price.toLocaleString()}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={handleViewClick}
                            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                            title="View details"
                        >
                            <Eye size={18} />
                        </button>
                        <button
                            onClick={handleAddToCartClick}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
