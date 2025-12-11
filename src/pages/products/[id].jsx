import { useRouter } from "next/router";
import MainLayout from "../layouts/MainLayout";

export default function ProductDetail() {
  const { id } = useRouter().query;

  return (
    // <MainLayout>
    <h1>Produk ID: {id}</h1>
  );
}
