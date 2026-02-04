import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | BBr',
    default: 'BBr - BuscaBares',
  },
  description: "Plataforma de Descubrimiento Social de Bares en CyL",
  manifest: "/manifest.json",
  icons: {
    icon: '/favicon.ico?v=2',
    apple: '/favicon.ico?v=2',
  },
  // SEO: og:type, og:title configured via Metadata
  openGraph: {
    title: 'BBr - BuscaBares',
    description: 'Encuentra tu sitio. Plataforma de descubrimiento social de bares en Castilla y León.',
    url: 'https://buscabares.com',
    siteName: 'BBr',
    images: [
      {
        url: '/og-image.jpg', // We should probably create this or use a placeholder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BBr - BuscaBares',
    description: 'Encuentra tu sitio. Plataforma de descubrimiento social de bares en Castilla y León.',
    creator: '@buscabares',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
