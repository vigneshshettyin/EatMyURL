import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { Appbar } from "@/components/NavigationBars/Appbar";
import type { Metadata } from "next";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title : "EatMyUrl",
  description : "Generated by create react app"
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
            <Providers>
            <Appbar/>
            <div className="screen-full">
              {children}
              </div>
            <Toaster />
            </Providers>
        </body>
    </html>
  );
}