import Home from "../components/home";
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
      <>
        <Home products={products} />
      </>
    </div>
  );
}
