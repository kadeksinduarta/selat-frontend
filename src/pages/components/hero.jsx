export default function Hero() {
  return (
    <section
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      {/* Overlay gradient */}
      <div className=" inset-0 bg-gradient-to-b from-black-600/100 to-white/40 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Selamat Datang di Website Desa Selat
        </h1>

        <p className="mt-4 text-lg text-white/90 leading-relaxed">
          Website resmi Desa Selat yang menyediakan berbagai informasi mengenai
          desa, meliputi <span className="font-semibold">Artikel</span> terbaru,
          <span className="font-semibold"> Produk</span> lokal unggulan, serta{" "}
          <span className="font-semibold">Gallery</span> dokumentasi kegiatan
          dan potensi desa.
        </p>

        <a
          href="#content"
          className="inline-block mt-8 px-6 py-3 bg-white text-gray-800 rounded-full font-semibold shadow-md hover:bg-gray-100 transition"
        >
          Jelajahi Lebih Lanjut
        </a>
      </div>
    </section>
  );
}
