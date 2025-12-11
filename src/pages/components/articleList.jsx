// src/components/ArticleList.jsx
import { apiGet } from "../utils/api";

const articles = [
  {
    id: 1,
    title: "Pengembangan Pertanian Berkelanjutan",
    excerpt:
      "Inisiatif baru untuk meningkatkan produktivitas sambil menjaga lingkungan.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    date: "2025-05-12",
  },
  {
    id: 2,
    title: "Kegiatan Festival Budaya Desa",
    excerpt: "Ringkasan acara tahunan dan dampaknya bagi pariwisata lokal.",
    image: "https://images.unsplash.com/photo-1526481280698-85c8a32d2c3a?w=800",
    date: "2025-04-20",
  },
  {
    id: 3,
    title: "Pelatihan UMKM Digital",
    excerpt: "Program pelatihan pemasaran online bagi pelaku UMKM.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    date: "2025-03-05",
  },
];

export default function ArticleList() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-slate-800">
              Artikel Terbaru
            </h3>
            <p className="text-slate-500">
              Bacaan tentang program, event, dan tips komunitas
            </p>
          </div>
          <a href="/articles" className="text-sm text-blue-600 font-medium">
            Lihat Semua →
          </a>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a) => (
            <article
              key={a.id}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={a.image}
                alt={a.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-4">
                <div className="text-xs text-slate-400">{a.date}</div>
                <h4 className="mt-1 font-semibold text-slate-800">{a.title}</h4>
                <p className="mt-2 text-sm text-slate-600">{a.excerpt}</p>
                <a
                  href={`/articles/${a.id}`}
                  className="mt-3 inline-block text-sm text-blue-600"
                >
                  Baca Selengkapnya →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
