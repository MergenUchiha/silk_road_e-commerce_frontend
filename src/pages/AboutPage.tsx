import React, { useState } from "react";

const AboutPage: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = [
        {
            q: "How to place an order?",
            a: 'Add products to cart, go to cart and click "Proceed to Checkout". Fill in delivery details and confirm your order.',
        },
        {
            q: "What payment methods are available?",
            a: "We accept payment by bank cards, cash on delivery, and electronic wallets.",
        },
        {
            q: "How long does delivery take?",
            a: "Standard delivery takes 1-3 business days depending on your region.",
        },
        {
            q: "Can I return a product?",
            a: "Yes, you can return a product within 14 days of receipt if it has not been used.",
        },
        {
            q: "How to track an order?",
            a: "After placing an order, you will receive a tracking number to your email or phone for tracking.",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 overflow-hidden py-20">
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        }}
                    ></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent mb-4">
                        About Us
                    </h1>
                    <p className="text-xl text-indigo-200">
                        Discover the story behind SilkRoad
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-16">
                {/* About Us */}
                <div className="mb-16">
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition mb-8">
                        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Our Story
                        </h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Our online store was founded in 2020 with the goal
                            of providing customers with a convenient platform to
                            purchase quality products at affordable prices.
                        </p>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            During this time, we have grown into a team of
                            professionals working to make your shopping
                            experience as comfortable as possible. We constantly
                            expand our range and improve the quality of service.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Today, thousands of customers across the country
                            trust us, and we continue to grow to justify your
                            trust every day.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
                        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Our Values
                        </h2>
                        <div className="space-y-6">
                            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-l-4 border-indigo-500 hover:shadow-md transition">
                                <h3 className="font-bold text-xl mb-2 text-indigo-900">
                                    🎯 Quality
                                </h3>
                                <p className="text-gray-700">
                                    We work only with trusted suppliers and
                                    guarantee the quality of every product.
                                </p>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500 hover:shadow-md transition">
                                <h3 className="font-bold text-xl mb-2 text-green-900">
                                    ⚡ Speed
                                </h3>
                                <p className="text-gray-700">
                                    Fast order processing and prompt delivery is
                                    our priority.
                                </p>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border-l-4 border-amber-500 hover:shadow-md transition">
                                <h3 className="font-bold text-xl mb-2 text-amber-900">
                                    💎 Honesty
                                </h3>
                                <p className="text-gray-700">
                                    Transparent prices, no hidden fees and
                                    honest product reviews.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div>
                    <h2 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
                            >
                                <button
                                    onClick={() =>
                                        setOpenFaq(
                                            openFaq === index ? null : index
                                        )
                                    }
                                    className="w-full px-6 py-5 text-left font-bold text-lg hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition flex items-center justify-between text-slate-800"
                                >
                                    {faq.q}
                                    <span className="text-3xl text-indigo-600 font-bold">
                                        {openFaq === index ? "−" : "+"}
                                    </span>
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 py-5 bg-gradient-to-br from-indigo-50 to-purple-50 border-t border-indigo-100">
                                        <p className="text-gray-700 leading-relaxed">
                                            {faq.a}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
