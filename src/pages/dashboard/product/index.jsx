"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../layouts/AdminLayout";
import { apiGet } from "../../../utils/api";
import { MoreVertical, Plus, Edit, Trash2 } from "lucide-react";

export async function getServerSideProps() {
  const products = await apiGet("products");
  return { props: { products } };
}

export default function ProductListPage({ products }) {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleEdit = (id) => {
    router.push(`/dashboard/product/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        const token = localStorage.getItem("token");
        const { adminDelete } = await import("../../../utils/api");
        await adminDelete(`products/${id}`, token);
        alert("Produk berhasil dihapus.");
        router.reload();
      } catch (err) {
        console.error("Gagal menghapus", err);
        alert("Gagal menghapus produk.");
      }
    }
  };

  const handleAddProduct = () => {
    router.push("/dashboard/product/add");
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Kelola Produk</h1>
            <p className="text-gray-600 mt-1">
              Daftar semua produk yang tersedia
            </p>
          </div>
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            Tambah Produk
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
                    Gambar
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Nama Produk
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Harga
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Kategori
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Stok
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product, index) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={
                          product.image?.startsWith("http")
                            ? product.image
                            : `${process.env.NEXT_PUBLIC_API_URL.replace(
                                "/api",
                                ""
                              )}/storage/${product.image}`
                        }
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/hero.jpg"; // Fallback to hero.jpg
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Rp {product.price.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {product.category || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {product.stock || "-"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="relative inline-block">
                        <button
                          onClick={() => toggleDropdown(product.id)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition"
                        >
                          <MoreVertical size={20} className="text-gray-600" />
                        </button>

                        {/* Dropdown Menu */}
                        {openDropdown === product.id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-10">
                            <button
                              onClick={() => handleEdit(product.id)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                            >
                              <Edit size={16} className="text-blue-600" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
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
          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Belum ada produk</p>
              <button
                onClick={handleAddProduct}
                className="mt-4 text-green-600 hover:text-green-700 font-semibold"
              >
                Tambah produk pertama
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
