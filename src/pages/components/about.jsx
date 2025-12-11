// src/components/About.jsx
export default function About() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-slate-800">
            Tentang Desa Selat
          </h2>
          <p className="text-slate-600 max-w-xl">
            Desa Selat adalah komunitas yang berfokus pada pemberdayaan ekonomi
            lokal, pelestarian budaya, dan pengembangan potensi sumber daya alam
            secara berkelanjutan. Melalui website ini, warga dan pengunjung
            dapat mengakses informasi, berinteraksi, dan mendukung produk lokal.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg text-center">
              <div className="text-sm text-slate-600">Visi</div>
              <div className="font-semibold">Mandiri & Berkelanjutan</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg text-center">
              <div className="text-sm text-slate-600">Misi</div>
              <div className="font-semibold">Pemberdayaan UMKM</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg text-center">
              <div className="text-sm text-slate-600">Nilai</div>
              <div className="font-semibold">Gotong Royong</div>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200"
              alt="about desa"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
