"use server";

import Home from "../components/home";
import { apiGet } from "../utils/api";

export async function getServerSideProps() {
  const products = await apiGet("products");
  return { props: { products } };
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
