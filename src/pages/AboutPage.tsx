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
        <div className="max-w-4xl mx-auto px-4 py-16">
            {/* About Us */}
            <div className="mb-16">
                <h1 className="text-4xl font-bold mb-8 text-center">
                    About Us
                </h1>
                <div className="bg-white rounded-xl p-8 shadow-md mb-8">
                    <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                    <p className="text-gray-700 mb-4">
                        Our online store was founded in 2020 with the goal of
                        providing customers with a convenient platform to
                        purchase quality products at affordable prices.
                    </p>
                    <p className="text-gray-700 mb-4">
                        During this time, we have grown into a team of
                        professionals working to make your shopping experience
                        as comfortable as possible. We constantly expand our
                        range and improve the quality of service.
                    </p>
                    <p className="text-gray-700">
                        Today, thousands of customers across the country trust
                        us, and we continue to grow to justify your trust every
                        day.
                    </p>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Our Values</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-lg mb-2">
                                🎯 Quality
                            </h3>
                            <p className="text-gray-700">
                                We work only with trusted suppliers and
                                guarantee the quality of every product.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-2">⚡ Speed</h3>
                            <p className="text-gray-700">
                                Fast order processing and prompt delivery is our
                                priority.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-2">
                                💎 Honesty
                            </h3>
                            <p className="text-gray-700">
                                Transparent prices, no hidden fees and honest
                                product reviews.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div>
                <h2 className="text-3xl font-bold mb-8 text-center">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <button
                                onClick={() =>
                                    setOpenFaq(openFaq === index ? null : index)
                                }
                                className="w-full px-6 py-4 text-left font-bold text-lg hover:bg-gray-50 transition flex items-center justify-between"
                            >
                                {faq.q}
                                <span className="text-2xl">
                                    {openFaq === index ? "−" : "+"}
                                </span>
                            </button>
                            {openFaq === index && (
                                <div className="px-6 py-4 bg-gray-50 border-t">
                                    <p className="text-gray-700">{faq.a}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
