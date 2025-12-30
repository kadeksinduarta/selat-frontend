"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../layouts/AdminLayout";
import { ArrowLeft, Save } from "lucide-react";
import RichEditor from "../../../components/dashboard/RichEditor";

export default function AddArticlePage() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    excerpt: "",
    content: "",
    published_at: "",
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

  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content: content,
    }));
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

      const token = localStorage.getItem("token"); // Assuming token is stored here
      if (!token) {
        alert("Anda harus login terlebih dahulu");
        router.push("/auth/admin-login");
        return;
      }

      // Dynamically import api from utils since it's client side
      const { adminPostMultipart } = await import("../../../utils/api");
      await adminPostMultipart("articles", data, token);

      alert("Artikel berhasil ditambahkan!");
      router.push("/dashboard/article");
    } catch (error) {
      console.error("Error adding article:", error);
      alert("Gagal menambahkan artikel");
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
          <h1 className="text-3xl font-bold text-gray-800">Tambah Artikel</h1>
          <p className="text-gray-600 mt-1">Buat artikel baru</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Judul Artikel */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Judul Artikel <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="Masukkan judul artikel"
              />
            </div>

            {/* Kategori dan Penulis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Penulis <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  placeholder="Masukkan nama penulis"
                />
              </div>
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

            {/* Tanggal Publikasi */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tanggal Publikasi
              </label>
              <input
                type="date"
                name="published_at"
                value={formData.published_at}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>

            {/* Ringkasan */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ringkasan Artikel
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
                placeholder="Masukkan ringkasan singkat artikel"
              />
            </div>

            {/* Konten */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Konten Artikel <span className="text-red-500">*</span>
              </label>
              <RichEditor
                value={formData.content}
                onChange={handleEditorChange}
                placeholder="Masukkan konten artikel lengkap"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
              >
                <Save size={20} />
                Simpan Artikel
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
