import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { getStorageUrl } from "@/utils/api";

export default function ArticleCard({ article }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const stripHtml = (html) => {
        if (!html) return "";
        return html
            .replace(/<[^>]*>?/gm, "") // Hapus tag HTML
            .replace(/&nbsp;/g, " ") // Ganti non-breaking space
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'");
    };

    return (
        <Link href={`/articles/${article.slug}`}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-green-100 to-blue-100">
                    {article.image ? (
                        <img
                            src={getStorageUrl(article.image)}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-6xl">📰</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar size={16} />
                        <span>{formatDate(article.created_at)}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {article.title}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                        {stripHtml(article.content).substring(0, 150)}...
                    </p>

                    <div className="flex items-center gap-2 text-green-600 font-semibold text-sm group-hover:gap-3 transition-all">
                        <span>Baca Selengkapnya</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
