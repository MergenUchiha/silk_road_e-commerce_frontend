import React from "react";

interface FooterProps {
    setCurrentPage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
    return (
        <footer className="bg-gray-800 text-white mt-16">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">Shop</h3>
                        <p className="text-gray-400">
                            Best products at affordable prices
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Navigation</h3>
                        <div className="space-y-2">
                            <p
                                className="text-gray-400 cursor-pointer hover:text-white transition"
                                onClick={() => setCurrentPage("home")}
                            >
                                Home
                            </p>
                            <p
                                className="text-gray-400 cursor-pointer hover:text-white transition"
                                onClick={() => setCurrentPage("products")}
                            >
                                Products
                            </p>
                            <p
                                className="text-gray-400 cursor-pointer hover:text-white transition"
                                onClick={() => setCurrentPage("about")}
                            >
                                About
                            </p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact</h3>
                        <p className="text-gray-400">Email: info@shop.com</p>
                        <p className="text-gray-400">
                            Phone: +1 (555) 123-4567
                        </p>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    © 2024 Shop. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
