"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { LayoutDashboard, Package, FileText, Users, UserCog } from "lucide-react";

export default function SidebarAdmin() {
  const router = useRouter();
  const currentPath = router.pathname;

  // Function to check if menu item is active
  const isActive = (path) => {
    if (path === "/dashboard") {
      return currentPath === "/dashboard";
    }
    return currentPath.startsWith(path);
  };

  // Menu items configuration
  const menuItems = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      href: "/dashboard/product",
      icon: Package,
      label: "Product",
    },
    {
      href: "/dashboard/article",
      icon: FileText,
      label: "Article",
    },
    {
      href: "/dashboard/user",
      icon: Users,
      label: "User",
    },
    {
      href: "/dashboard/admin",
      icon: UserCog,
      label: "Admin",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r flex flex-col p-6">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-green-600 flex items-center gap-2">
          <LayoutDashboard size={26} />
          Admin Panel
        </h2>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${active
                ? "bg-green-600 text-white font-semibold shadow-md"
                : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
