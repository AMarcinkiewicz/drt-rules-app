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
  title: "DRT Rules Builder - Dynamic Business Rules Engine",
  description: "A powerful, intuitive interface for building and managing dynamic business rules. Create complex conditional logic with drag-and-drop rule builder, data-driven configuration, and smart input types.",
  keywords: ["rules builder", "business rules", "conditional logic", "drag and drop", "dynamic forms", "DRT", "rule engine"],
  authors: [{ name: "Alex Marcinkiewicz" }],
  creator: "Alex Marcinkiewicz",
  publisher: "DRT Rules App",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/AMarcinkiewicz/drt-rules-app",
    title: "DRT Rules Builder - Dynamic Business Rules Engine",
    description: "Build and manage dynamic business rules with our intuitive drag-and-drop interface. Support for 25+ condition types, smart input validation, and real-time rule reordering.",
    siteName: "DRT Rules Builder",
  },
  twitter: {
    card: "summary_large_image",
    title: "DRT Rules Builder - Dynamic Business Rules Engine",
    description: "Build and manage dynamic business rules with our intuitive drag-and-drop interface.",
    creator: "@AMarcinkiewicz",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
