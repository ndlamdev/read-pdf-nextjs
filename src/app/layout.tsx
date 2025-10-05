import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/assets/css/globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});


export const metadata: Metadata = {
  title: "PDF Reader - Đọc File PDF",
  description: "Ứng dụng đọc file PDF trực tuyến với giao diện hiện đại"
};

export default function RootLayout(
  {
    children
  }: Readonly<{
    children: ReactNode;
  }>) {
  return (
    <html lang="vi" suppressHydrationWarning>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
