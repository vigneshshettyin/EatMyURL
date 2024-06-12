"use client";

import { Button } from "@/components/ui/button";
import {
  BarChart,
  LineChart,
  LinkIcon,
  Link2,
  QrCode,
  ScanLineIcon,
  Sparkles,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTutorialStatus } from "@/lib/actions/getStatusAction";
import { HTTP_STATUS } from "@/lib/constants";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import { toast } from "@/components/ui/use-toast";

export default function HomePage() {

  const [linkId,setlinkId] = useState(-1)
  const [loading,setLoading] = useState(false)
  const router = useRouter()

  function encodeId(inputId:number) {
    const inputStr = inputId.toString();
    const encodedStr = Buffer.from(inputStr).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    return encodedStr;
  }

  useEffect(()=>{
      setLoading(true)
      getTutorialStatus().then((res)=>{
        setlinkId(res.linkId)
        setLoading(false)
      })
  },[])
  
  if(loading) return <Loading/>

  return (
    <div className="pt-8 pl-2 md:pl-4 w-full pr-4">
      <div>
        <div className="flex flex-col md:flex-row justify-between">
          <h1 className="text-2xl text-center md:text-left md:text-3xl font-bold ml-6">
            Your connections platform
          </h1>
          <div className="flex justify-center mt-2 md:mt-0">
            <div className="flex drop-shadow-2  xl border-[0.5px] p-2 rounded-xl">
              <Sparkles />
              <h1 className="text-sm ml-3 mr-4">Get custom links</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row  w-full h-fit md:h-36 rounded-xl mt-6 p-3">
          <div className="ml-2 flex-1 drop-shadow-xl border-[1px] p-2 rounded-xl">
            <div className="flex h-full">
              <div className="flex-1 flex justify-center items-center">
                <Link2 size="50px" />
              </div>
              <div className="flex-1 flex justify-center items-center flex-col py-2 md:py-0">
                <h1 className="font-bold text-sm text-center">Make it short</h1>
                <Link href="/app/links">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm mt-2 text-wrap"
                  >
                    Go to Links
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="ml-2 flex-1 drop-shadow-xl border-[1px] p-2 rounded-xl mt-2 md:mt-0">
            <div className="flex h-full">
              <div className="flex-1 flex justify-center items-center">
                <ScanLineIcon size="50px" />
              </div>
              <div className="flex-1 flex justify-center items-center flex-col py-2 md:py-0">
                <h1 className="font-bold text-sm text-center">
                  Create QR Codes
                </h1>
                <Link href="/app/qrcodes">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm mt-2 text-wrap"
                  >
                    Go to QR
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1 drop-shadow-xl border-[1px] p-2 rounded-xl ml-2 mt-2 md:mt-0">
            <div className="flex h-full">
              <div className="flex-1 flex justify-center items-center">
                <LineChart size="50px" />
              </div>
              <div className="flex-1 flex justify-center items-center flex-col py-2 md:py-0">
                <h1 className="font-bold text-sm">View Analytics</h1>
                <Button onClick={()=>{
                  if(linkId != -1){
                    router.push(`/app/links/${encodeId(linkId)}`)
                  }
                  else{
                    toast({
                      title:"Create a link",
                      description:"Create atleast one link to continue"
                    })
                    router.push('/app/links/create')
                  }
                }} variant="outline" size="sm" className="text-sm mt-2">
                  Go to Analysis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex ml-6 mr-3 mt-6 flex-col md:flex-row">
        <div className="flex flex-col flex-1 shadow-md pt-4 pb-6 px-6 border-2 rounded-xl">
          <div className="flex justify-between">
            <h1 className="font-bold text-lg md:text-xl">
              Getting Started with EatMyUrl
            </h1>
            <div className="flex">
              
            </div>
          </div>

          <Accordion className="mt-3" type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="flex items-center">
              <div className="w-4 h-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#3c7cec" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
              </div>
               <h1 className="ml-2 ">Make a short link</h1>
              </AccordionTrigger>
              <AccordionContent className="flex px-6 md:flex-row flex-col">
                <Link href="/app/links/create">
                  <Button size="sm" className="py-3 w-fit" variant="default">
                    <LinkIcon />
                    <h1 className="ml-1">Create a link</h1>
                  </Button>
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="flex items-center">
              <div className="w-4 h-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#3c7cec" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
              </div>
                <h1 className="ml-2">Click it, scan it, or share it.</h1>
              </AccordionTrigger>
              <AccordionContent className="flex px-6 md:flex-row flex-col">
                <Link href="/app/links">
                  <Button size="sm" className="py-3 w-fit" variant="default">
                    <LinkIcon />
                    <h1 className="ml-1">View your links</h1>
                  </Button>
                </Link>
                <Link href="/app/qrcodes">
                  <Button
                    size="sm"
                    variant="default"
                    className="md:ml-2 py-3 md:mt-0 mt-2 w-fit"
                  >
                    <QrCode />
                    <h1 className="ml-1">View your QR codes</h1>
                  </Button>
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="flex items-center">
              <div className="w-4 h-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#3c7cec" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
              </div>
                <h1 className="ml-2">Check out EatMyUrl Analytics</h1>
              </AccordionTrigger>
              <AccordionContent className="flex px-6">
                <Button onClick={()=>{
                  if(linkId != -1){
                    router.push(`/app/links/${encodeId(linkId)}`)
                  }
                  else{
                    toast({
                      title:"Create a link",
                      description:"Create atleast one link to continue"
                    })
                    router.push('/app/links/create')
                  }
                }} size="sm" className="py-3" variant="default">
                  <BarChart />
                  View Analytics
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex-1 flex flex-col border-2 rounded-xl p-6 shadow-md md:ml-12 mt-4 md:mt-0 justify-center h-fit">
          <h1 className="font-bold text-xl">
            Custom ShortCodes
          </h1>
          <h1 className="mt-3 text-gray-500">
            Get a custom shortened url only on EatMyUrl. Its brief and easy to remember.
          </h1>
          <Button onClick={()=>router.push('/app/links/create')} className="mt-4 w-36" variant='default'>
            Create a link
          </Button>
        </div>
      </div>
    </div>
  );
}
