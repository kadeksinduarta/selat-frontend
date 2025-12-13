import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { User, MapPin, ShoppingBag, LogOut, Menu, X } from "lucide-react";

export default function UserLayout({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (!token || !userData) {
            router.push("/auth/login");
            return;
        }

        setUser(JSON.parse(userData));
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/");
    };

    const menuItems = [
        { href: "/profile", icon: User, label: "Profile Saya" },
        { href: "/profile/addresses", icon: MapPin, label: "Alamat Saya" },
        { href: "/profile/orders", icon: ShoppingBag, label: "Pesanan Saya" },
    ];

    const isActive = (path) => router.pathname === path;

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-green-600">Selat</h1>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <aside
                    className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}
                >
                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-green-600 hidden lg:block">
                            Selat
                        </h1>
                        <div className="mt-6 pb-6 border-b">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                            </div>
                        </div>

                        <nav className="mt-6 space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(item.href)
                                            ? "bg-green-50 text-green-600 font-semibold"
                                            : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <item.icon size={20} />
                                    <span>{item.label}</span>
                                </Link>
                            ))}

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
                            >
                                <LogOut size={20} />
                                <span>Logout</span>
                            </button>
                        </nav>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {isSidebarOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
