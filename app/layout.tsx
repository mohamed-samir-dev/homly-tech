import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const siteUrl = "https://homly.sa/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "هوملي | مفروشات منزلية بأعلى جودة وأفضل سعر",
    template: "%s | هوملي",
  },
  description:
    "وجهتكم الأولى لأفخم المفروشات والأثاث المنزلي. نوفر لكم تصاميم راقية تناسب كل ذوق بأفضل الأسعار مع ضمان الجودة.",
  keywords: [
    "مفروشات منزلية",
    "أثاث",
    "غرفة معيشة",
    "غرفة نوم",
    "هوملي",
    "تسوق إلكتروني",
    "ديكور منزلي",
  ],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: siteUrl,
    siteName: "هوملي",
    title: "هوملي | مفروشات منزلية بأعلى جودة وأفضل سعر",
    description:
      "وجهتكم الأولى لأفخم المفروشات والأثاث المنزلي. تصاميم راقية تناسب كل ذوق.",
    images: [
      {
        url: "https://homly.sa/og-image.png",
        width: 1200,
        height: 630,
        alt: "هوملي",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "هوملي | مفروشات منزلية بأعلى جودة وأفضل سعر",
    description:
      "وجهتكم الأولى لأفخم المفروشات والأثاث المنزلي.",
    images: ["https://homly.sa/og-image.png"],
  },
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "msapplication-TileImage": "/android-chrome-192x192.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#1a237e" />
      </head>
      <body className="bg-surface text-on-surface">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
