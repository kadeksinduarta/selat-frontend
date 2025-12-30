import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { apiGet } from "../utils/api";
import { addToCart } from "../utils/cart";
import { ArrowRight } from "lucide-react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await apiGet("products");
      setProducts(data || []);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    alert(`${product.name} ditambahkan ke keranjang!`);
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Produk Unggulan
            </h2>
            <p className="text-lg text-gray-600">
              Dukung UMKM lokal dengan membeli produk berkualitas
            </p>
          </div>
          <Link
            href="/products"
            className="hidden md:flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all group"
          >
            <span>Lihat Semua</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            <span>Lihat Semua Produk</span>
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Belum ada produk tersedia</p>
          </div>
        )}
      </div>
    </section>
  );
}
