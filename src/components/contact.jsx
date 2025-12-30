// src/components/Contact.jsx
export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-semibold">Hubungi Kami</h3>
          <p className="mt-2 text-slate-600">
            Ada pertanyaan, kolaborasi, atau dukungan? Silakan temukan lokasi kami
            melalui peta di samping atau kunjungi kantor desa kami.
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

        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31568.545572273502!2d115.3818460917763!3d-8.492750511623822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2109586efee79%3A0x5030bfbca832190!2sSelat%2C%20Kec.%20Klungkung%2C%20Kabupaten%20Klungkung%2C%20Bali!5e0!3m2!1sid!2sid!4v1767077801106!5m2!1sid!2sid"
            className="w-full h-full min-h-[400px] rounded-2xl shadow-xl border-0"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

        </div>
      </div>
    </section>
  );
}
