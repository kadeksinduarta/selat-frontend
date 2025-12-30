// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo-desa.png" className="w-16 h-16" alt="" />
            <div>
              <div className="font-semibold">Desa Selat</div>
              <div className="text-xs text-slate-300">
                Potensi • Berita • Produk Lokal
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-300 max-w-sm">
            Website resmi Desa Selat — mendukung UMKM lokal dan menyebarkan
            informasi yang bermanfaat bagi masyarakat.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Navigasi</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>
              <a href="/" className="hover:text-white">
                Beranda
              </a>
            </li>
            <li>
              <a href="/articles" className="hover:text-white">
                Artikel
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-white">
                Produk
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                Kontak
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Kontak</h4>
          <div className="mt-3 text-sm text-slate-300">
            <div>Jl. Desa Selat No.1</div>
            <div className="mt-1">Tel: (021) 1234 5678</div>
            <div className="mt-1">Email: info@desaselat.id</div>
            <div className="mt-4 flex gap-3">
              <a className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                Fb
              </a>
              <a className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                Ig
              </a>
              <a className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                Yt
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-slate-400 text-center">
          © {new Date().getFullYear()} Desa Selat — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
