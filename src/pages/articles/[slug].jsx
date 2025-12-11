import MainLayout from "../layouts/MainLayout";
import { apiGet } from "../utils/api";
import Link from "next/link";

// --- 1. Data Fetching (Kode Anda sudah baik, sedikit perbaikan pesan error) ---
export async function getServerSideProps({ params }) {
  const { slug } = params;

  try {
    // Fetch detail berdasarkan slug
    const article = await apiGet(`articles/${slug}`);

    // Cek apakah API mengembalikan data yang valid atau objek error
    if (!article || article.message === "Not Found" || !article.title) {
      return { notFound: true };
    }

    return { props: { article } };
  } catch (error) {
    // Tangani error jaringan atau server
    console.error("Error fetching article:", error);
    return { notFound: true };
  }
}

// --- 2. Komponen Article Detail dengan Desain Premium ---
export default function ArticleDetail({ article }) {
  // Format tanggal untuk tampilan yang lebih elegan
  const formatDate = (dateString) => {
    if (!dateString) return "Belum dipublikasikan";
    try {
      // Mengambil tanggal saja (menghilangkan waktu) jika formatnya 'YYYY-MM-DD HH:MM:SS'
      const dateOnly = dateString.split(" ")[0];
      return new Date(dateOnly).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString; // Kembali ke format asli jika gagal
    }
  };

  const publishedDate = formatDate(article.published_at);
  const createdDate = formatDate(article.created_at);

  return (
    <MainLayout>
      <article className="max-w-4xl mx-auto px-6 py-16 mt-10">
        {/* Breadcrumb / Kembali ke Daftar */}
        <div className="mb-10">
          <Link
            href="/articles"
            className="inline-flex items-center text-gray-500 hover:text-blue-600 transition duration-300 font-medium"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Kembali ke Daftar Artikel
          </Link>
        </div>

        {/* === HEADER ARTIKEL UTAMA === */}
        <header className="mb-12 pb-6 border-b border-gray-200">
          {/* Judul Utama yang Sangat Menonjol */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            {article.title}
          </h1>

          {/* Info Penulis dan Tanggal Publikasi */}
          <div className="flex items-center space-x-4 text-gray-600 mt-5 text-lg">
            <span>
              Oleh{" "}
              <span className="font-bold text-gray-900">
                {article.author ?? "Admin Desa"}
              </span>
            </span>
            <span>•</span>
            <span className="text-sm">Dipublikasikan: {publishedDate}</span>
          </div>
        </header>

        {/* === GAMBAR UTAMA (Jika Ada) === */}
        {article.image && (
          <figure className="mb-12 rounded-xl overflow-hidden shadow-2xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto max-h-[500px] object-cover"
              // Efek hover zoom halus jika Anda ingin menambahkan interaksi
              // className="w-full h-auto max-h-[500px] object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </figure>
        )}

        {/* === KONTEN UTAMA (Fokus pada Readability) === */}
        <section
          className="prose prose-xl max-w-none text-gray-800 leading-relaxed"
          // Menggunakan Tailwind Typography (Pastikan terinstal dan terkonfigurasi)
        >
          {/* Render HTML content */}
          <div
            dangerouslySetInnerHTML={{
              __html:
                article.content ?? "<p>Konten artikel belum tersedia.</p>",
            }}
          />
        </section>

        {/* === FOOTER ARTIKEL & META DATA LAINNYA === */}
        <footer className="mt-20 pt-8 border-t border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Detail Tambahan
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-sm text-gray-600">
            <p>
              <span className="font-medium text-gray-700">Penulis:</span>{" "}
              {article.author}
            </p>
            <p>
              <span className="font-medium text-gray-700">Slug:</span>
              <code className="bg-gray-100 p-1 rounded ml-1 text-xs">
                {article.slug}
              </code>
            </p>
            <p>
              <span className="font-medium text-gray-700">Dibuat:</span>{" "}
              {createdDate}
            </p>
            <p>
              <span className="font-medium text-gray-700">
                Terakhir Diperbarui:
              </span>{" "}
              {formatDate(article.updated_at)}
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/articles"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition duration-300 shadow-sm"
            >
              Jelajahi Artikel Lainnya
            </Link>
          </div>
        </footer>
      </article>
    </MainLayout>
  );
}
