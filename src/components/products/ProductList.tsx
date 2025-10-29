import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../types";

interface ProductListProps {
    products: Product[];
    onAddToCart: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
    // Safety check
    if (!Array.isArray(products)) {
        console.error("Products is not an array:", products);
        return (
            <div className="text-center py-8 text-gray-500">
                No products available
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No products found
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
    );
};

export default ProductList;
