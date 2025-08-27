import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Almondtuazon - Portfolio",
  description: "My Portfolio all sample project and documentation ✨",
  authors: [{ name: "Almond Rae Tuazon" }],
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
        <main className=" dark:text-white min-h-screen font-sans grainy">
          <div className="max-w-6xl mx-auto px-4">
            {children}
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
