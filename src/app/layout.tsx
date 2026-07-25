import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono, Patrick_Hand } from "next/font/google";
import "./globals.css";

const garamond = Cormorant_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-handwritten",
  subsets: ["latin"],
  weight: ["400"],
});

import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Siva Prasad Korakuti | The Zen Architect's Garden",
  description: "A digital Zen garden portfolio of Siva Prasad Korakuti, CSE student, GATE qualifier, and Cloud Architect.",
  keywords: ["Siva Prasad", "Zen Portfolio", "Systems Architect", "MITS", "GATE 2026"],
  authors: [{ name: "Siva Prasad Korakuti" }],
  icons: {
    icon: [
      { url: "/profile.png", type: "image/png" },
      { url: "/profile.jpg", type: "image/jpeg" },
    ],
    shortcut: "/profile.png",
    apple: "/profile.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${garamond.variable} ${inter.variable} ${jetbrainsMono.variable} ${patrickHand.variable} h-full antialiased`}
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-[#E8A87C]/30 selection:text-black">
        {children}
      </body>
    </html>
  );
}
