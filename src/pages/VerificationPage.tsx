import React, { useState } from "react";

interface VerificationPageProps {
    userId: string;
    onVerified: (code: string) => void;
    onResendCode: () => void;
}

const VerificationPage: React.FC<VerificationPageProps> = ({
    userId,
    onVerified,
    onResendCode,
}) => {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (code.length !== 6) {
            alert("Code must be 6 characters");
            return;
        }
        onVerified(code); // ✅ передаем код
    };

    const handleResend = () => {
        onResendCode(); // ✅ без аргументов
    };

    return (
        <div className="max-w-md mx-auto px-4 py-16">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Verify Your Account
                </h2>
                <p className="text-gray-600 text-center mb-6">
                    We've sent a 6-digit verification code to your phone number.
                    Please enter it below.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Verification Code
                        </label>
                        <input
                            type="text"
                            placeholder="123456"
                            value={code}
                            onChange={(e) =>
                                setCode(
                                    e.target.value
                                        .replace(/\D/g, "")
                                        .slice(0, 6)
                                )
                            }
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center text-2xl tracking-widest"
                            required
                            maxLength={6}
                            pattern="\d{6}"
                        />
                        <p className="text-xs text-gray-500 mt-1 text-center">
                            Enter the 6-digit code
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || code.length !== 6}
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Verifying..." : "Verify Account"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 mb-2">
                        Didn't receive the code?
                    </p>
                    <button
                        onClick={handleResend}
                        className="text-indigo-600 hover:underline font-medium"
                    >
                        Resend Code
                    </button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                        <strong>Note:</strong> For demo purposes, the code is
                        always <strong>123456</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerificationPage;
