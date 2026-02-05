import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.limitlessmarketing502.com"),
  title: {
    default: "Limitless Marketing | Agencia de Marketing Digital en Guatemala",
    template: "%s | Limitless Marketing",
  },
  description:
    "Agencia de marketing digital en Guatemala. Creación de contenido, manejo de redes sociales, pauta publicitaria en Meta Ads, Google Ads, LinkedIn Ads y contenido audiovisual. Certificados por Google, Meta, LinkedIn y HubSpot.",
  keywords: [
    "marketing digital Guatemala",
    "agencia de marketing Guatemala",
    "manejo de redes sociales",
    "community manager Guatemala",
    "publicidad en Facebook",
    "publicidad en Instagram",
    "Google Ads Guatemala",
    "Meta Ads",
    "LinkedIn Ads",
    "creación de contenido",
    "contenido audiovisual",
    "SEO Guatemala",
    "pauta publicitaria",
    "social media marketing",
  ],
  authors: [{ name: "Limitless Marketing" }],
  creator: "Limitless Marketing",
  publisher: "Limitless Marketing",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Limitless Marketing | Agencia de Marketing Digital en Guatemala",
    description:
      "Transformamos tu presencia digital con estrategias innovadoras. Creación de contenido, redes sociales, pauta publicitaria y más. Certificados por Google, Meta, LinkedIn y HubSpot.",
    type: "website",
    locale: "es_GT",
    url: "https://www.limitlessmarketing502.com",
    siteName: "Limitless Marketing",
    images: [
      {
        url: "/images/logos/limitless-logo.png",
        width: 1200,
        height: 630,
        alt: "Limitless Marketing - Agencia de Marketing Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Limitless Marketing | Agencia de Marketing Digital en Guatemala",
    description:
      "Transformamos tu presencia digital con estrategias innovadoras. Certificados por Google, Meta, LinkedIn y HubSpot.",
    images: ["/images/logos/limitless-logo.png"],
  },
  alternates: {
    canonical: "https://www.limitlessmarketing502.com",
  },
  category: "Marketing Digital",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MarketingAgency",
  name: "Limitless Marketing",
  alternateName: "Limitless MKT",
  description:
    "Agencia de marketing digital en Guatemala especializada en creación de contenido, manejo de redes sociales, pauta publicitaria y contenido audiovisual.",
  url: "https://www.limitlessmarketing502.com",
  logo: "https://www.limitlessmarketing502.com/images/logos/limitless-logo.png",
  image: "https://www.limitlessmarketing502.com/images/logos/limitless-logo.png",
  address: {
    "@type": "PostalAddress",
    addressCountry: "GT",
    addressLocality: "Guatemala",
  },
  areaServed: {
    "@type": "Country",
    name: "Guatemala",
  },
  serviceType: [
    "Marketing Digital",
    "Manejo de Redes Sociales",
    "Creación de Contenido",
    "Pauta Publicitaria",
    "Google Ads",
    "Meta Ads",
    "LinkedIn Ads",
    "Contenido Audiovisual",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "Google Ads Certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "Meta Blueprint Certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "LinkedIn Ads Certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "HubSpot Academy Certification",
    },
  ],
  sameAs: [
    "https://www.facebook.com/limitlessmkt",
    "https://www.instagram.com/limitlessmkt",
    "https://www.linkedin.com/company/limitlessmkt",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased cursor-none`}
      >
        <LoadingScreen />
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          {children}
        </SmoothScroll>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
