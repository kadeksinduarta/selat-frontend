import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MainLayout from "../layouts/MainLayout";
import {
  ShoppingBag,
  Package,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { userGet } from "../../utils/api";

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadOrders();
  }, [filter]);

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/login");
        return;
      }

      const url =
        filter === "all" ? "transactions" : `transactions?status=${filter}`;
      const data = await userGet(url, token);
      setOrders(data);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        icon: Clock,
        label: "Pending",
      },
      processing: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: Package,
        label: "Diproses",
      },
      completed: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: CheckCircle,
        label: "Selesai",
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: XCircle,
        label: "Dibatalkan",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 ${config.bg} ${config.text} rounded-full text-sm font-medium`}
      >
        <Icon size={14} />
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Pesanan Saya</h1>
            <p className="text-gray-600 mt-2">Lihat dan kelola pesanan Anda</p>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-xl shadow-sm p-2 mb-6 flex gap-2 overflow-x-auto">
            {[
              { value: "all", label: "Semua" },
              { value: "pending", label: "Pending" },
              { value: "processing", label: "Diproses" },
              { value: "completed", label: "Selesai" },
              { value: "cancelled", label: "Dibatalkan" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                  filter === tab.value
                    ? "bg-green-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Orders List */}
          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Belum Ada Pesanan
              </h3>
              <p className="text-gray-600 mb-6">
                {filter === "all"
                  ? "Anda belum memiliki pesanan"
                  : `Tidak ada pesanan dengan status ${filter}`}
              </p>
              <button
                onClick={() => router.push("/products")}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
                >
                  {/* Order Header */}
                  <div className="flex items-start justify-between mb-4 pb-4 border-b">
                    <div>
                      <p className="text-sm text-gray-600">
                        Order ID: #{order.id}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 mb-4">
                    {order.items &&
                      order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Package className="w-8 h-8 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">
                              {item.product?.name || "Produk"}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {item.qty} x {formatCurrency(item.price)}
                            </p>
                          </div>
                          <p className="font-semibold text-gray-800">
                            {formatCurrency(item.qty * item.price)}
                          </p>
                        </div>
                      ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <p className="text-sm text-gray-600">Total Pembayaran</p>
                    <p className="text-xl font-bold text-green-600">
                      {formatCurrency(order.total_amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
