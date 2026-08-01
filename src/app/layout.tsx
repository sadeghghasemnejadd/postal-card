import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "دعوت‌نامه عقد فاطمه و صادق",
  description: "دعوت‌نامه مراسم عقد فاطمه و صادق",
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
