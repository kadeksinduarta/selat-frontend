"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../../layouts/AdminLayout";
import { apiGet } from "../../../../utils/api";
import { ArrowLeft, Save } from "lucide-react";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const articles = await apiGet("articles");
  const article = articles.data?.find((a) => a.id === parseInt(id));

  if (!article) {
    return {
      notFound: true,
    };
  }

  return { props: { article } };
}

export default function EditArticlePage({ article }) {
  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: article.title || "",
    category: article.category || "",
    author: article.author || "",
    excerpt: article.excerpt || "",
    content: article.content || "",
    published_at: article.published_at
      ? article.published_at.split("T")[0]
      : "",
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
        data.append(key, formData[key] || "");
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

      const { adminPutMultipart } = await import("../../../../utils/api");
      // Use article.slug for the update URL since backend uses Route Model Binding with Slug
      await adminPutMultipart(`articles/${article.slug}`, data, token);

      alert("Artikel berhasil diperbarui!");
      router.push("/dashboard/article");
    } catch (error) {
      console.error("Error updating article:", error);
      alert(`Gagal memperbarui artikel: ${error.message}`);
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
          <h1 className="text-3xl font-bold text-gray-800">Edit Artikel</h1>
          <p className="text-gray-600 mt-1">
            Perbarui artikel: {article.title}
          </p>
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
                Upload Gambar (Biarkan kosong jika tidak ingin mengubah)
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
              {article.image && !imageFile && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">
                    Gambar saat ini: {article.image}
                  </p>
                  <img
                    src={
                      article.image.startsWith("http")
                        ? article.image
                        : `${process.env.NEXT_PUBLIC_API_URL.replace(
                            "/api",
                            ""
                          )}/storage/${article.image}`
                    }
                    alt="Current"
                    className="w-32 h-32 object-cover rounded-lg"
                    onError={(e) => {
                      // Fallback if image load fails
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
              {imageFile && (
                <p className="mt-2 text-sm text-green-600">
                  File dipilih: {imageFile.name}
                </p>
              )}
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
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows="12"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
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
