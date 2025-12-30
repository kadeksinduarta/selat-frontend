import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full overflow-hidden">{children}</main>
      <Footer />
    </div>
  );
}
