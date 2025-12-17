// src/components/Contact.jsx
export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-semibold">Hubungi Kami</h3>
          <p className="mt-2 text-slate-600">
            Ada pertanyaan, kolaborasi, atau dukungan? Isi form di samping atau
            kunjungi kantor desa.
          </p>

          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <div>
              <strong>Alamat:</strong> Jl. Desa Selat No.1
            </div>
            <div>
              <strong>Telepon:</strong> (021) 1234 5678
            </div>
            <div>
              <strong>Email:</strong> info@desaselat.id
            </div>
          </div>
        </div>

        <form className="space-y-4 bg-slate-50 rounded-lg p-6 shadow">
          <div>
            <label className="text-sm text-slate-600">Nama</label>
            <input
              className="mt-1 w-full rounded-md border-gray-200 p-2"
              placeholder="Nama lengkap"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Email</label>
            <input
              className="mt-1 w-full rounded-md border-gray-200 p-2"
              placeholder="email@contoh.com"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Pesan</label>
            <textarea
              className="mt-1 w-full rounded-md border-gray-200 p-2 h-28"
              placeholder="Tulis pesan..."
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium"
            >
              Kirim Pesan
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
