import React from "react";
import { Shield } from "lucide-react";
import { useState } from "react";
import { showInfoToast, showSuccessToast } from "../../toastify";

export default function ChangePassword() {
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
            showInfoToast("Please fill all the fields");
            return; 
        }

        if (formData.newPassword !== formData.confirmPassword) {
            showInfoToast("Passwords do not match");
            return;
        }

        showSuccessToast("Password updated successfully");
    }

return (
    <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white mb-6">
            Security Settings
        </h2>
        {!showPasswordForm ? (
            <button
                onClick={() => setShowPasswordForm(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-900 to-cyan-900 text-white rounded-lg hover:shadow-cyan-900/20 transition-all flex items-center gap-2"
            >
                <Shield className="h-4 w-4" />
                Change Password
            </button>
        ) : (
            <form className="space-y-4">
                {Object.keys(formData).map((key) => (
                    <div key={key}>
                        <label className="block text-gray-300 mb-2">{key}</label>
                        <input
                            type="password"
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                    </div>
                ))}
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-blue-900 to-cyan-900 text-white rounded-lg hover:shadow-cyan-900/20 transition-all"
                        onClick={handleSubmit}
                    >
                        Update Password
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowPasswordForm(false)}
                        className="px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        )}
    </div>
);
}
