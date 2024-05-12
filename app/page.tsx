"use client";
import { LinkCardComponent } from "@/components/CardComponents/LinkCardDemoComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { LinkCardSkeleton } from "@/components/CardComponents/LinkCardSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import createPublicUrl from "@/lib/actions/create_public_url";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Analytics />
      <Script
        id="HotJarAnalytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:4978265,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `,
        }}
      />
      <div className="flex flex-row justify-center mt-14 px-4 pb-4">
        <div className="flex flex-col items-center">
          <Label className="text-4xl md:text-5xl font-bold">
            Short Links with
          </Label>
          <Label className="text-4xl md:text-5xl font-bold text-yellow-500 mt-4">
            With SuperPowers
          </Label>
          <Label className="text-lg mt-5 text-center">
            EatMyUrl is an open source link management website
          </Label>
          <div className="mt-6">
            <Button onClick={() => router.push("/app/login")}>
              Start for free
            </Button>
            <Button variant="outline" className="ml-4">
              Get a demo
            </Button>
          </div>
          <Input
            onKeyDown={async (e) => {
              // This is a temporary solution to create a public url
              // This will be replaced with a proper form
              // This is just for demo purposes
              if (e.key !== "Enter") return;
              let form = new FormData();
              form.append("long_url", (e.target as HTMLInputElement).value);
              const short_url = await createPublicUrl(form);
              console.log(short_url);
              alert(short_url);
            }}
            placeholder="🔗 http://eatmyurl.vshetty.dev"
            className="mt-6"
          />
          <div className="mt-6">
            <LinkCardComponent />
            <LinkCardSkeleton />
            <LinkCardSkeleton />
            <div className="mt-5">
              <Card className="w-fit max-w-[500px] flex items-center">
                <CardContent className="mt-4 flex">
                  <div className="flex flex-col justify-center">
                    <Label className="leading-5 py-0 text-gray-500">
                      Want to claim your links, edit them,or view their{" "}
                      <Label className="underline font-bold">analytics</Label>?{" "}
                      <Label
                        onClick={() => router.push("/app/register")}
                        className="underline font-bold cursor-pointer"
                      >
                        Create a free account on EatMyUrl
                      </Label>{" "}
                      to get started.
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
