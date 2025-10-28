import React from "react";
import { Category } from "../../types";

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: string | null;
    onSelectCategory: (categoryId: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    selectedCategory,
    onSelectCategory,
}) => {
    return (
        <div className="mb-8">
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onSelectCategory(null)}
                    className={`px-4 py-2 rounded-full font-medium transition ${
                        !selectedCategory
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    All Products
                </button>
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onSelectCategory(category.id)}
                        className={`px-4 py-2 rounded-full font-medium transition ${
                            selectedCategory === category.id
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        {category.title}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
