import { MapPin, Users, Leaf, Target, Heart, Shield } from "lucide-react";

export default function About() {
  const stats = [
    {
      icon: Target,
      label: "Visi",
      text: "Mandiri & Berkelanjutan",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Heart,
      label: "Misi",
      text: "Pemberdayaan UMKM",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Shield,
      label: "Nilai",
      text: "Gotong Royong",
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-32 -z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold">
              <MapPin size={16} />
              <span>Desa Selat, Klungkung</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
              Membangun Kemandirian <br />
              <span className="text-green-600">Melalui Kolaborasi</span>
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed">
              Desa Selat adalah komunitas yang berfokus pada pemberdayaan ekonomi
              lokal, pelestarian budaya, dan pengembangan potensi sumber daya alam
              secara berkelanjutan. Melalui platform digital ini, kami menghubungkan
              karya warga desa dengan pasar yang lebih luas.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              {stats.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="p-6 bg-white rounded-xl shadow-md border hover:shadow-lg transition-shadow"
                  >
                    <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon size={24} />
                    </div>
                    <div className="text-sm font-medium text-slate-500 mb-1">
                      {item.label}
                    </div>
                    <div className="font-bold text-slate-800">
                      {item.text}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 mt-8 flex sm:flex-row flex-col gap-6 sm:items-center">
              <div className="flex items-center gap-4">


                <div className="p-3 bg-slate-100 rounded-full">
                  <Leaf className="text-slate-600" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">85%</div>
                  <div className="text-sm text-slate-500">Wilayah Hijau</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-12">
                <div className="rounded-2xl overflow-hidden shadow-lg h-64 transform hover:scale-105 transition duration-500">
                  <img
                    src="sawah-2.jpg"
                    alt="Pemandangan Desa"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg h-48 transform hover:scale-105 transition duration-500">
                  <img
                    src="sawah.jpg"
                    alt="Pertanian Desa"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-lg h-48 transform hover:scale-105 transition duration-500">
                  <img
                    src="sawah-3.webp"
                    alt="Budaya Desa"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg h-64 transform hover:scale-105 transition duration-500">
                  <img
                    src="tps-desa-selat.jpeg"
                    alt="Masyarakat Desa"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Overlay decoration */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-green-100 rounded-full -z-10 blur-3xl opacity-50" />
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-100 rounded-full -z-10 blur-3xl opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
}
