"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../layouts/AdminLayout";
import { adminGet, adminDelete } from "../../../utils/api";
import { MoreVertical, Plus, Edit, Trash2, Mail, Shield } from "lucide-react";

export default function AdminListPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (!token || !userData) {
        router.push("/auth/admin-login");
        return;
      }

      const user = JSON.parse(userData);
      if (user.role !== "admin") {
        router.push("/auth/admin-login");
        return;
      }

      const response = await adminGet("admins", token);
      setAdmins(response.data || []);
    } catch (error) {
      console.error("Error fetching admins:", error);
      router.push("/auth/admin-login");
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleEdit = (id) => {
    router.push(`/dashboard/admin/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus admin ini?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await adminDelete(`admins/${id}`, token);
        if (response.success) {
          alert("Admin berhasil dihapus!");
          checkAuthAndLoadData(); // Reload data
        } else {
          alert(
            "Gagal menghapus admin: " + (response.message || "Unknown error")
          );
        }
      } catch (error) {
        console.error("Error deleting admin:", error);
        alert("Terjadi kesalahan saat menghapus admin");
      }
    }
  };

  const handleAddAdmin = () => {
    router.push("/dashboard/admin/add");
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Kelola Admin</h1>
            <p className="text-gray-600 mt-1">Daftar semua admin sistem</p>
          </div>
          <button
            onClick={handleAddAdmin}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            Tambah Admin
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    No
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Nama
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Login Terakhir
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {admins.map((admin, index) => (
                  <tr key={admin.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        <Shield size={18} className="text-orange-600" />
                        {admin.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-gray-400" />
                        {admin.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                        Admin
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {admin.last_login
                        ? new Date(admin.last_login).toLocaleString("id-ID")
                        : "Belum pernah login"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="relative inline-block">
                        <button
                          onClick={() => toggleDropdown(admin.id)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition"
                        >
                          <MoreVertical size={20} className="text-gray-600" />
                        </button>

                        {/* Dropdown Menu */}
                        {openDropdown === admin.id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-10">
                            <button
                              onClick={() => handleEdit(admin.id)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                            >
                              <Edit size={16} className="text-blue-600" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(admin.id)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                            >
                              <Trash2 size={16} />
                              Hapus
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {admins.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Belum ada admin</p>
              <button
                onClick={handleAddAdmin}
                className="mt-4 text-orange-600 hover:text-orange-700 font-semibold"
              >
                Tambah admin pertama
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
