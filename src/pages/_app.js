import "@/styles/globals.css";
import "react-quill-new/dist/quill.snow.css";

import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </>
  );
}
