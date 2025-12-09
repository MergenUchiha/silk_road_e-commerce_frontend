import React, { useState } from "react";
import { UserPlus, Mail } from "lucide-react";
import { RegisterData } from "../types";

interface RegisterPageProps {
    handleRegister: (
        userData: RegisterData & { firstName: string; secondName: string }
    ) => void;
    setCurrentPage: (page: string) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({
    handleRegister,
    setCurrentPage,
}) => {
    const [formData, setFormData] = useState<
        RegisterData & {
            firstName: string;
            secondName: string;
            confirmPassword: string;
        }
    >({
        email: "",
        password: "",
        firstName: "",
        secondName: "",
        confirmPassword: "",
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid email address");
            return;
        }

        if (formData.password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const { confirmPassword, ...userData } = formData;
        handleRegister(userData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 flex items-center justify-center py-16 px-4">
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

            <div className="max-w-md w-full relative z-10">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-amber-400">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <UserPlus className="text-white" size={40} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">
                            Join SilkRoad
                        </h2>
                        <p className="text-gray-600">
                            Create your account to start shopping
                        </p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Email *
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-500">
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="user@example.com"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                First Name (Optional)
                            </label>
                            <input
                                type="text"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        firstName: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Last Name (Optional)
                            </label>
                            <input
                                type="text"
                                placeholder="Doe"
                                value={formData.secondName}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        secondName: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Password *
                            </label>
                            <input
                                type="password"
                                placeholder="Minimum 8 characters"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                                required
                                minLength={8}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Confirm Password *
                            </label>
                            <input
                                type="password"
                                placeholder="Repeat password"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        confirmPassword: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 rounded-lg hover:from-amber-500 hover:to-yellow-600 transition font-bold text-lg shadow-lg flex items-center justify-center gap-2"
                        >
                            <UserPlus size={20} />
                            Create Account
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <button
                                onClick={() => setCurrentPage("login")}
                                className="text-amber-600 hover:text-amber-700 font-bold hover:underline transition"
                            >
                                Login
                            </button>
                        </p>
                    </div>
                </div>

                {/* Back to home */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => setCurrentPage("home")}
                        className="text-indigo-200 hover:text-white transition"
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
