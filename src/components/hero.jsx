import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShoppingBag, BookOpen, Users } from "lucide-react";
import { apiGet } from "@/utils/api";

export default function Hero() {
  const [stats, setStats] = useState({
    productCount: 0,
    articleCount: 0,
    visitorCount: 1250, // Mock data or fetch if available
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [products, articles] = await Promise.all([
          apiGet("products"),
          apiGet("articles"),
        ]);

        setStats({
          productCount: products?.data?.length || products?.length || 0,
          articleCount: articles?.data?.length || articles?.length || 0,
          visitorCount: 1250,
        });
      } catch (error) {
        console.error("Failed to fetch hero stats:", error);
      }
    }
    fetchStats();
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Dynamic Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-subtle-zoom"
          style={{ backgroundImage: "url('sawah.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Glassmorphic Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-12 w-64 h-64 bg-green-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-12 w-80 h-80 bg-blue-500/20 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Tagline/Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 animate-fade-in-down">
            <Sparkles className="text-yellow-400 w-4 h-4" />
            <span className="text-sm font-medium text-white/90 tracking-wide uppercase">
              Pesona Alami, Kearifan Lokal
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight leading-[1.1] animate-slide-up">
            Selamat Datang di
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Desa Selat
            </span>
          </h1>

          {/* Detailed Description */}
          <p className="text-lg md:text-2xl text-white/80 mb-12 max-w-3xl leading-relaxed font-light animate-slide-up animation-delay-300">
            Harmoni alam dan budaya di kaki gunung Agung. Jelajahi kekayaan
            <span className="text-green-400 font-medium"> produk lokal</span>,
            selami <span className="text-emerald-400 font-medium"> kisah komunitas</span>,
            dan temukan keajaiban di setiap sudut desa kami.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-6 mb-20 animate-slide-up animation-delay-600">
            <Link
              href="/products"
              className="group px-10 py-5 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-bold shadow-2xl shadow-green-900/20 transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-1 active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Jelajahi Produk</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/articles"
              className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-1 active:scale-95"
            >
              <BookOpen className="w-5 h-5" />
              <span>Warta Desa</span>
            </Link>
          </div>

          {/* Stats Section with Glassmorphism */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 max-w-4xl w-full px-6 animate-fade-in-up animation-delay-900">
            <StatCard
              icon={<ShoppingBag className="w-6 h-6 text-green-400" />}
              value={stats.productCount}
              label="Produk Unggulan"
            />
            <StatCard
              icon={<BookOpen className="w-6 h-6 text-emerald-400" />}
              value={stats.articleCount}
              label="Artikel & Berita"
            />
            <StatCard
              icon={<Users className="w-6 h-6 text-teal-400" />}
              value={stats.visitorCount}
              label="Pengunjung"
              suffix="+"
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes subtle-zoom {
          from { transform: scale(1.05); }
          to { transform: scale(1.15); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 20s infinite alternate cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }
        .animate-slide-up {
          animation: slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        .animation-delay-900 { animation-delay: 900ms; }
      `}</style>
    </section>
  );
}

function StatCard({ icon, value, label, suffix = "" }) {
  return (
    <div className="flex flex-col items-center group">
      <div className="mb-4 p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-colors duration-300">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-black text-white mb-1">
        {value}{suffix}
      </div>
      <div className="text-sm font-medium text-white/50 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
