import React, { useState } from "react";
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
        phoneNumber: "",
        password: "",
        firstName: "",
        secondName: "",
        confirmPassword: "",
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate phone number format
        const phoneRegex = /^\+[1-9]\d{1,14}$/;
        if (!phoneRegex.test(formData.phoneNumber)) {
            alert(
                "Phone number must be in international format (e.g., +12025550123)"
            );
            return;
        }

        // Validate password length
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
        <div className="max-w-md mx-auto px-4 py-16">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Register
                </h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            placeholder="+12025550123"
                            value={formData.phoneNumber}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    phoneNumber: e.target.value,
                                })
                            }
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Use international format (e.g., +12025550123)
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
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
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                            minLength={8}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
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
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-bold text-lg"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{" "}
                    <button
                        onClick={() => setCurrentPage("login")}
                        className="text-indigo-600 hover:underline font-medium"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
