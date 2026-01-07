"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";
import MainLayout from "@/pages/layouts/MainLayout";
import { getCart, updateQuantity, removeFromCart } from "@/utils/cart";
import { getStorageUrl } from "@/utils/api";
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  //   let total = 0;

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const items = getCart();
    setCartItems(items);
    // Select all items by default so user can checkout immediately
    setSelectedItems(items.map((item) => item.id));
    setLoading(false);
  };

  // Update total whenever selected items change
  useEffect(() => {
    const newTotal = cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [selectedItems, cartItems]);

  const handleSelectItem = (id) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = updateQuantity(productId, newQuantity);
    setCartItems(updatedCart);
    // Recalculate total handled by useEffect
  };

  const handleRemoveItem = (productId) => {
    if (confirm("Hapus item ini dari keranjang?")) {
      const updatedCart = removeFromCart(productId);
      setCartItems(updatedCart);
      setSelectedItems((prev) => prev.filter((id) => id !== productId));
    }
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.error("Pilih minimal satu barang untuk di-checkout.");
      return;
    }

    // Pass selected IDs to checkout page
    router.push(`/checkout?items=${selectedItems.join(",")}`);
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
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex items-center gap-4">
            <Link
              href="/products"
              className="p-2 hover:bg-gray-200 rounded-full transition"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Keranjang Belanja
              </h1>
              <p className="text-gray-600">
                {cartItems.length} item dalam keranjang Anda
              </p>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={40} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Keranjang Kosong
              </h2>
              <p className="text-gray-600 mb-8">
                Anda belum menambahkan produk apapun ke keranjang.
              </p>
              <Link
                href="/products"
                className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Mulai Belanja
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {/* Cart Items List */}
              <div className="md:col-span-2 space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={
                      selectedItems.length === cartItems.length &&
                      cartItems.length > 0
                    }
                    onChange={handleSelectAll}
                    className="w-5 h-5 accent-green-600 cursor-pointer"
                  />
                  <span className="font-medium text-gray-700">Pilih Semua</span>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-sm p-4 flex gap-4 items-center"
                  >
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        className="w-5 h-5 accent-green-600 cursor-pointer"
                      />
                    </div>
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={getStorageUrl(item.image)}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-gray-800 line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-green-600 font-semibold mt-1">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="p-1 hover:bg-white rounded-md transition disabled:opacity-50"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.stock}
                            className="p-1 hover:bg-white rounded-md transition disabled:opacity-50"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                          title="Hapus"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Ringkasan Belanja
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Total Item Dipilih</span>
                      <span>
                        {cartItems
                          .filter((i) => selectedItems.includes(i.id))
                          .reduce((acc, item) => acc + item.quantity, 0)}{" "}
                        pcs
                      </span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold text-lg text-gray-800">
                      <span>Total Harga</span>
                      <span className="text-green-600">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={selectedItems.length === 0}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-lg hover:shadow-xl disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    Checkout ({selectedItems.length})
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
