import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Limitless MKT | Marketing Digital Sin Límites",
  description:
    "Transformamos tu presencia digital con estrategias innovadoras y resultados medibles. Sin límites, sin excusas.",
  keywords: ["marketing digital", "diseño web", "SEO", "publicidad digital", "redes sociales", "Guatemala"],
  openGraph: {
    title: "Limitless MKT | Marketing Digital Sin Límites",
    description: "Transformamos tu presencia digital con estrategias innovadoras y resultados medibles. Sin límites, sin excusas.",
    type: "website",
    locale: "es_GT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Limitless MKT | Marketing Digital Sin Límites",
    description: "Transformamos tu presencia digital con estrategias innovadoras y resultados medibles. Sin límites, sin excusas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
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
      </body>
    </html>
  );
}
