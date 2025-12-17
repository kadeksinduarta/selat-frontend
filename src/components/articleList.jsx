import { useState, useEffect } from "react";
import Link from "next/link";
import ArticleCard from "./ArticleCard";
import { apiGet } from "../utils/api";
import { ArrowRight } from "lucide-react";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const data = await apiGet("articles");
      setArticles(data.data || data || []);
    } catch (error) {
      console.error("Error loading articles:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Artikel Terbaru
            </h2>
            <p className="text-lg text-gray-600">
              Bacaan tentang program, event, dan tips komunitas
            </p>
          </div>
          <Link
            href="/articles"
            className="hidden md:flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all group"
          >
            <span>Lihat Semua</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            <span>Lihat Semua Artikel</span>
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Empty State */}
        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Belum ada artikel tersedia</p>
          </div>
        )}
      </div>
    </section>
  );
}
