import React, { useState } from "react";
import { User } from "../types";

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
        <div className="max-w-2xl mx-auto px-4 py-16">
            <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">Profile</h2>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                    >
                        {isEditing ? "Cancel" : "Edit"}
                    </button>
                </div>

                {!isEditing ? (
                    <div className="space-y-6">
                        <div>
                            <label className="text-gray-600 text-sm font-medium">
                                Phone Number
                            </label>
                            <p className="text-xl font-bold mt-1">
                                {user.phoneNumber}
                            </p>
                        </div>
                        <div>
                            <label className="text-gray-600 text-sm font-medium">
                                First Name
                            </label>
                            <p className="text-xl font-bold mt-1">
                                {user.firstName || "Not set"}
                            </p>
                        </div>
                        <div>
                            <label className="text-gray-600 text-sm font-medium">
                                Last Name
                            </label>
                            <p className="text-xl font-bold mt-1">
                                {user.secondName || "Not set"}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={formData.phoneNumber}
                                disabled
                                className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Phone number cannot be changed
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter first name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter last name"
                            />
                        </div>
                        <button
                            onClick={handleSave}
                            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-bold text-lg"
                        >
                            Save Changes
                        </button>
                    </div>
                )}
            </div>

            {/* Security Section */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-bold mb-4">Security</h3>
                <button className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
                    Change Password
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
