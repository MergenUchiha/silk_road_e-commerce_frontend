import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../types";

interface ProductListProps {
    products: Product[];
    onAddToCart: (productId: string) => void;
    onViewProduct: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({
    products,
    onAddToCart,
    onViewProduct,
}) => {
    // Debug log
    console.log("ProductList: onViewProduct type:", typeof onViewProduct);
    console.log("ProductList: onViewProduct:", onViewProduct);

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

    const handleViewProduct = (productId: string) => {
        console.log("ProductList: handleViewProduct called with:", productId);
        console.log("ProductList: Calling onViewProduct...");
        onViewProduct(productId);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onViewProduct={handleViewProduct}
                />
            ))}
        </div>
    );
};

export default ProductList;
