import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import MainLayout from "@/pages/layouts/MainLayout";
import { apiGet, getStorageUrl } from "@/utils/api";
import { Calendar, User, ArrowLeft, Clock, Share2 } from "lucide-react";

export default function ArticleDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      loadArticle();
    }
  }, [slug]);

  const loadArticle = async () => {
    try {
      setLoading(true);
      // Assuming API supports fetching by ID, but slug is passed.
      // If backend only supports ID, we might need to adjust or rely on [id].jsx instead of [slug].jsx
      // For now assuming the endpoint accepts the param as is (ID or slug)
      const response = await apiGet(`articles/${slug}`);
      setArticle(response.data || response);
    } catch (err) {
      if (err.message && err.message.includes("404")) {
        // Expected error, warn only
        console.warn("Article not found (404)");
      } else {
        console.error("Error loading article:", err);
      }
      setError("Artikel tidak ditemukan");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (error || !article) {
    return (
      <MainLayout>
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Artikel Tidak Ditemukan
          </h1>
          <Link
            href="/articles"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Kembali ke Berita
          </Link>
        </div>
      </MainLayout>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <MainLayout>
      <article className="min-h-screen bg-white pb-20">
        {/* Header Image */}
        <div className="w-full h-64 md:h-96 relative bg-gray-200">
          {article.image ? (
            <img
              src={getStorageUrl(article.image)}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
                e.target.parentElement.classList.add(
                  "flex",
                  "items-center",
                  "justify-center",
                  "text-gray-400",
                  "bg-gray-100"
                );
                e.target.parentElement.innerHTML =
                  '<span class="text-4xl">📄</span>';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
              <span className="text-4xl">📄</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition"
              >
                <ArrowLeft size={20} /> Kembali
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-shadow-lg">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{formatDate(article.created_at || article.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={18} />
                  <span>Admin Desa</span>
                </div>
                {article.read_time && (
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>{article.read_time} menit baca</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div
            className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Share & Tags (Optional) */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
            <div className="font-semibold text-gray-700">
              Bagikan artikel ini:
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100 transition text-gray-600">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </article>
    </MainLayout>
  );
}
