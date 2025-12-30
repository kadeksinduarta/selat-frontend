import Head from "next/head";
import { useRouter } from "next/router";

const SEO = ({
    title,
    description,
    image,
    article,
    url,
    type = "website",
}) => {
    const router = useRouter();
    const siteName = "Desa Selat";
    const defaultDescription = "Situs Resmi Desa Selat - Informasi, Layanan Publik, dan Potensi Desa Selat, Klungkung, Bali.";
    const defaultImage = "/logo-desa.png";
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://desaselat.id"; // Fallback URL

    const seoTitle = title ? `${title} | ${siteName}` : siteName;
    const seoDescription = description || defaultDescription;
    const seoImage = image ? (image.startsWith("http") ? image : `${baseUrl}${image}`) : `${baseUrl}${defaultImage}`;
    const seoUrl = url ? `${baseUrl}${url}` : `${baseUrl}${router.asPath}`;

    return (
        <Head>
            {/* Standard Meta Tags */}
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:image" content={seoImage} />
            <meta property="og:url" content={seoUrl} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seoTitle} />
            <meta name="twitter:description" content={seoDescription} />
            <meta name="twitter:image" content={seoImage} />

            {/* Canonical URL */}
            <link rel="canonical" href={seoUrl} />

            {/* Favicon - Ensure these exist in public folder */}
            <link rel="icon" href="/logo-desa.png" />
            {/* Optional: Add more specific social meta tags if needed */}
            {article && <meta property="article:section" content="News" />}
            {article && <meta property="article:published_time" content={article.published_at} />}
        </Head>
    );
};

export default SEO;
