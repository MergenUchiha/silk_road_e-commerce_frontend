import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
            <p className="text-6xl font-bold text-indigo-600">404</p>
            <h1 className="mt-4 text-2xl font-bold text-gray-800">
                Page not found
            </h1>
            <p className="mt-2 text-gray-600">
                The page you are looking for does not exist or has been moved.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Link
                    to="/"
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                    Go home
                </Link>
                <Link
                    to="/products"
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
                >
                    Browse products
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
