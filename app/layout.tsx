import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AFRIDataNG - Virtual Top-up, Airtime & Bills Payment Platform",
  description: "Buy airtime, data bundles, pay bills, and send money instantly with AFRIDataNG. The fastest and most reliable telecom service provider in Africa.",
  keywords: "airtime, data bundles, bills payment, top-up, VTU, telecom, Africa, Nigeria, MTN, Airtel, Glo, 9mobile",
  authors: [{ name: "AFRIDataNG" }],
  creator: "AFRIDataNG",
  publisher: "AFRIDataNG",
  robots: "index, follow",
  alternates: {
    canonical: "https://afridatawebv3.com",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        url: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    apple: {
      url: "/icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    shortcut: "/icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://afridatawebv3.com",
    title: "AFRIDataNG - Virtual Top-up, Airtime & Bills Payment Platform",
    description: "Buy airtime, data bundles, pay bills, and send money instantly with AFRIDataNG. The fastest and most reliable telecom service provider in Africa.",
    siteName: "AFRIDataNG",
    images: [
      {
        url: "/afribanner1.png",
        width: 1200,
        height: 630,
        alt: "AFRIDataNG - Virtual Top-up and Bills Payment Services",
        type: "image/png",
      },
      {
        url: "/afribanner1.png",
        width: 800,
        height: 420,
        alt: "AFRIDataNG - Top-up Services",
        type: "image/png",
      },
    ],
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "AFRIDataNG - Virtual Top-up, Airtime & Bills Payment Platform",
    description: "Buy airtime, data bundles, and pay bills instantly on AFRIDataNG",
    images: ["/afribanner1.png"],
    creator: "@AFRIDataNG",
    site: "@AFRIDataNG",
  },
  metadataBase: new URL("https://afridatawebv3.com"),
  category: "Technology",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AFRIDataNG",
    url: "https://afridatawebv3.com",
    logo: "https://afridatawebv3.com/icon.png",
    description: "Buy airtime, data bundles, pay bills, and send money instantly with AFRIDataNG. The fastest and most reliable telecom service provider in Africa.",
    sameAs: [
      "https://www.facebook.com/AFRIDataNG",
      "https://www.twitter.com/AFRIDataNG",
      "https://www.instagram.com/AFRIDataNG",
      "https://www.linkedin.com/company/AFRIDataNG",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "support@afridatawebv3.com",
      availableLanguage: ["en"],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AFRIDataNG",
    url: "https://afridatawebv3.com",
    description: "Virtual Top-up, Airtime & Bills Payment Platform",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://afridatawebv3.com/search?q={search_term_string}",
      },
      query_input: "required name=search_term_string",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "AFRIDataNG",
    image: "https://afridatawebv3.com/afribanner1.png",
    description: "Top-up services for airtime, data bundles, bills payment and money transfer",
    url: "https://afridatawebv3.com",
    telephone: "+234-XXX-XXXX",
    priceRange: "₦",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Africa",
      addressCountry: "NG",
    },
    areaServed: {
      "@type": "Country",
      name: "Nigeria",
    },
    sameAs: [
      "https://www.facebook.com/AFRIDataNG",
      "https://www.twitter.com/AFRIDataNG",
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* JSON-LD Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          strategy="afterInteractive"
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          strategy="afterInteractive"
        />
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
          strategy="afterInteractive"
        />

        {/* Additional Meta Tags */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="theme-color" content="#003366" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AFRIDataNG" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#003366" />
        <meta name="msapplication-TileImage" content="/icon.png" />

        {/* Preconnect to External Sources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://analytics.google.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
