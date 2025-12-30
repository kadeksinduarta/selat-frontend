import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Head from "next/head";
import MainLayout from "@/pages/layouts/MainLayout";
import ProductCard from "@/components/ProductCard";
import { apiGet } from "@/utils/api";
import { addToCart } from "@/utils/cart";
import { Search, SlidersHorizontal } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceSort, setPriceSort] = useState("default"); // default, low-high, high-low
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, priceSort]);

  const loadProducts = async () => {
    try {
      const data = await apiGet("products");
      // Ensure data is array
      const productList = Array.isArray(data) ? data : data.data || [];
      setProducts(productList);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let result = [...products];

    // Search
    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (priceSort === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (priceSort === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    // Could add toast notification here
    toast.success(`${product.name} berhasil ditambahkan ke keranjang!`);
  };

  return (
    <MainLayout>
      <Head>
        <title>Produk Desa - Desa Selat</title>
      </Head>

      <div className="bg-green-50 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4 mt-16">
            Galeri Produk Desa
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Jelajahi berbagai produk unggulan hasil karya warga Desa Selat.
            Dukung ekonomi lokal dengan membeli produk asli desa kami.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 text-gray-600">
              <SlidersHorizontal size={20} />
              <span className="hidden sm:inline font-medium">Urutkan:</span>
            </div>
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="flex-1 md:w-48 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white cursor-pointer"
            >
              <option value="default">Terbaru</option>
              <option value="low-high">Harga Terendah</option>
              <option value="high-low">Harga Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <p className="text-xl text-gray-500 font-medium">
              Tidak ada produk yang ditemukan
            </p>
            <p className="text-gray-400 mt-2">
              Coba kata kunci lain atau reset filter
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setPriceSort("default");
              }}
              className="mt-6 text-green-600 font-semibold hover:underline"
            >
              Reset Pencarian
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
