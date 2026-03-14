import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

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
    <html lang="en" className="scroll-smooth">
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
