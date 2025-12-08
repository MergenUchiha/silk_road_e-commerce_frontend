import React from "react";
import {
    Package,
    ShoppingCart,
    User,
    TrendingUp,
    Shield,
    Star,
} from "lucide-react";

interface HomePageProps {
    setCurrentPage: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
    return (
        <div className="min-h-screen">
            {/* Hero Section with Silk Road Theme */}
            <div className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                            
                                'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        }}
                    ></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative z-10">
                    <div className="text-center mb-12">
                        {/* Logo */}
                        <div className="inline-block mb-8">
                            <h1
                                className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent mb-2"
                                style={{ fontFamily: "Georgia, serif" }}
                            >
                                SilkRoad
                            </h1>
                            <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Welcome to SilkRoad!
                        </h2>

                        <p className="text-xl md:text-2xl text-indigo-200 mb-4 max-w-3xl mx-auto">
                            Your Trade Bridge between Romania and Turkmenistan
                        </p>

                        <p className="text-lg md:text-xl text-indigo-300 mb-8 max-w-2xl mx-auto">
                            Discover Exceptional Quality Textiles from Clothing,
                            Shoes & More
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={() => setCurrentPage("products")}
                                className="px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 rounded-lg font-bold text-lg hover:from-amber-500 hover:to-yellow-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
                            >
                                <ShoppingCart size={24} />
                                Start Shopping
                            </button>

                            <button
                                onClick={() => setCurrentPage("about")}
                                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-bold text-lg hover:bg-white/20 transition"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="mt-16 text-center">
                        <p className="text-amber-200 text-lg italic">
                            "Quality, Tested by Time, for Your Comfort Today."
                        </p>
                    </div>
                </div>

                {/* Bottom Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg
                        viewBox="0 0 1440 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                            fill="#f9fafb"
                        />
                    </svg>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800">
                        Why Choose SilkRoad?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition group">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                                <Package className="text-white" size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-center text-slate-800">
                                Fast Delivery
                            </h3>
                            <p className="text-gray-600 text-center">
                                We deliver orders within 1-3 days nationwide
                                with reliable shipping partners
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition group">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                                <Shield className="text-white" size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-center text-slate-800">
                                Quality Guarantee
                            </h3>
                            <p className="text-gray-600 text-center">
                                All products are tested and verified for
                                exceptional quality standards
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition group">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                                <Star className="text-white" size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-center text-slate-800">
                                Premium Selection
                            </h3>
                            <p className="text-gray-600 text-center">
                                Curated collection of authentic textiles and
                                traditional craftsmanship
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Platform Section */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-slate-800">
                            Connecting Two Rich Cultures
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8">
                                <h3 className="text-2xl font-bold mb-4 text-indigo-900">
                                    Our Mission
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    SilkRoad serves as a digital trade bridge,
                                    bringing the finest textiles and traditional
                                    products from Turkmenistan to Romania. We
                                    preserve centuries-old craftsmanship while
                                    embracing modern e-commerce convenience.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-8">
                                <h3 className="text-2xl font-bold mb-4 text-amber-900">
                                    Our Products
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Discover authentic clothing, handcrafted
                                    shoes, exquisite textiles, and traditional
                                    accessories. Each item tells a story of
                                    heritage, quality, and timeless elegance
                                    from the heart of Central Asia.
                                </p>
                            </div>
                        </div>

                        <div className="text-center bg-gradient-to-r from-slate-50 to-indigo-50 rounded-xl p-8">
                            <p className="text-lg text-gray-700 mb-4">
                                Join thousands of satisfied customers who have
                                discovered the perfect blend of tradition and
                                quality. Experience the authentic spirit of the
                                ancient Silk Road, reimagined for the modern
                                world.
                            </p>
                            <button
                                onClick={() => setCurrentPage("products")}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-lg"
                            >
                                <TrendingUp size={24} />
                                Explore Our Collection
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-amber-400 mb-2">
                                1000+
                            </div>
                            <div className="text-indigo-200">
                                Happy Customers
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-amber-400 mb-2">
                                500+
                            </div>
                            <div className="text-indigo-200">
                                Premium Products
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-amber-400 mb-2">
                                98%
                            </div>
                            <div className="text-indigo-200">
                                Satisfaction Rate
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-amber-400 mb-2">
                                24/7
                            </div>
                            <div className="text-indigo-200">
                                Customer Support
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
