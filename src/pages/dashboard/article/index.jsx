import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import AdminLayout from "../../layouts/AdminLayout";
import { apiGet, getStorageUrl } from "../../../utils/api";
import { Plus, Search, Edit2, Trash2, FileText, MoreVertical } from "lucide-react";

export async function getServerSideProps() {
  try {
    const articles = await apiGet("articles");
    return { props: { articles: articles || [] } };
  } catch (error) {
    console.error("Error fetching articles in admin dashboard:", error);
    return { props: { articles: [] } };
  }
}

export default function ArticleListPage({ articles }) {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleEdit = (id) => {
    router.push(`/dashboard/article/edit/${id}`);
  };

  const handleDelete = async (slug) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      try {
        const token = localStorage.getItem("token");
        // Import Dynamically
        const { adminDelete } = await import("../../../utils/api");
        await adminDelete(`articles/${slug}`, token);
        toast.success("Artikel berhasil dihapus.");
        router.reload();
      } catch (err) {
        console.error("Gagal menghapus", err);
        toast.error("Gagal menghapus artikel.");
      }
    }
  };

  const handleAddArticle = () => {
    router.push("/dashboard/article/add");
  };

  const articleData = articles.data || [];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Kelola Artikel</h1>
            <p className="text-gray-600 mt-1">
              Daftar semua artikel yang tersedia
            </p>
          </div>
          <button
            onClick={handleAddArticle}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            Tambah Artikel
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
                    Judul Artikel
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Kategori
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Penulis
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Tanggal
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {articleData.map((article, index) => (
                  <tr key={article.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={getStorageUrl(article.image)}
                        alt={article.title}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/hero.jpg"; // Fallback to hero.jpg if default fails
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs truncate">
                      {article.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {article.category || "Informasi"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {article.author}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {article.published_at || "-"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="relative inline-block">
                        <button
                          onClick={() => toggleDropdown(article.id)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition"
                        >
                          <MoreVertical size={20} className="text-gray-600" />
                        </button>

                        {/* Dropdown Menu */}
                        {openDropdown === article.id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-10">
                            <button
                              onClick={() => handleEdit(article.id)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                            >
                              <Edit size={16} className="text-blue-600" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(article.slug)}
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
          {articleData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Belum ada artikel</p>
              <button
                onClick={handleAddArticle}
                className="mt-4 text-green-600 hover:text-green-700 font-semibold"
              >
                Tambah artikel pertama
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
