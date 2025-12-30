"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../../layouts/AdminLayout";
import { ArrowLeft, Save } from "lucide-react";

// Dummy data - replace with actual API call
const dummyUsers = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "081234567890",
        status: "Active",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "081234567891",
        status: "Active",
    },
];

export async function getServerSideProps(context) {
    const { id } = context.params;
    // TODO: Replace with actual API call
    const user = dummyUsers.find((u) => u.id === parseInt(id));

    if (!user) {
        return {
            notFound: true,
        };
    }

    return { props: { user } };
}

export default function EditUserPage({ user }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        status: user.status || "Active",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: Implement API call to update user
        console.log("Update user:", formData);
        alert("User berhasil diperbarui!");
        router.push("/dashboard/user");
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition"
                    >
                        <ArrowLeft size={20} />
                        Kembali
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">Edit User</h1>
                    <p className="text-gray-600 mt-1">
                        Perbarui informasi user: {user.name}
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nama */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Nama Lengkap <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                placeholder="Masukkan nama lengkap"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                placeholder="user@example.com"
                            />
                        </div>

                        {/* Telepon */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Nomor Telepon <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                placeholder="081234567890"
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Password Reset Note */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-800">
                                <strong>Catatan:</strong> Untuk mengubah password, user harus melakukan reset password melalui halaman login.
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
                            >
                                <Save size={20} />
                                Simpan Perubahan
                            </button>
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
