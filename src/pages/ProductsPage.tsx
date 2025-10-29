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
}

const ProductsPage: React.FC<ProductsPageProps> = ({
    categories,
    products,
    totalCount,
    onAddToCart,
    onLoadProducts,
}) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const productsPerPage = 10;

    // Безопасно преобразуем в массив
    const safeProducts = Array.isArray(products) ? products : [];

    // Filter products by category (фильтрация на фронте)
    const filteredProducts = selectedCategory
        ? safeProducts.filter((p) => p.categoryId === selectedCategory)
        : safeProducts;

    // Для фильтрации по категории считаем страницы от отфильтрованных
    const effectiveTotalCount = selectedCategory
        ? filteredProducts.length
        : totalCount;

    const totalPages = Math.ceil(effectiveTotalCount / productsPerPage);

    // Reset to page 1 when category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    // Загрузка новой страницы при изменении currentPage
    useEffect(() => {
        if (!selectedCategory) {
            // Если категория не выбрана, загружаем с бэкенда
            handlePageChange(currentPage);
        } else {
            // Если категория выбрана, просто скроллим вверх
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // Если выбрана категория, делаем клиентскую пагинацию
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
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Products Catalog</h1>

            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            {isLoading ? (
                <div className="text-center py-16">
                    <div className="text-xl text-indigo-600 font-bold">
                        Loading products...
                    </div>
                </div>
            ) : displayProducts.length > 0 ? (
                <>
                    <ProductList
                        products={displayProducts}
                        onAddToCart={onAddToCart}
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
                <div className="text-center py-16 bg-white rounded-lg shadow-md">
                    <p className="text-gray-500 text-xl">
                        {safeProducts.length === 0
                            ? "No products available."
                            : "No products available in this category."}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
