import React, { useState } from "react";

interface User {
    phoneNumber: string;
    firstName?: string;
    secondName?: string;
}

interface ProfilePageProps {
    user: User;
    updateProfile: (updatedData: Partial<User>) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, updateProfile }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user.firstName || "",
        secondName: user.secondName || "",
        phoneNumber: user.phoneNumber,
    });

    const handleSave = () => {
        updateProfile(formData);
        setIsEditing(false);
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

                <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
                        Profile
                    </h1>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-16">
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Personal Information
                        </h2>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 rounded-lg hover:from-amber-500 hover:to-yellow-600 transition font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            {isEditing ? "Cancel" : "Edit"}
                        </button>
                    </div>

                    {!isEditing ? (
                        <div className="space-y-6">
                            <div className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-l-4 border-indigo-500">
                                <label className="text-indigo-700 text-sm font-bold uppercase tracking-wide">
                                    Phone Number
                                </label>
                                <p className="text-2xl font-bold mt-2 text-slate-800">
                                    {user.phoneNumber}
                                </p>
                            </div>
                            <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500">
                                <label className="text-green-700 text-sm font-bold uppercase tracking-wide">
                                    First Name
                                </label>
                                <p className="text-2xl font-bold mt-2 text-slate-800">
                                    {user.firstName || "Not set"}
                                </p>
                            </div>
                            <div className="p-5 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border-l-4 border-amber-500">
                                <label className="text-amber-700 text-sm font-bold uppercase tracking-wide">
                                    Last Name
                                </label>
                                <p className="text-2xl font-bold mt-2 text-slate-800">
                                    {user.secondName || "Not set"}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-indigo-700 mb-2 uppercase tracking-wide">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phoneNumber}
                                    disabled
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed text-gray-500 font-medium"
                                />
                                <p className="text-xs text-gray-500 mt-2 italic">
                                    Phone number cannot be changed
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-indigo-700 mb-2 uppercase tracking-wide">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            firstName: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-slate-800 placeholder-gray-400"
                                    placeholder="Enter first name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-indigo-700 mb-2 uppercase tracking-wide">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.secondName}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            secondName: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-slate-800 placeholder-gray-400"
                                    placeholder="Enter last name"
                                />
                            </div>
                            <button
                                onClick={handleSave}
                                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>

                {/* Order History Section */}

                {/* Security Section */}
                <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
                    <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Security
                    </h3>
                    <button className="w-full py-4 border-2 border-indigo-300 text-indigo-700 rounded-lg hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:border-indigo-500 transition font-bold text-lg">
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
