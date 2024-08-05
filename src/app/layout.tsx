import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/toast/toaster";
import NextAuthProvider from "@/providers/NextAuth";
import SideNav from "@/components/sidenav/sidenav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI navigate",
  description: "龍谷大学ハッカソン",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <div className="flex">
            <SideNav />

            {children}
          </div>
        </NextAuthProvider>

        <Toaster />
      </body>
    </html>
  );
}
