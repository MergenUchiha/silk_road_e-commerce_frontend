import React, { useState, useEffect } from "react";
import Pagination from "../components/common/Pagination";
import { Category, Product } from "../types";
import CategoryFilter from "../components/products/CategoryFilter";
import ProductList from "../components/products/ProductList";

interface ProductsPageProps {
    categories: Category[];
    products: Product[];
    onAddToCart: (productId: string) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({
    categories,
    products,
    onAddToCart,
}) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    // Filter products by category
    const filteredProducts = selectedCategory
        ? products.filter((p) => p.categoryId === selectedCategory)
        : products;

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = filteredProducts.slice(
        startIndex,
        startIndex + productsPerPage
    );

    // Reset to page 1 when category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Products Catalog</h1>

            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            <ProductList products={currentProducts} onAddToCart={onAddToCart} />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default ProductsPage;
