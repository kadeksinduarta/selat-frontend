"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../layouts/AdminLayout";
import { ArrowLeft, Save } from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setImageFile(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (imageFile) {
        data.append("image", imageFile);
      }

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Anda harus login terlebih dahulu");
        router.push("/auth/admin-login");
        return;
      }

      // Dynamically import api
      const { adminPostMultipart } = await import("../../../utils/api");
      await adminPostMultipart("products", data, token);

      alert("Produk berhasil ditambahkan!");
      router.push("/dashboard/product");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Gagal menambahkan produk");
    }
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
          <h1 className="text-3xl font-bold text-gray-800">Tambah Produk</h1>
          <p className="text-gray-600 mt-1">Tambahkan produk baru ke katalog</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama Produk */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Produk <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="Masukkan nama produk"
              />
            </div>

            {/* Harga */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Harga <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="Masukkan harga"
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kategori
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="Masukkan kategori"
              />
            </div>

            {/* Stok */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stok
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="Masukkan jumlah stok"
              />
            </div>

            {/* Upload Gambar */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Gambar
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Deskripsi
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
                placeholder="Masukkan deskripsi produk"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
              >
                <Save size={20} />
                Simpan Produk
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
