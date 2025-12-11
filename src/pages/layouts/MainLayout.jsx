import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function MainLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-white text-slate-800 antialiased">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
