import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { Appbar } from "@/components/NavigationBars/Appbar";
import type { Metadata } from "next";
import { Providers } from "./providers";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });
inter.className += ' overflow-y-hidden'

export const metadata: Metadata = {
  title : "EatMyUrl",
  description : "EatMyUrl is a open-source platform offering advanced analytics and custom short codes. Gain deep insights into link performance while enhancing your brand identity with personalised short URLs."
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="title" content="EatMyUrl" />
        <meta name="description" content="EatMyUrl is a open-source platform offering advanced analytics and custom short codes. Gain deep insights into link performance while enhancing your brand identity with personalised short URLs." />
        <meta name="keywords" content="shortlink,longurl,eatmyurl,link,link management,short codes,analytics,create link,shorten link" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
      </Head>
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
