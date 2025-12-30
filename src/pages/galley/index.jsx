import MainLayout from "../layouts/MainLayout";
import Link from "next/link";
// Jika Anda memiliki API fetch, impor di sini:
// import { apiGet } from "../utils/api";

// --- DATA DUMMY UNTUK SIMULASI ---
const innovationItems = [
  {
    id: 1,
    title: "Sistem Irigasi Pintar Berbasis IoT",
    category: "Teknologi & Lingkungan",
    slug: "irigasi-pintar",
    image: "/images/galeri/inovasi-iot.jpg", // Ganti dengan path gambar Anda
    student: "Kelompok Sains Kelas XII",
  },
  {
    id: 2,
    title: "Pemanfaatan Limbah Cangkang Kelapa Menjadi Arang Briket",
    category: "Energi Terbarukan",
    slug: "briket-kelapa",
    image: "/images/galeri/briket-kelapa.jpg",
    student: "Eko Pratama (Kelas XI)",
  },
  {
    id: 3,
    title: "Aplikasi Mobile Informasi Pariwisata Desa Selat",
    category: "Digital & Kreatif",
    slug: "app-pariwisata",
    image: "/images/galeri/app-pariwisata.jpg",
    student: "Tim Developer Muda",
  },
  {
    id: 4,
    title: "Pupuk Kompos Organik Super Cepat",
    category: "Pertanian",
    slug: "pupuk-organik",
    image: "/images/galeri/pupuk-organik.jpg",
    student: "Siswa/i Jurusan Agrikultur",
  },
  {
    id: 5,
    title: "Desain dan Implementasi Web Desa Interaktif",
    category: "Digital & Kreatif",
    slug: "web-desa",
    image: "/images/galeri/web-desa.jpg",
    student: "Putu Ayu (Kelas X)",
  },
  {
    id: 6,
    title: "Alat Pengukur PH Tanah Portabel",
    category: "Teknologi & Pertanian",
    slug: "ph-meter",
    image: "/images/galeri/ph-meter.jpg",
    student: "Kelompok Fisika Terapan",
  },
];

// --- FUNGSI HALAMAN GALERI ---
export default function GalleryPage() {
  return (
    <MainLayout>
      <section className="max-w-7xl mx-auto px-6 py-16 bg-gray-50 mt-20">
        {/* === HEADER GALERI PREMIUM === */}
        <div className="text-center mb-16 border-b pb-8">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
            Pameran Karya Siswa
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mt-2 leading-tight">
            Galeri Inovasi Muda Desa Selat
          </h1>
          <p className="text-gray-600 mt-4 text-xl font-light max-w-3xl mx-auto">
            Jelajahi hasil karya kreatif dan solusi inovatif dari generasi muda
            Desa Selat untuk kemajuan komunitas.
          </p>
        </div>

        {/* === GRID GALERI INOVASI === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {innovationItems.map((item) => (
            <Link
              key={item.id}
              href={`/gallery/${item.slug}`} // Link ke halaman detail inovasi
              // Kartu yang elegan dan menonjol
              className="group block bg-white rounded-xl overflow-hidden shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:shadow-2xl border border-gray-100"
            >
              {/* Gambar Proyek (Visual Focus) */}
              <div className="relative w-full h-72 overflow-hidden">
                {" "}
                {/* Tinggi ditambah sedikit */}
                <img
                  src={item.image}
                  alt={item.title}
                  // Efek zoom in halus pada hover
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                {/* Overlay Kategori/Tag */}
                <div className="absolute top-4 left-4 bg-gray-900 text-white text-xs font-semibold py-1 px-3 rounded-full opacity-90">
                  {item.category}
                </div>
              </div>

              {/* Detail Proyek (Minimalis) */}
              <div className="p-6">
                {/* Judul Proyek */}
                <h3 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-blue-700 transition duration-300 line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
