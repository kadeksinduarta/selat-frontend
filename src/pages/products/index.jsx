import { apiGet } from "../utils/api";
import MainLayout from "../layouts/MainLayout";

// Data Dummy untuk Kategori
const categories = [
  "Semua Produk",
  "Aksesoris",
  "Elektronik",
  "Pakaian Pria",
  "Pakaian Wanita",
  "Peralatan Rumah",
];

export async function getServerSideProps() {
  const products = await apiGet("products");
  return { props: { products } };
}

export default function Shop({ products }) {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-20">
        {/* === 1. Header (Pencarian & Keranjang) === */}
        <header className="flex items-center justify-between mb-8 border-b pb-4">
          {/* Judul & Logo */}
          <h1 className="text-4xl font-light text-gray-800 tracking-widest uppercase">
            Koleksi Eksklusif
          </h1>

          {/* Search Bar (Tengah) */}
          <div className="hidden lg:block w-full max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari produk eksklusif..."
                className="w-full py-2 px-4 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-150 shadow-sm"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
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
          </div>

          {/* Logo Keranjang */}
          <button className="relative p-2 rounded-full hover:bg-gray-200 transition duration-150">
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-full">
              3
            </span>
          </button>
        </header>

        {/* === 2. Konten Utama (Sidebar + Produk Grid) === */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Kategori */}
          <aside className="w-full lg:w-64 p-6 bg-white rounded-xl shadow-lg h-min sticky top-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Filter Kategori
            </h2>
            <nav className="space-y-2">
              {categories.map((category, index) => (
                <a
                  key={index}
                  href="#"
                  // Aktifkan kategori pertama secara default (contoh)
                  className={`block py-2 px-3 rounded-lg text-sm transition duration-150 ${
                    index === 0
                      ? "bg-gray-900 text-white font-medium shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </a>
              ))}
            </nav>
          </aside>

          {/* Produk Grid */}
          <main className="flex-1">
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((p) => (
                <a
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="group block rounded-2xl overflow-hidden shadow-2xl bg-white transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-gray-400/50"
                  style={{
                    // Menambahkan sentuhan minimalis dan mewah dengan border tipis internal
                    border: "1px solid #f0f0f0",
                  }}
                >
                  {/* Wrapper Gambar (Height lebih tinggi, fokus visual) */}
                  <div className="relative w-full h-96 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                  </div>

                  {/* Detail Produk (Gaya minimalis) */}
                  <div className="p-6 flex flex-col justify-between h-auto">
                    <h3 className="text-xl font-medium text-gray-900 truncate mb-2">
                      {p.name}
                    </h3>
                    <p className="text-3xl font-extrabold text-gray-900 mt-1">
                      Rp {p.price.toLocaleString("id-ID")}
                    </p>

                    {/* Call to Action Premium */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-semibold text-white bg-gray-900 rounded-xl shadow-md opacity-90 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black">
                        Lihat Produk
                        <svg
                          className="ml-2 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
}
