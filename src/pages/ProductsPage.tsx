import React, { useState, useEffect } from "react";
import Pagination from "../components/common/Pagination";
import { Category, Product } from "../types";
import CategoryFilter from "../components/products/CategoryFilter";
import ProductList from "../components/products/ProductList";

interface ProductsPageProps {
    categories: Category[];
    products: Product[];
    totalCount: number;
    onAddToCart: (productId: string) => void;
    onLoadProducts: (
        page: number,
        take: number,
        categoryId?: string
    ) => Promise<void>;
    onViewProduct: (productId: string) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({
    categories,
    products,
    totalCount,
    onAddToCart,
    onLoadProducts,
    onViewProduct,
}) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const productsPerPage = 15;

    console.log("ProductsPage: onViewProduct type:", typeof onViewProduct);
    console.log("ProductsPage: onViewProduct:", onViewProduct);

    const safeProducts = Array.isArray(products) ? products : [];

    const filteredProducts = selectedCategory
        ? safeProducts.filter((p) => p.categoryId === selectedCategory)
        : safeProducts;

    const effectiveTotalCount = selectedCategory
        ? filteredProducts.length
        : totalCount;

    const totalPages = Math.ceil(effectiveTotalCount / productsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    useEffect(() => {
        if (!selectedCategory) {
            handlePageChange(currentPage);
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [currentPage]);

    const handlePageChange = async (page: number) => {
        if (!selectedCategory) {
            setIsLoading(true);
            setCurrentPage(page);
            try {
                await onLoadProducts(page, productsPerPage);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } catch (error) {
                console.error("Failed to load page:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleViewProduct = (productId: string) => {
        console.log("ProductsPage: handleViewProduct called with:", productId);
        console.log("ProductsPage: Calling onViewProduct...");
        onViewProduct(productId);
    };

    const displayProducts = selectedCategory
        ? filteredProducts.slice(
              (currentPage - 1) * productsPerPage,
              currentPage * productsPerPage
          )
        : safeProducts;

    console.log("=== Products Page Debug ===");
    console.log("Total count from backend:", totalCount);
    console.log("Selected category:", selectedCategory);
    console.log("Filtered products count:", filteredProducts.length);
    console.log("Effective total count:", effectiveTotalCount);
    console.log("Products per page:", productsPerPage);
    console.log("Total pages:", totalPages);
    console.log("Current page:", currentPage);
    console.log("Display products:", displayProducts.length);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 overflow-hidden py-16">
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        }}
                    ></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent mb-4">
                        Products Catalog
                    </h1>
                    <p className="text-indigo-200 text-lg">
                        Discover exceptional quality textiles from Romania and
                        Turkmenistan
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

                {isLoading ? (
                    <div className="text-center py-16">
                        <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Loading products...
                        </div>
                    </div>
                ) : displayProducts.length > 0 ? (
                    <>
                        <ProductList
                            products={displayProducts}
                            onAddToCart={onAddToCart}
                            onViewProduct={handleViewProduct}
                        />

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                        <p className="text-gray-500 text-xl font-medium">
                            {safeProducts.length === 0
                                ? "No products available."
                                : "No products available in this category."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
