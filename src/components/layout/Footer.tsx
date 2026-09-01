import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white mt-16">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">Silk Road</h3>
                        <p className="text-gray-400">
                            Best products at affordable prices
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Navigation</h3>
                        <div className="space-y-2">
                            <Link
                                to="/"
                                className="block text-gray-400 hover:text-white transition"
                            >
                                Home
                            </Link>
                            <Link
                                to="/products"
                                className="block text-gray-400 hover:text-white transition"
                            >
                                Products
                            </Link>
                            <Link
                                to="/about"
                                className="block text-gray-400 hover:text-white transition"
                            >
                                About
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact</h3>
                        <p className="text-gray-400">Email: info@example.com</p>
                        <p className="text-gray-400">
                            Phone: +1 (555) 123-4567
                        </p>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    © {new Date().getFullYear()} Silk Road. All rights
                    reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
