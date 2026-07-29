import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ReactQueryProvider } from "@/lib/react-query/provider";
import { ReduxProvider } from "@/lib/redux/provider";
import { ThemeProvider } from "@/lib/shadcn/theme-provider";
import { ToastifyProvider } from "@/lib/toastify/provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "کارت دعوت",
  description: "کارت دعوت مراسم عقد",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
          enableSystem={false}
        >
          <ReduxProvider>
            <ReactQueryProvider>
              <ToastifyProvider>{children}</ToastifyProvider>
            </ReactQueryProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
