import "@/styles/globals.css";
import "react-quill-new/dist/quill.snow.css";

import { Toaster } from "react-hot-toast";

import SEO from "@/components/SEO";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SEO />
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </>
  );
}
