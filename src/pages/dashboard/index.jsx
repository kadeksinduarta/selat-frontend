"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../layouts/AdminLayout";
import { apiGet, adminGet } from "../../utils/api";
import { Package, FileText, Users, UserCog } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    productCount: 0,
    articleCount: 0,
    userCount: 0,
    adminCount: 0,
    orderCount: 0,
  });

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      // Check if user is logged in
      if (!token || !userData) {
        router.push("/auth/admin-login");
        return;
      }

      const user = JSON.parse(userData);

      // Check if user is admin
      if (user.role !== "admin") {
        router.push("/auth/admin-login");
        return;
      }

      // Load dashboard data
      const products = await apiGet("products");
      const articles = await apiGet("articles");
      const usersResponse = await adminGet("users", token);
      const adminsResponse = await adminGet("admins", token);
      const ordersResponse = await adminGet("transactions", token);

      setStats({
        productCount: products.length || 0,
        articleCount: articles.data?.length || 0,
        userCount: usersResponse.data?.length || 0,
        adminCount: adminsResponse.data?.length || 0,
        orderCount: ordersResponse.data?.length || 0,
      });
    } catch (error) {
      console.error("Error loading dashboard:", error);
      router.push("/auth/admin-login");
    } finally {
      setLoading(false);
    }
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

  const statsData = [
    {
      title: "Total Produk",
      count: stats.productCount,
      icon: Package,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
      link: "/dashboard/product",
    },
    {
      title: "Total Artikel",
      count: stats.articleCount,
      icon: FileText,
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-600",
      link: "/dashboard/article",
    },
    {
      title: "Total Pesanan",
      count: stats.orderCount || 0,
      icon: Package,
      color: "bg-teal-500",
      lightColor: "bg-teal-50",
      textColor: "text-teal-600",
      link: "/dashboard/orders",
    },
    {
      title: "Total User",
      count: stats.userCount,
      icon: Users,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600",
      link: "/dashboard/user",
    },
    {
      title: "Total Admin",
      count: stats.adminCount,
      icon: UserCog,
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-600",
      link: "/dashboard/admin",
    },
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">Ringkasan data sistem</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <a
                key={index}
                href={stat.link}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  {/* Icon */}
                  <div
                    className={`${stat.lightColor} w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`${stat.textColor} w-7 h-7`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-gray-600 text-sm font-medium mb-2">
                    {stat.title}
                  </h3>

                  {/* Count */}
                  <p className="text-3xl font-bold text-gray-800">
                    {stat.count}
                  </p>

                  {/* Bottom accent bar */}
                  <div
                    className={`${stat.color} h-1 w-0 group-hover:w-full transition-all duration-300 mt-4 rounded-full`}
                  ></div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Welcome Section */}
        <div className="mt-8 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">
            Selamat Datang di Admin Panel! 👋
          </h2>
          <p className="text-green-50">
            Kelola produk, artikel, dan pengguna dengan mudah melalui dashboard
            ini.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/dashboard/product/add"
              className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 transition-all duration-300 border-l-4 border-blue-500 group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition">
                  <Package className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Tambah Produk Baru
                  </h3>
                  <p className="text-sm text-gray-600">
                    Tambahkan produk ke katalog
                  </p>
                </div>
              </div>
            </a>

            <a
              href="/dashboard/article/add"
              className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 transition-all duration-300 border-l-4 border-green-500 group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-green-50 p-3 rounded-lg group-hover:bg-green-100 transition">
                  <FileText className="text-green-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Tulis Artikel Baru
                  </h3>
                  <p className="text-sm text-gray-600">
                    Buat artikel atau berita
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
