"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import AdminLayout from "../../layouts/AdminLayout";
import { adminGet, adminPut } from "../../../utils/api";
import { Package, User, Calendar, DollarSign, Eye, Filter } from "lucide-react";

export default function OrderManagementPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [statusFilter, orders]);

  const checkAuthAndLoadData = async () => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (!token || !userData) {
        router.push("/auth/admin-login");
        return;
      }

      const user = JSON.parse(userData);
      if (user.role !== "admin") {
        router.push("/auth/admin-login");
        return;
      }

      // Load all transactions
      const response = await adminGet("transactions", token);
      // Backend returns direct array now, but keep fallback
      setOrders(Array.isArray(response) ? response : response.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      router.push("/auth/admin-login");
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    if (statusFilter === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter((order) => order.status === statusFilter)
      );
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await adminPut(`transactions/${orderId}`, { status: newStatus }, token);

      // Update local state
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      toast.success("Status pesanan berhasil diupdate!");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Gagal mengupdate status pesanan");
    }
  };

  const viewOrderDetail = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        label: "Pending",
      },
      processing: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        label: "Diproses",
      },
      completed: {
        bg: "bg-green-100",
        text: "text-green-700",
        label: "Selesai",
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-700",
        label: "Dibatalkan",
      },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
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
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Kelola Pesanan</h1>
          <p className="text-gray-600 mt-1">Daftar semua pesanan yang masuk</p>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center gap-4">
            <Filter className="text-gray-600" size={20} />
            <div className="flex gap-2 flex-wrap">
              {["all", "pending", "processing", "completed", "cancelled"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${statusFilter === status
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {status === "all"
                      ? "Semua"
                      : status === "pending"
                        ? "Pending"
                        : status === "processing"
                          ? "Diproses"
                          : status === "completed"
                            ? "Selesai"
                            : "Dibatalkan"}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Tanggal
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        {order.user?.name || "Unknown"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        {new Date(order.created_at).toLocaleDateString("id-ID")}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {formatCurrency(order.total_amount)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className="px-3 py-1 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Diproses</option>
                        <option value="completed">Selesai</option>
                        <option value="cancelled">Dibatalkan</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => viewOrderDetail(order)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm"
                      >
                        <Eye size={16} />
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {statusFilter === "all"
                  ? "Belum ada pesanan"
                  : `Tidak ada pesanan dengan status ${statusFilter}`}
              </p>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Detail Pesanan #{selectedOrder.id}
                  </h2>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Customer Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Informasi Customer
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <p className="text-sm">
                      <span className="font-semibold">Nama:</span>{" "}
                      {selectedOrder.user?.name || "-"}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Email:</span>{" "}
                      {selectedOrder.user?.email || "-"}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Telepon:</span>{" "}
                      {selectedOrder.user?.phone || "-"}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Item Pesanan
                  </h3>
                  <div className="space-y-3">
                    {selectedOrder.items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">
                            {item.product?.name || "Produk"}
                          </p>
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
                </div>

                {/* Order Summary */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-600">Status:</p>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-600">Tanggal Pesanan:</p>
                    <p className="font-medium">
                      {new Date(selectedOrder.created_at).toLocaleString(
                        "id-ID"
                      )}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <p className="text-lg font-semibold text-gray-800">
                      Total Pembayaran:
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(selectedOrder.total_amount)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t bg-gray-50">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition font-medium"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
