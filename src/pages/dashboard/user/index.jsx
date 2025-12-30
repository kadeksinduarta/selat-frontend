"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import AdminLayout from "../../layouts/AdminLayout";
import { adminGet, adminDelete } from "../../../utils/api";
import { MoreVertical, Plus, Edit, Trash2, Mail, Phone } from "lucide-react";

export default function UserListPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
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

      const response = await adminGet("users", token);
      setUsers(response.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      router.push("/auth/admin-login");
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleEdit = (id) => {
    router.push(`/dashboard/user/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await adminDelete(`users/${id}`, token);
        if (response.success) {
          toast.success("User berhasil dihapus!");
          checkAuthAndLoadData(); // Reload data
        } else {
          toast.error(
            response.message || "Gagal menghapus user"
          );
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Terjadi kesalahan saat menghapus user");
      }
    }
  };

  const handleAddUser = () => {
    router.push("/dashboard/user/add");
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
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
            <h1 className="text-3xl font-bold text-gray-800">Kelola User</h1>
            <p className="text-gray-600 mt-1">
              Daftar semua user yang terdaftar
            </p>
          </div>
          <button
            onClick={handleAddUser}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            Tambah User
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
                    Telepon
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Last Login
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Tanggal Bergabung
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-gray-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-400" />
                        {user.phone || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user.last_login
                        ? new Date(user.last_login).toLocaleString("id-ID")
                        : "Belum pernah login"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString("id-ID")
                        : "-"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="relative inline-block">
                        <button
                          onClick={() => toggleDropdown(user.id)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition"
                        >
                          <MoreVertical size={20} className="text-gray-600" />
                        </button>

                        {/* Dropdown Menu */}
                        {openDropdown === user.id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-10">
                            <button
                              onClick={() => handleEdit(user.id)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                            >
                              <Edit size={16} className="text-blue-600" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
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
          {users.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Belum ada user</p>
              <button
                onClick={handleAddUser}
                className="mt-4 text-purple-600 hover:text-purple-700 font-semibold"
              >
                Tambah user pertama
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
