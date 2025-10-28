import React, { useState } from "react";

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

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin(phoneNumber, password);
    };

    return (
        <div className="max-w-md mx-auto px-4 py-16">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-bold text-lg"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600">
                    Don't have an account?{" "}
                    <button
                        onClick={() => setCurrentPage("register")}
                        className="text-indigo-600 hover:underline font-medium"
                    >
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
