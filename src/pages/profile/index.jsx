import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MainLayout from "../layouts/MainLayout";
import Link from "next/link";
import { User, MapPin, ShoppingBag, ArrowRight } from "lucide-react";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            const userData = localStorage.getItem("user");

            if (!token || !userData) {
                router.push("/auth/login");
                return;
            }

            setUser(JSON.parse(userData));
        } catch (error) {
            console.error("Error loading user data:", error);
        } finally {
            setLoading(false);
        }
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
            <div className="min-h-screen bg-gray-50 pt-20 pb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Profile Saya</h1>
                        <p className="text-gray-600 mt-2">
                            Kelola informasi profil Anda
                        </p>
                    </div>

                    {/* Profile Info Card */}
                    <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
                        <div className="flex items-start gap-6">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-12 h-12 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {user?.name}
                                </h2>
                                <p className="text-gray-600 mt-2">{user?.email}</p>
                                {user?.phone && (
                                    <p className="text-gray-600 mt-1">{user.phone}</p>
                                )}
                                <div className="mt-4">
                                    <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                        User Account
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Menu Profile
                        </h3>
                        <div className="space-y-3">
                            <Link
                                href="/profile/edit"
                                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition group"
                            >
                                <div className="flex items-center gap-3">
                                    <User className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
                                    <div>
                                        <p className="font-medium text-gray-800">Edit Profile</p>
                                        <p className="text-sm text-gray-500">Update informasi pribadi</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
                            </Link>

                            <Link
                                href="/profile/addresses"
                                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition group"
                            >
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
                                    <div>
                                        <p className="font-medium text-gray-800">Alamat Saya</p>
                                        <p className="text-sm text-gray-500">Kelola alamat pengiriman</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
                            </Link>

                            <Link
                                href="/profile/orders"
                                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition group"
                            >
                                <div className="flex items-center gap-3">
                                    <ShoppingBag className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
                                    <div>
                                        <p className="font-medium text-gray-800">Pesanan Saya</p>
                                        <p className="text-sm text-gray-500">Lihat riwayat pesanan</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
