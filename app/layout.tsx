import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const supply = localFont({
  src: [
    {
      path: "./fonts/supply/Supply-UltraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/supply/Supply-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/supply/Supply-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/supply/Supply-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/supply/Supply-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-supply",
  display: "swap",
});

const tahoma = localFont({
  src: "./fonts/tahoma/fs-tahoma-8px.woff2",
  variable: "--font-tahoma",
  display: "swap",
});

const ocrMono = localFont({
  src: "./fonts/vcr/mono.woff2",
  variable: "--font-ocr-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "xtreme",
  description: "xtreme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${supply.variable} ${tahoma.variable} ${ocrMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
