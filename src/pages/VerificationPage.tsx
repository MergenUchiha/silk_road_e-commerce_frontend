import React, { useState } from "react";
import { Shield, Mail } from "lucide-react";

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
        onVerified(code);
    };

    const handleResend = () => {
        onResendCode();
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
                        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
                            <Shield className="text-white" size={40} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">
                            Verify Your Account
                        </h2>
                        <p className="text-gray-600">
                            We've sent a 6-digit code to your phone
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                                Enter Verification Code
                            </label>
                            <input
                                type="text"
                                placeholder="000000"
                                value={code}
                                onChange={(e) =>
                                    setCode(
                                        e.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 6)
                                    )
                                }
                                className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-center text-3xl tracking-[1em] font-bold transition"
                                required
                                maxLength={6}
                                pattern="\d{6}"
                            />
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Enter the 6-digit code sent to your phone
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || code.length !== 6}
                            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Verifying..." : "Verify Account"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 mb-3">
                            Didn't receive the code?
                        </p>
                        <button
                            onClick={handleResend}
                            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold hover:underline transition"
                        >
                            <Mail size={18} />
                            Resend Code
                        </button>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
                        <p className="text-sm text-blue-800">
                            <strong className="font-bold">Demo Note:</strong>{" "}
                            For testing purposes, the verification code is
                            always{" "}
                            <span className="font-mono font-bold">123456</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationPage;
