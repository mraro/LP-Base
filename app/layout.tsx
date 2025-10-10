import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site.config";
import AnalyticsWrapper from "@/components/tracking/analytics-wrapper";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ["landing page", "negócios", "soluções", "marketing"],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={inter.className}>
        <AnalyticsWrapper />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
