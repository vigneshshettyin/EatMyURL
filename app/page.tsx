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
import createPublicUrl from "@/lib/actions/createPublicUrl";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { publicLinkType } from "@/interfaces/types";
import parsePublicRecords from "@/lib/actions/parsePublicRecords";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { HTTP_STATUS } from "@/lib/constants";

export default function Home() {
  const router = useRouter();
  const [longurlInput, setLongurlInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [publicLinks, setPublicLinks] = useState<publicLinkType[] | []>([]);

  useEffect(() => {
    setLoading(true);
    const dataString = localStorage.getItem("links") as string;
    parsePublicRecords(dataString).then((s) => {
      setPublicLinks(s);
      setLoading(false);
    });
  }, []);

  function updateLocalStorage(link: publicLinkType) {
    const dataString: any = localStorage.getItem("links");
    let data: string[] = JSON.parse(dataString);
    if (!data) data = [];
    data.push(link.shortUrl);

    localStorage.setItem("links", JSON.stringify(data));
    setPublicLinks([...publicLinks, link]);
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const long_url = (e.target as HTMLInputElement).value;
    if (e.key !== "Enter") return;
    let form = new FormData();
    form.append("long_url", long_url);
    const response = await createPublicUrl(form);

    if (response.status == HTTP_STATUS.BAD_REQUEST) {
      toast.error("URL is not valid");
      setLongurlInput("");
      return;
    } else if (response.status == HTTP_STATUS.INTERNAL_SERVER_ERROR) {
      toast.error("Error while shortening the link");
      return;
    }

    toast.success("Short link generated successfully!!");
    setLongurlInput("");
    updateLocalStorage({
      shortUrl: response.shortUrl as string,
      longUrl: longurlInput,
    });
  };

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
            h._hjSettings={hjid:5007936,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `,
        }}
      />
      <div className="flex flex-row justify-center mt-24 px-4 pb-4">
        <div className="flex flex-col items-center">
          <Label className="text-3xl lg:text-5xl font-bold">Short Links</Label>
          <Label className="text-3xl lg:text-5xl font-bold text-yellow-500 mt-4 text-center">
            With SuperPowers
          </Label>
          <Label className="text-lg mt-5 text-center">
            EatMyURL is an open source link management app!
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
            value={longurlInput}
            onChange={(e) => setLongurlInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="🔗 https://eurl.dev"
            className="mt-6"
          />
          {loading ? (
            <div className="mt-4">
              <LinkCardSkeleton />
              <LinkCardSkeleton />
            </div>
          ) : (
            <div></div>
          )}
          <div className="mt-6">
            {publicLinks.map((link) => (
              <LinkCardComponent key={link.shortUrl} publicLink={link} />
            ))}
            <div className="mt-6   flex justify-center">
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
      <Card className="h-12 rounded-none flex flex-row justify-around items-center fixed bottom-0 w-full">
        <div
          onClick={() => {
            window.open("https://eurl.dev/eurl", "_blank");
          }}
          className="flex cursor-pointer"
        >
          <div className="flex items-center">
            <GitHubLogoIcon />
          </div>
          <p className="text-gray-500 text-sm ml-2">GitHub</p>
        </div>
        <a
          target="_blank"
          className="group flex max-w-fit items-center space-x-2 rounded-md border border-gray-200 bg-white px-3 py-2 transition-colors hover:bg-gray-100"
          href="https://status.eurl.dev"
        >
          <div className="relative h-3 w-3">
            <div className="absolute inset-0 m-auto h-3 w-3 animate-ping items-center justify-center rounded-full group-hover:animate-none bg-green-500"></div>
            <div className="absolute inset-0 z-10 m-auto h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <p className="text-sm font-medium text-gray-800">
            Status:{" "}
            <span className="text-green-500 group-hover:text-gray-800"/>
              Operational
          </p>
        </a>
      </Card>
    </>
  );
}
