import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import ChatWidget from "./components/ChatWidget";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Bidyadhar Sahu | Full-Stack Developer & Blockchain Enthusiast",
  description: "Portfolio of Bidyadhar Sahu — Full-Stack Developer, Blockchain Enthusiast, and Freelancer from Odisha, India. Explore projects, join meditation classes, and more.",
  keywords: ["Bidyadhar Sahu", "portfolio", "developer", "blockchain", "freelancer", "Odisha", "India", "web3", "AR"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${poppins.variable} ${playfair.variable} font-sans transition-colors duration-200`}>
        <ThemeProvider themes={["light", "dark"]} defaultTheme="light" attribute="data-theme">
          <Toaster position="top-right" />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <ChatWidget />
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
