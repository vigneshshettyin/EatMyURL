"use client"

import { QRCodeCardComponent } from "@/components/CardComponents/QRCodeCardComponent";
import { Label } from "@radix-ui/react-label";

export default function QRCodePage(){
    return <div className="pr-6 pl-8 h-screen pt-8">
    <Label className="text-3xl font-bold">QR Codes</Label>
    <QRCodeCardComponent/>
    </div>
}