import ButtonBeli from "../utils/button";
export default function ProductList({ products }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-slate-800">
              Produk Unggulan
            </h3>
            <p className="text-slate-500">
              Dukung UMKM lokal dengan membeli produk berkualitas
            </p>
          </div>
          <a href="/products" className="text-sm text-blue-600 font-medium">
            Lihat Semua →
          </a>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-slate-50 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-44 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-800">{p.name}</h4>
                  <div className="text-sm text-slate-600">{p.price}</div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <ButtonBeli />
                  <a
                    href={`/products/${p.id}`}
                    className="text-sm text-slate-700"
                  >
                    Detail
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
