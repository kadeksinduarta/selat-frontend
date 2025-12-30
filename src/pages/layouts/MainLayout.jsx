import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
