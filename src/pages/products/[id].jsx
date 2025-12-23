import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import MainLayout from "@/pages/layouts/MainLayout";
import ProductCard from "@/components/ProductCard";
import { apiGet, getStorageUrl } from "@/utils/api";
import { addToCart } from "@/utils/cart";
import {
  ShoppingCart,
  Check,
  AlertCircle,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
} from "lucide-react";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      loadProductDetail();
    }
  }, [id]);

  const loadProductDetail = async () => {
    try {
      setLoading(true);
      // Fetch current product
      const productData = await apiGet(`products/${id}`);
      setProduct(productData.data || productData); // Handle potential response structure

      // Fetch all products for "Related Products" recommendation (simple logic: exclude current)
      const allProducts = await apiGet("products");
      const others = (
        Array.isArray(allProducts) ? allProducts : allProducts.data || []
      )
        .filter((p) => p.id !== parseInt(id))
        .slice(0, 4); // Take 4 products
      setRelatedProducts(others);
    } catch (err) {
      console.error("Error loading product:", err);
      setError("Gagal memuat produk. Produk mungkin tidak ditemukan.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (val) => {
    if (!product) return;
    const newQty = Math.max(1, Math.min(val, product.stock));
    setQuantity(newQty);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    alert(`${quantity}x ${product.name} berhasil ditambahkan ke keranjang!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-6">
          <AlertCircle size={48} className="text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Produk Tidak Ditemukan
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "Produk yang Anda cari tidak tersedia."}
          </p>
          <button
            onClick={() => router.push("/products")}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Kembali ke Galeri
          </button>
        </div>
      </MainLayout>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <MainLayout>
      <Head>
        <title>{product.name} - Desa Selat</title>
      </Head>

      <div className="bg-gray-50 min-h-screen pb-20">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center text-sm text-gray-500">
              <span
                onClick={() => router.push("/")}
                className="cursor-pointer hover:text-green-600"
              >
                Beranda
              </span>
              <span className="mx-2">/</span>
              <span
                onClick={() => router.push("/products")}
                className="cursor-pointer hover:text-green-600"
              >
                Produk
              </span>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium truncate">
                {product.name}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden grid md:grid-cols-2 gap-0">
            {/* Left: Image Gallery */}
            <div className="p-8 bg-gray-50 flex items-center justify-center">
              <div className="aspect-square w-full max-w-md bg-white rounded-xl shadow-sm overflow-hidden relative group">
                {product.image ? (
                  <img
                    src={getStorageUrl(product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = "none";
                      e.target.parentElement.classList.add(
                        "flex",
                        "items-center",
                        "justify-center",
                        "text-gray-400",
                        "bg-gray-100"
                      );
                      e.target.parentElement.innerHTML =
                        '<span class="text-6xl">📦</span>';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    <span className="text-6xl">📦</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="p-8 md:p-12 flex flex-col">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-bold text-green-600">
                  {formatCurrency(product.price)}
                </div>
                {product.stock > 0 ? (
                  <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    <Check size={16} />
                    <span>Stok Tersedia ({product.stock})</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                    <AlertCircle size={16} />
                    <span>Stok Habis</span>
                  </div>
                )}
              </div>

              <div className="prose prose-slate mb-8 text-gray-600">
                <p>
                  {product.description ||
                    "Tidak ada deskripsi untuk produk ini."}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1 || isOutOfStock}
                      className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      <Minus size={18} />
                    </button>
                    <div className="w-12 text-center font-medium text-gray-900">
                      {quantity}
                    </div>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= product.stock || isOutOfStock}
                      className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.stock} barang tersisa
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex-1 px-6 py-4 bg-white border-2 border-green-600 text-green-600 rounded-xl font-bold hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Tambah ke Keranjang
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="flex-1 px-6 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
                >
                  Beli Sekarang
                </button>
              </div>

              {/* Features Guarantee */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck size={20} className="text-green-600" />
                  <span>Pengiriman Cepat</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <ShieldCheck size={20} className="text-green-600" />
                  <span>Kualitas Terjamin</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Produk Lainnya
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={(prod) => {
                      addToCart(prod, 1);
                      alert("Produk ditambahkan ke keranjang!");
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
