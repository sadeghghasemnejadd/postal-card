import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "دعوت‌نامه عقد فاطمه و صادق",
  description: "دعوت‌نامه مراسم عقد فاطمه و صادق",
};

export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#f9f0e0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="fa">
      <body>{children}</body>
    </html>
  );
}
