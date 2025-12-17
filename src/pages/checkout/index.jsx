import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MainLayout from "../layouts/MainLayout";
import { getCart, getCartTotal, clearCart } from "@/utils/cart";
import { userGet, userPost, apiGet } from "@/utils/api";
import {
  MapPin,
  User,
  Phone,
  CreditCard,
  ShieldCheck,
  Loader2,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [pickupDate, setPickupDate] = useState("");

  useEffect(() => {
    if (router.isReady) {
      checkAuthAndLoadData();
    }
  }, [router.isReady]);

  const checkAuthAndLoadData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Silakan login terlebih dahulu untuk melakukan checkout.");
        router.push("/auth/login?redirect=/checkout");
        return;
      }

      // CHECK MODE: Direct Buy vs Cart Checkout
      const { mode, product_id, qty, items: itemsQuery } = router.query;

      if (mode === "direct" && product_id) {
        // --- DIRECT BUY MODE ---
        try {
          const productRes = await apiGet(`products/${product_id}`);
          const product = productRes.data || productRes;

          const quantity = parseInt(qty) || 1;

          const directItem = {
            ...product,
            quantity: quantity,
          };

          setCartItems([directItem]);
          setTotal(product.price * quantity);
        } catch (error) {
          console.error("Error fetching product for direct buy:", error);
          alert("Produk tidak ditemukan.");
          router.push("/products");
          return;
        }
      } else {
        // --- CART CHECKOUT MODE (Existing Logic) ---
        const allItems = getCart();
        const selectedIds = itemsQuery ? itemsQuery.split(",") : [];

        if (allItems.length === 0) {
          router.push("/products");
          return;
        }

        if (!itemsQuery) {
          router.push("/cart");
          return;
        }

        const items =
          selectedIds.length > 0
            ? allItems.filter((item) => selectedIds.includes(String(item.id)))
            : allItems;

        if (items.length === 0) {
          alert("Tidak ada item yang dipilih untuk checkout.");
          router.push("/cart");
          return;
        }

        setCartItems(items);
        setTotal(
          items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        );
      }

      // Load User Profile & Address
      const profileRes = await userGet("profile", token);
      const userData = profileRes.data || profileRes;
      setUser(userData);

      // Fetch addresses
      const addressRes = await userGet("addresses", token);
      const addressesData = addressRes.data || addressRes;
      const addresses = Array.isArray(addressesData) ? addressesData : [];
      const defaultAddress =
        addresses.find((a) => a.is_default) || addresses[0];

      if (!defaultAddress) {
        alert(
          "Mohon lengkapi alamat pengiriman di profil Anda sebelum checkout."
        );
        router.push("/profile/addresses");
        return;
      }

      setAddress(defaultAddress);
      setLoading(false);
    } catch (error) {
      console.error("Checkout error:", error);
      if (!localStorage.getItem("token")) {
        router.push("/auth/login");
      }
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!pickupDate) {
      alert("Mohon isi Tanggal Pengambilan/Pengiriman pesanan.");
      return;
    }

    setProcessing(true);
    try {
      const token = localStorage.getItem("token");

      const orderData = {
        items: cartItems.map((item) => ({
          product_id: item.id,
          qty: item.quantity,
          price: item.price,
        })),
        total_amount: total,
        shipping_address_id: address.id,
        payment_method: "transfer",
        pickup_date: pickupDate,
      };

      console.log("Sending order data:", orderData);
      const response = await userPost("checkout", orderData, token);
      console.log("Order response:", response);

      if (response.transaction && response.transaction.id) {
        // Only clear from cart if NOT in direct mode
        if (router.query.mode !== "direct") {
          // Remove ONLY the checked-out items from the global cart
          cartItems.forEach((item) => {
            const currentCart = getCart().filter((c) => c.id !== item.id);
            localStorage.setItem("shopping_cart", JSON.stringify(currentCart));
          });
        }

        router.push(`/checkout/success?orderId=${response.transaction.id}`);
      } else {
        throw new Error(response.message || "Gagal membuat pesanan");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert(
        "Gagal memproses pesanan: " + (error.message || "Terjadi kesalahan")
      );
    } finally {
      setProcessing(false);
    }
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

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <ShieldCheck className="text-green-600" />
            Konfirmasi Pesanan
          </h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Alert Pre-order */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 text-blue-800">
                <div className="mt-1">ℹ️</div>
                <div>
                  <h3 className="font-bold">Sistem Pre-Order</h3>
                  <p className="text-sm mt-1">
                    Produk ini menggunakan sistem pemesanan awal. Silakan
                    tentukan tanggal kapan Anda membutuhkan produk ini
                    (pengambilan/pengiriman).
                  </p>
                </div>
              </div>

              {/* Date Picker Section */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  📅 Rencana Pengambilan/Pengiriman
                </h2>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600">Pilih Tanggal</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={pickupDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setPickupDate(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    *Pastikan tanggal yang dipilih memungkinkan bagi kami untuk
                    menyiapkan pesanan Anda.
                  </p>
                </div>
              </div>

              {/* Address Section */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <MapPin size={20} className="text-gray-500" />
                    Alamat Pengiriman
                  </h2>
                  <button
                    onClick={() => router.push("/profile/addresses")}
                    className="text-sm text-green-600 font-medium hover:underline"
                  >
                    Ubah
                  </button>
                </div>
                {address ? (
                  <div className="text-gray-600 text-sm leading-relaxed">
                    <div className="font-semibold text-gray-800 mb-1">
                      {address.recipient_name}
                    </div>
                    <p>{address.phone_number}</p>
                    <p>{address.full_address}</p>
                    <p>
                      {address.district}, {address.village}{" "}
                      {address.postal_code}
                    </p>
                  </div>
                ) : (
                  <div className="text-red-500">Alamat belum diatur</div>
                )}
              </div>

              {/* Order Items */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  Rincian Barang
                </h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <img
                            src={
                              item.image?.startsWith("http")
                                ? item.image
                                : `${process.env.NEXT_PUBLIC_API_URL.replace(
                                    "/api",
                                    ""
                                  )}/storage/${item.image}`
                            }
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-xl">
                            📦
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {item.quantity} x {formatCurrency(item.price)}
                        </p>
                      </div>
                      <div className="font-semibold text-gray-800">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary & Payment */}
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-lg font-bold text-gray-800 mb-6">
                  Ringkasan Pembayaran
                </h2>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Total Harga ({cartItems.length} barang)</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Total Ongkos Kirim</span>
                    <span className="text-green-600 font-medium">Gratis</span>
                  </div>
                  <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg text-gray-800">
                    <span>Total Tagihan</span>
                    <span className="text-green-600">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <div className="flex items-start gap-3">
                    <CreditCard className="text-blue-600 mt-1" size={20} />
                    <div>
                      <p className="font-bold text-blue-800 text-sm">
                        Metode Pembayaran
                      </p>
                      <p className="text-sm text-blue-600 mt-1">
                        Transfer Bank (Manual)
                      </p>
                      <p className="text-xs text-blue-500 mt-2">
                        Silakan transfer ke rekening desa setelah membuat
                        pesanan.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={processing}
                  className="w-full py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Memproses...
                    </>
                  ) : (
                    "Buat Pesanan"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
