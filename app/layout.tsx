import type { Metadata } from "next";
import { Archivo_Black, Space_Mono, Syne } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const headingFont = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
});

const bodyFont = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const accentFont = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "Vítor | Creative Developer & Digital Artist",
  description:
    "Portfolio of Vítor - A creative developer crafting immersive digital experiences at the intersection of design and technology.",
  authors: [{ name: "Vítor" }],
  keywords: [
    "creative developer",
    "web developer",
    "frontend",
    "react",
    "next.js",
    "portfolio",
  ],
  openGraph: {
    title: "Vítor | Creative Developer",
    description:
      "Crafting immersive digital experiences at the intersection of design and technology.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Vítor | Creative Developer",
    description:
      "Crafting immersive digital experiences at the intersection of design and technology.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-theme="dark">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} ${accentFont.variable} overflow-x-hidden antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
