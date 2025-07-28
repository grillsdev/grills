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
  title: "Grills",
  description: "Your frontend dev - Build functional shadcn components with your favorite LLM. Generate production ready shadcn/ui components instantly and maintain consistent design & layout across your projects.",
  keywords: ["frontend", "dev", "shadcn", "components", "LLM", "AI", "shadcn/ui", "production ready", "design", "layout", "UI components", "UI component generator", "web development", "react"],
  authors: [{ name: "Aditya Pushkar" }],
  creator: "Grills",
  publisher: "Grills",
  
  // Basic meta tags
  metadataBase: new URL('https://grills.dev'),
  
  // Icons
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  
  // Open Graph (Facebook, LinkedIn, Reddit, Discord, WhatsApp, etc.)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://grills.dev',
    title: 'Grills - Your Frontend Dev',
    description: 'Your frontend dev - Build functional shadcn components with your favorite LLM. Generate production ready shadcn/ui components instantly and maintain consistent design & layout across your projects.',
    siteName: 'Grills',
    images: [
      {
        url: '/site-image.png',
        width: 1200,
        height: 630,
        alt: 'Grills - Your Frontend Dev',
        type: 'image/png',
      },
    ],
  },
  
  // Twitter/X Card
  twitter: {
    card: 'summary_large_image',
    title: 'Grills - Your Frontend Dev',
    description: 'Your frontend dev - Build functional shadcn components with your favorite LLM. Generate production ready shadcn/ui components instantly and maintain consistent design & layout across your projects.',
    images: ['/site-image.png'],
  },
  
  // Additional tags
  category: 'technology',
  classification: 'Business',
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
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}