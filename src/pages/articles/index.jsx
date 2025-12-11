import Link from "next/link";
import { apiGet } from "../utils/api";
import MainLayout from "../layouts/MainLayout";

export async function getServerSideProps() {
  const articles = await apiGet("articles");
  return { props: { articles } };
}

export default function ArticleList({ articles }) {
  return (
    <MainLayout>
      <section className="max-w-7xl mx-auto px-6 py-16 mt-10 bg-white">
        {/* === HEADER DAN SEARCH BAR ELEGANT === */}
        <div className="text-center mb-14 border-b pb-8">
          {/* Judul Utama */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Informasi Desa Selat
          </h1>
          <p className="text-gray-600 mt-3 text-xl font-light">
            Temukan artikel, berita, dan laporan terbaru
          </p>

          {/* Search Bar Premium */}
          {/* <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative shadow-lg rounded-full">
              <input
                type="text"
                placeholder="Cari artikel, topik, atau penulis..."
                // Styling input yang lebih profesional
                className="w-full py-3 pl-12 pr-6 border border-gray-300 rounded-full text-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition duration-300"
              />
              <svg
                className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div> */}
        </div>
        {/* === AKHIR HEADER === */}

        {/* Grid Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Pastikan articles.data ada sebelum memanggil map */}
          {articles.data?.map((item) => (
            <article
              key={item.id}
              // Redesign Card: Shadow lebih kuat, rounded lebih halus
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-50 group transform hover:-translate-y-1"
            >
              {/* Image */}
              <Link href={`/articles/${item.slug}`}>
                <div className="overflow-hidden">
                  <img
                    src={item.image || "/hero.jpg"}
                    alt={item.title}
                    // Gambar lebih tinggi dan efek zoom in yang lebih halus
                    className="w-full h-56 object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              </Link>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Meta di atas Judul untuk kesan jurnalistik */}
                <div className="flex items-center space-x-3 text-sm text-gray-500 mb-2">
                  <span className="font-medium text-blue-600 tracking-wider uppercase">
                    {item.category ?? "Informasi"}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span>{item.published_at ?? "Belum dipublikasikan"}</span>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-extrabold text-gray-900 leading-snug">
                  <Link
                    href={`/articles/${item.slug}`}
                    // Efek hover minimalis pada judul
                    className="hover:text-blue-700 transition duration-300"
                  >
                    {item.title}
                  </Link>
                </h2>

                {/* Description */}
                <p className="text-gray-600 mt-4 line-clamp-3 leading-relaxed">
                  {item.excerpt ?? "Klik untuk membaca selengkapnya…"}
                </p>

                {/* Author dan Read more (Dibuat lebih terpisah) */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                  {/* Author */}
                  <p className="text-sm text-gray-500">
                    Oleh:{" "}
                    <span className="font-semibold text-gray-700">
                      {item.author}
                    </span>
                  </p>

                  {/* Read more */}
                  <Link
                    href={`/articles/${item.slug}`}
                    className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition duration-300"
                  >
                    Baca →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
