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
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { publicLinkType } from "@/interfaces/types";
import parsePublicRecords from "@/lib/actions/parsePublicRecords";

export default function Home() {
  const router = useRouter();
  const [longurlInput,setLongurlInput] = useState("");
  const [loading,setLoading] = useState(true)
  const [publicLinks,setPublicLinks] = useState<publicLinkType[] | []>([])

  useEffect(()=>{
        setLoading(true)
        const dataString:any = localStorage.getItem('links')
        parsePublicRecords(dataString).then((s)=>{
            setPublicLinks(s);
            setLoading(false)
        })
  },[])

  function updateLocalStorage(link:publicLinkType){
      const dataString:any = localStorage.getItem('links')
      let data:string[] = JSON.parse(dataString)
      // creating link for the first time the link item will be null so avoiding that error
      if(!data) data = []
      data.push(link.shortUrl)
      
      localStorage.setItem('links',JSON.stringify(data))
      setPublicLinks([...publicLinks,link])
  }

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
          <Input value={longurlInput} onChange={(e)=>setLongurlInput(e.target.value)}
            onKeyDown={async (e) => {
              // This is a temporary solution to create a public url
              // This will be replaced with a proper form
              // This is just for demo purposes
              const long_url = (e.target as HTMLInputElement).value
              if (e.key !== "Enter") return;
              let form = new FormData();
              form.append("long_url", long_url);
              const response = await createPublicUrl(form);
              
              toast({
                title:"Short link generated successfully!!",
                description:"The link is valid only for 2hrs !!"
              })
              setLongurlInput("");
              // updating the link card component after shortenin new link
              updateLocalStorage({shortUrl:response.shortUrl,longUrl:longurlInput})
            }}
            placeholder="🔗 http://eatmyurl.vshetty.dev"
            className="mt-6"
          />
          <div className="mt-6">
            {publicLinks.map((link)=><LinkCardComponent key={link.shortUrl} publicLink={link} />)}
            {loading?<div><LinkCardSkeleton /><LinkCardSkeleton /></div>:<div></div>}
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
