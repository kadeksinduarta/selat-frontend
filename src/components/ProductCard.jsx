import Link from "next/link";
import { ShoppingCart, Eye, Tag } from "lucide-react";
import { getStorageUrl } from "@/utils/api";

export default function ProductCard({ product, onAddToCart }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onAddToCart) {
            onAddToCart(product);
        }
    };

    const isOutOfStock = product.stock <= 0;

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group h-full flex flex-col relative">
            {isOutOfStock && (
                <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Habis
                </div>
            )}

            {product.stock > 0 && product.stock < 10 && (
                <div className="absolute top-4 left-4 z-10 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Stok Terbatas
                </div>
            )}

            <Link href={`/products/${product.id}`} className="block relative h-56 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
                {product.image ? (
                    <img
                        src={getStorageUrl(product.image)}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-7xl">📦</span>
                    </div>
                )}

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-white">
                        <Eye size={20} />
                        <span className="font-semibold">Lihat Detail</span>
                    </div>
                </div>
            </Link>

            <div className="p-5 flex-1 flex flex-col">
                <Link href={`/products/${product.id}`} className="block">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors min-h-[3.5rem]">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-gray-600 text-sm line-clamp-2 mb-3 flex-1">
                    {product.description || "Produk berkualitas tinggi"}
                </p>

                <div className="flex items-center gap-2 mb-4">
                    <Tag size={18} className="text-green-600" />
                    <span className="text-2xl font-bold text-green-600">
                        {formatCurrency(product.price)}
                    </span>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                    Stok: <span className={`font-semibold ${isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
                        {isOutOfStock ? 'Habis' : `${product.stock} tersedia`}
                    </span>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                        className={`flex-1 flex items-center justify-center gap-2 px-2 py-2 rounded-lg font-semibold transition-all ${isOutOfStock
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg'
                            }`}
                    >
                        <ShoppingCart size={18} />
                        <span className="hidden sm:inline"></span>
                    </button>

                    {!isOutOfStock && (
                        <Link
                            href={`/checkout?mode=direct&product_id=${product.id}&qty=1`}
                            className="flex-2 flex items-center justify-center px-2 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all hover:shadow-lg"
                        >
                            Beli
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
