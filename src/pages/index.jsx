import Home from "../components/home";
import SEO from "../components/SEO";
import { apiGet } from "../utils/api";

export async function getServerSideProps() {
  try {
    const products = await apiGet("products");
    return { props: { products: products || [] } };
  } catch (error) {
    console.error("Error fetching products in getServerSideProps:", error);
    return { props: { products: [] } };
  }
}

export default function HomePage({ products }) {
  return (
    <div>
      <SEO
        title="Beranda"
        description="Selamat Datang di Situs Resmi Desa Selat. Temukan informasi terbaru, potensi desa, dan layanan publik kami."
      />
      <Home products={products} />
    </div>
  );
}
