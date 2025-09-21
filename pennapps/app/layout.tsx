import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import FooterController from "@/components/footer-controller";
import AnimatedOnLoad from "@/components/animated-onload";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "PlanIt - AI-powered assignment management",
  description: "AI-powered assignment management that keeps you on schedule.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <Navbar />
        <AnimatedOnLoad variant="fade-in" durationMs={500}>
          {children}
        </AnimatedOnLoad>
        <FooterController />
      </body>
    </html>
  );
}
