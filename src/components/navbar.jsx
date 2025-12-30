// src/components/Navbar.jsx
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { User, LogOut, ShoppingBag, MapPin } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  const navItems = [
    { name: "Beranda", path: "/" },
    { name: "Artikel", path: "/articles" },
    { name: "Produk", path: "/products" },
  ];

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setShowUserMenu(false);
    router.push("/");
  };

  return (
    <header className="w-full fixed top-0 z-50 bg-white/100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center shadow-lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <path
                d="M3 12l4-4 4 4 6-6 4 4"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div className="text-lg font-semibold">Desa Selat</div>
            <div className="text-xs text-slate-500 -mt-1">
              Potensi • Berita • Produk Lokal
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          {navItems.map((item) => {
            const active =
              pathname === item.path ||
              (item.path !== "/" && pathname?.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-full text-sm transition ${active
                  ? "bg-white shadow text-slate-900 font-medium"
                  : "text-white-700 hover:bg-white/60"
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow hover:shadow-md transition"
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">
                  {user.name}
                </span>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-800">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition"
                  >
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Profile Saya</span>
                  </Link>

                  <Link
                    href="/profile/orders"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition"
                  >
                    <ShoppingBag className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Pesanan Saya</span>
                  </Link>

                  <Link
                    href="/profile/addresses"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition"
                  >
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Alamat Saya</span>
                  </Link>

                  <div className="border-t border-gray-200 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition w-full text-left"
                    >
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-600">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition text-sm font-medium"
            >
              Login
            </Link>
          )}
        </div>

        {/* mobile toggle */}
        <button
          className="md:hidden p-2"
          aria-label="menu"
          onClick={() => setOpen((s) => !s)}
        >
          <div className="text-2xl">{open ? "✖" : "☰"}</div>
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-6">
          <div className="flex flex-col gap-3 bg-white/80 backdrop-blur rounded-lg p-4 shadow">
            {navItems.map((item) => {
              const active =
                pathname === item.path ||
                (item.path !== "/" && pathname?.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 rounded-md ${active ? "bg-blue-50 font-medium" : "hover:bg-slate-100"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}

            {user ? (
              <>
                <div className="border-t border-gray-200 pt-3 mt-2">
                  <p className="px-3 text-sm font-semibold text-gray-800">
                    {user.name}
                  </p>
                </div>
                <Link
                  href="/profile"
                  className="px-3 py-2 rounded-md hover:bg-slate-100"
                >
                  Profile Saya
                </Link>
                <Link
                  href="/profile/orders"
                  className="px-3 py-2 rounded-md hover:bg-slate-100"
                >
                  Pesanan Saya
                </Link>
                <Link
                  href="/profile/addresses"
                  className="px-3 py-2 rounded-md hover:bg-slate-100"
                >
                  Alamat Saya
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md hover:bg-red-50 text-red-600 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="px-3 py-2 rounded-md bg-green-600 text-white text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
