import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { CheckCircle, ArrowRight, Printer, AlertCircle } from "lucide-react";
import { userGet } from "../../utils/api";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    } else if (router.isReady && !orderId) {
      setLoading(false); // No ID provided
    }
  }, [orderId, router.isReady]);

  const fetchOrderDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Assuming we have an endpoint to get transaction details
      // If not, we can just show generic success or use the ID to show in message
      // Let's try to fetch if endpoint exists, otherwise just show ID
      // START-NOTE: Backend endpoint for single transaction might be needed or generic
      // For now, we'll try generic show
      // const res = await userGet(`transactions/${orderId}`, token);
      // setOrder(res.data || res);
      // END-NOTE: To keep it safe without verify backend 'show' endpoint permission for user:
      setOrder({ id: orderId });
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Halo Admin, saya baru saja melakukan checkout dengan Order ID: #${orderId}. Mohon infonya untuk pembayaran. Terima kasih.`;
    window.open(
      `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`,
      "_blank"
    );
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-green-600 p-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <CheckCircle size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Checkout Berhasil!
            </h1>
            <p className="text-green-100">Pesanan Anda telah kami terima.</p>
          </div>

          <div className="p-8">
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 mb-8 flex gap-3">
              <AlertCircle className="text-yellow-600 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <p className="font-bold mb-1">Langkah Selanjutnya:</p>
                <p>
                  Silakan lakukan pembayaran melalui transfer manual ke rekening
                  desa. Hubungi admin melalui WhatsApp untuk konfirmasi dan
                  instruksi pembayaran.
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Order ID</span>
                <span className="font-bold text-gray-800">
                  #{orderId || "-"}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Metode Pembayaran</span>
                <span className="font-bold text-gray-800">Transfer Manual</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Pending Payment
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleWhatsApp}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WA"
                  className="w-5 h-5"
                />
                Konfirmasi via WhatsApp
              </button>

              <Link
                href="/profile/orders"
                className="w-full block text-center py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition border border-gray-200"
              >
                Lihat Pesanan Saya
              </Link>

              <Link
                href="/products"
                className="w-full block text-center py-3 text-green-600 font-semibold hover:underline"
              >
                Kembali Belanja
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
