import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import React from "react";
import {Toaster} from "sonner";
import {ThemeProvider} from "next-themes";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fortis Libertas — Login",
  description: "Secure login for Fortis Libertas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en" suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        geistSans.variable,
        geistMono.variable,
        lora.variable,
        "font-serif"
      )}
    >
    <body>
      {children}
      <Toaster richColors/>
    </body>
    </html>
  );
}
