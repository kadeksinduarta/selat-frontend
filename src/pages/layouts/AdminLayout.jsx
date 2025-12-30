import SidebarAdmin from "../../components/sidebarAdmin";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarAdmin />

      {/* Konten Halaman */}
      <main className="ml-64 w-full p-8 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}
