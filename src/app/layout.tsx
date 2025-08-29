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


const siteConfig = {
  name: "Grills",
  title: "Open Source alternative for Lovable, Bolt & V0.",
  description:
    "Open Source alternative for Lovable Bolt & V0. Just generate, copy and paste into your production codebase — no overhead, works with your favorite LLM (BYOK).",
  url: "https://grills.dev",
  author: "Aditya Pushkar",
  image: "/site-image.png",
};

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "frontend",
    "dev",
    "shadcn",
    "components",
    "LLM",
    "AI",
    "shadcn/ui ai",
    "production ready",
    "design",
    "layout",
    "UI components ai",
    "UI component generator",
    "web development ai",
    "react ai",
  ],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  metadataBase: new URL(siteConfig.url),

  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.title} Your Frontend Dev`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Your Frontend Dev`,
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.title} Your Frontend Dev`,
    description: siteConfig.description,
    images: [siteConfig.image],
  },

  category: "technology",
  classification: "Business",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
