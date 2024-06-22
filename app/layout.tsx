import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Appbar } from "@/components/NavigationBars/Appbar";
import type { Metadata } from "next";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });
inter.className += " overflow-y-hidden";

export const metadata: Metadata = {
  title: "EatMyUrl",
  description:
    "EatMyUrl is a open-source platform offering advanced analytics and custom short codes. Gain deep insights into link performance while enhancing your brand identity with personalised short URLs.",
  keywords:
    "shortlink,longurl,eatmyurl,link,link management,short codes,analytics,create link,shorten link",
  applicationName: "EatMyUrl",
  publisher: "EatMyUrl",
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
          <Appbar />
          <div className="screen-full">{children}</div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
