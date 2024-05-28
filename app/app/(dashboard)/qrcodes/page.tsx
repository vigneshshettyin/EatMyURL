"use client"

import { QRCodeCardComponent } from "@/components/CardComponents/QRCodeCardComponent";
import { QRCodeType, linkType } from "@/interfaces/types";
import { getLinks } from "@/lib/actions/getLinksAction";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import Loading from "./loading";
  
export default function QRCodePage(){

    const [loading,setLoading] = useState<Boolean>(false);
    const [links,setLinks] = useState<linkType[] | undefined>([])

    useEffect(()=>{
        setLoading(true)
        getLinks().then((res)=>{
            const linkList:linkType[] | undefined = res.links;
            setLinks(linkList)
            setLoading(false)
        })
    },[])

    return <div className="pr-6 pl-4 md:pl-8 pt-8">
    <Label className="text-3xl font-bold">QR Codes</Label>
    {loading?<Loading/>:<div>{links?.map((qr)=><QRCodeCardComponent key={qr.id} qrcode={qr}/>)}</div>}
    </div>
}