import { useState, useEffect } from "react";
import Link from "next/link";
import MainLayout from "@/pages/layouts/MainLayout";
import ArticleCard from "@/components/ArticleCard";
import { apiGet } from "@/utils/api";
import { ArrowRight, Search, FileText } from "lucide-react";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredArticles(
        articles.filter(
          (a) =>
            a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.content?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredArticles(articles);
    }
  }, [searchTerm, articles]);

  const loadArticles = async () => {
    try {
      const data = await apiGet("articles");
      const articleList = Array.isArray(data) ? data : data.data || [];
      setArticles(articleList);
      setFilteredArticles(articleList);
    } catch (error) {
      console.error("Error loading articles:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4 mt-15">
            Artikel & Berita Desa
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Dapatkan informasi terbaru mengenai kegiatan, program, dan potensi
            Desa Selat.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search Bar */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-lg">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500 font-medium">
              Tidak ada artikel yang ditemukan
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-blue-600 font-semibold hover:underline"
              >
                Lihat Semua Artikel
              </button>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
