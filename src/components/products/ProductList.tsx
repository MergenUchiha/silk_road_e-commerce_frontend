import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../types";

interface ProductListProps {
    products: Product[];
    onAddToCart: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
