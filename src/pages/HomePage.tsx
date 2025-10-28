import React from "react";
import { Package, ShoppingCart, User } from "lucide-react";

interface HomePageProps {
    setCurrentPage: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 md:p-16 text-white mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Welcome to Our Shop
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-indigo-100">
                    Find the best products at affordable prices
                </p>
                <button
                    onClick={() => setCurrentPage("products")}
                    className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
                >
                    Start Shopping
                </button>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white rounded-xl p-8 shadow-md text-center">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="text-indigo-600" size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
                    <p className="text-gray-600">
                        We deliver orders within 1-3 days nationwide
                    </p>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-md text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingCart className="text-green-600" size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Easy Payment</h3>
                    <p className="text-gray-600">
                        We accept all payment methods: cards, cash, online
                    </p>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-md text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="text-purple-600" size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
                    <p className="text-gray-600">
                        Our team is always ready to help you with your choice
                    </p>
                </div>
            </div>

            {/* About Platform */}
            <div className="bg-white rounded-xl p-12 shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    About Our Platform
                </h2>
                <div className="max-w-3xl mx-auto">
                    <p className="text-lg text-gray-700 mb-4">
                        We offer a wide range of quality products for the whole
                        family. Our mission is to make shopping convenient, fast
                        and pleasant for every customer.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        In our catalog you will find thousands of products in
                        various categories: from electronics to home goods. We
                        work only with trusted suppliers and guarantee the
                        quality of every product.
                    </p>
                    <p className="text-lg text-gray-700">
                        Join thousands of satisfied customers and start shopping
                        with comfort today!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
