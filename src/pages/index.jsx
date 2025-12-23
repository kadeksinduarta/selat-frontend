"use server";

import Home from "../components/home";
import { apiClient } from "../utils/api";

export async function getServerSideProps() {
  const products = await apiClient.get("products");
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
