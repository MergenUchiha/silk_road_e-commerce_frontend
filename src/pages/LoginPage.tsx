import React, { useState } from "react";
import { Lock, Phone } from "lucide-react";

interface LoginPageProps {
    handleLogin: (phoneNumber: string, password: string) => void;
    setCurrentPage: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
    handleLogin,
    setCurrentPage,
}) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = () => {
        // Validate phone number format
        const phoneRegex = /^\+[1-9]\d{1,14}$/;
        if (!phoneRegex.test(phoneNumber)) {
            alert(
                "Phone number must be in international format (e.g., +12025550123)"
            );
            return;
        }
        handleLogin(phoneNumber, password);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 overflow-hidden py-16">
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        }}
                    ></div>
                </div>

                <div className="max-w-md mx-auto px-4 text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-indigo-200 mt-4 text-lg">
                        Login to continue your journey
                    </p>
                </div>
            </div>

            <div className="max-w-md mx-auto px-4 py-16">
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
                    <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Login
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-indigo-700 mb-2 uppercase tracking-wide">
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-500">
                                    <Phone size={20} />
                                </div>
                                <input
                                    type="tel"
                                    placeholder="+12025550123"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        setPhoneNumber(e.target.value)
                                    }
                                    onKeyPress={handleKeyPress}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-slate-800 placeholder-gray-400"
                                    required
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2 italic">
                                Use international format (e.g., +12025550123)
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-indigo-700 mb-2 uppercase tracking-wide">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-500">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    onKeyPress={handleKeyPress}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-slate-800 placeholder-gray-400"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            onClick={onSubmit}
                            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Login
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{" "}
                            <button
                                onClick={() => setCurrentPage("register")}
                                className="text-indigo-600 hover:text-purple-600 font-bold underline decoration-2 underline-offset-2 hover:decoration-purple-600 transition"
                            >
                                Register
                            </button>
                        </p>
                    </div>
                </div>

                {/* Trust Badge */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        🔒 Secure login protected by encryption
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
