// src/components/Navbar.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Beranda", path: "/" },
    { name: "Artikel", path: "/articles" },
    { name: "Produk", path: "/products" },
    { name: "Gallery", path: "/gallery" },
  ];

  return (
    <header className="w-full fixed top-0 z-50 backdrop-blur-sm border-b border-1 border-slate-200">
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
                className={`px-4 py-2 rounded-full text-sm transition ${
                  active
                    ? "bg-white shadow text-slate-900 font-medium"
                    : "text-white-700 hover:bg-white/60"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* actions */}
        <div className="hidden md:flex items-center gap-3">user</div>

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
                  className={`px-3 py-2 rounded-md ${
                    active ? "bg-blue-50 font-medium" : "hover:bg-slate-100"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
