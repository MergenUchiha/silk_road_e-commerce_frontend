import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { User as UserType } from "../../types";

interface NavbarProps {
    user: UserType | null;
    basketCount: number;
    onLogout: () => void;
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
    `font-medium transition ${
        isActive ? "text-indigo-600" : "text-gray-700 hover:text-indigo-600"
    }`;

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex-1 py-2 text-sm font-medium text-center ${
        isActive ? "text-indigo-600" : "text-gray-700"
    }`;

const Navbar: React.FC<NavbarProps> = ({ user, basketCount, onLogout }) => {
    const navigate = useNavigate();

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo & Navigation */}
                    <div className="flex items-center gap-8">
                        <Link
                            to="/"
                            className="text-2xl font-bold text-indigo-600"
                        >
                            Silk Road
                        </Link>

                        <div className="hidden md:flex gap-6">
                            <NavLink to="/" end className={linkClass}>
                                Home
                            </NavLink>
                            <NavLink to="/products" className={linkClass}>
                                Products
                            </NavLink>
                            <NavLink to="/about" className={linkClass}>
                                About
                            </NavLink>
                            {user && (
                                <NavLink to="/orders" className={linkClass}>
                                    Orders
                                </NavLink>
                            )}
                        </div>
                    </div>

                    {/* Cart & Profile */}
                    <div className="flex items-center gap-4">
                        <Link
                            to="/cart"
                            className="relative p-2 hover:bg-gray-100 rounded-lg transition"
                            aria-label="Cart"
                        >
                            <ShoppingCart size={24} />
                            {basketCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                    {basketCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition"
                                >
                                    <User size={20} />
                                    <span className="hidden md:inline">
                                        {user.firstName}
                                    </span>
                                </Link>
                                <button
                                    onClick={() => {
                                        onLogout();
                                        navigate("/");
                                    }}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex gap-4 pb-3 border-t pt-3">
                    <NavLink to="/" end className={mobileLinkClass}>
                        Home
                    </NavLink>
                    <NavLink to="/products" className={mobileLinkClass}>
                        Products
                    </NavLink>
                    <NavLink to="/about" className={mobileLinkClass}>
                        About
                    </NavLink>
                    {user && (
                        <NavLink to="/orders" className={mobileLinkClass}>
                            Orders
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
