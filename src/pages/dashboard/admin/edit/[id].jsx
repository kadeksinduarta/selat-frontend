"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import AdminLayout from "../../../layouts/AdminLayout";
import { ArrowLeft, Save } from "lucide-react";

// Dummy data - replace with actual API call
const dummyAdmins = [
    {
        id: 1,
        name: "Admin Utama",
        email: "admin@selatdesa.com",
        role: "Super Admin",
        status: "Active",
    },
];

export async function getServerSideProps(context) {
    const { id } = context.params;
    // TODO: Replace with actual API call
    const admin = dummyAdmins.find((a) => a.id === parseInt(id));

    if (!admin) {
        return {
            notFound: true,
        };
    }

    return { props: { admin } };
}

export default function EditAdminPage({ admin }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: admin.name || "",
        email: admin.email || "",
        role: admin.role || "Admin",
        status: admin.status || "Active",
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
        // TODO: Implement API call to update admin
        console.log("Update admin:", formData);
        toast.success("Admin berhasil diperbarui!");
        router.push("/dashboard/admin");
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
                    <h1 className="text-3xl font-bold text-gray-800">Edit Admin</h1>
                    <p className="text-gray-600 mt-1">
                        Perbarui informasi admin: {admin.name}
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                                placeholder="admin@example.com"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Role <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                            >
                                <option value="Admin">Admin</option>
                                <option value="Super Admin">Super Admin</option>
                            </select>
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Password Reset Note */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-800">
                                <strong>Catatan:</strong> Untuk mengubah password, admin harus melakukan reset password melalui halaman login.
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
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
