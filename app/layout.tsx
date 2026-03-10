import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import "./globals.css";

const arimo = Arimo({
  variable: "--font-arimo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "INNAI & CO | Raya RTW 2026 — Everglow",
  description:
    "Modest fashion reimagined. Shop Everglow Raya RTW 2026, Pentas Raya Luxe, and more at INNAI & CO.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${arimo.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
