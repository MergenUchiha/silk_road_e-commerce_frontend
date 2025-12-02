import React from "react";
import { ShoppingCart, User, LogOut, Package } from "lucide-react";
import { User as UserType } from "../../types";

interface NavbarProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
    user: UserType | null;
    basketCount: number;
    onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
    currentPage,
    setCurrentPage,
    user,
    basketCount,
    onLogout,
}) => {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo & Navigation */}
                    <div className="flex items-center gap-8">
                        <h1
                            className="text-2xl font-bold text-indigo-600 cursor-pointer"
                            onClick={() => setCurrentPage("home")}
                        >
                            Shop
                        </h1>

                        <div className="hidden md:flex gap-6">
                            <button
                                onClick={() => setCurrentPage("home")}
                                className={`font-medium transition ${
                                    currentPage === "home"
                                        ? "text-indigo-600"
                                        : "text-gray-700 hover:text-indigo-600"
                                }`}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => setCurrentPage("products")}
                                className={`font-medium transition ${
                                    currentPage === "products"
                                        ? "text-indigo-600"
                                        : "text-gray-700 hover:text-indigo-600"
                                }`}
                            >
                                Products
                            </button>
                            <button
                                onClick={() => setCurrentPage("about")}
                                className={`font-medium transition ${
                                    currentPage === "about"
                                        ? "text-indigo-600"
                                        : "text-gray-700 hover:text-indigo-600"
                                }`}
                            >
                                About
                            </button>
                            {user && (
                                <button
                                    onClick={() => setCurrentPage("orders")}
                                    className={`font-medium transition ${
                                        currentPage === "orders"
                                            ? "text-indigo-600"
                                            : "text-gray-700 hover:text-indigo-600"
                                    }`}
                                >
                                    Orders
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Cart & Profile */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setCurrentPage("cart")}
                            className="relative p-2 hover:bg-gray-100 rounded-lg transition"
                        >
                            <ShoppingCart size={24} />
                            {basketCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                    {basketCount}
                                </span>
                            )}
                        </button>

                        {user ? (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage("profile")}
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition"
                                >
                                    <User size={20} />
                                    <span className="hidden md:inline">
                                        {user.firstName}
                                    </span>
                                </button>
                                <button
                                    onClick={onLogout}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setCurrentPage("login")}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex gap-4 pb-3 border-t pt-3">
                    <button
                        onClick={() => setCurrentPage("home")}
                        className={`flex-1 py-2 text-sm font-medium ${
                            currentPage === "home"
                                ? "text-indigo-600"
                                : "text-gray-700"
                        }`}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => setCurrentPage("products")}
                        className={`flex-1 py-2 text-sm font-medium ${
                            currentPage === "products"
                                ? "text-indigo-600"
                                : "text-gray-700"
                        }`}
                    >
                        Products
                    </button>
                    <button
                        onClick={() => setCurrentPage("about")}
                        className={`flex-1 py-2 text-sm font-medium ${
                            currentPage === "about"
                                ? "text-indigo-600"
                                : "text-gray-700"
                        }`}
                    >
                        About
                    </button>
                    {user && (
                        <button
                            onClick={() => setCurrentPage("orders")}
                            className={`flex-1 py-2 text-sm font-medium ${
                                currentPage === "orders"
                                    ? "text-indigo-600"
                                    : "text-gray-700"
                            }`}
                        >
                            Orders
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
