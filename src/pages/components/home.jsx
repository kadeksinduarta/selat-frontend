"use client";

import Navbar from "./navbar";
import Footer from "./footer";
import Hero from "./hero";
import About from "./about";
import ProductList from "./productList";
import ArticleList from "./articleList";
import Contact from "./contact";

export default function HomePage({ products }) {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <ProductList products={products} />
      <ArticleList />
      <Contact />
      <Footer />
    </>
  );
}
