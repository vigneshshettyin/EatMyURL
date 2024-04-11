"use client"
import { LinkCardComponent } from "@/components/ui/LinkCardComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {LinkCardSkeleton} from '@/components/ui/LinkCardSkeleton'
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const router = useRouter()
  return (
    <div className="flex-row justify-center mt-14 flex px-4 pb-4">
      <div className="flex flex-col items-center">
      <Label className="text-4xl md:text-5xl font-bold">Short Links with</Label>
      <Label className="text-4xl md:text-5xl font-bold text-yellow-500 mt-4">With SuperPowers</Label>
      <Label className="text-lg mt-5 text-center">EatMyUrl is an open source link management website</Label>
      <div className="mt-6">
        <Button onClick={()=>router.push('/signin')}>Start for free</Button>
        <Button variant='outline' className="ml-4">Get a demo</Button>
      </div>
      <Input placeholder="🔗   http://eatmyurl.vshetty.dev" className="mt-6"/>
      <div className="mt-6">
        <LinkCardComponent/>
        <LinkCardSkeleton/>
        <LinkCardSkeleton/>
        <div className="mt-5">
        <Card className="w-fit max-w-[500px] flex items-center">
            <CardContent className="mt-4 flex">
            <div className="flex flex-col justify-center">
              <Label className="leading-5 py-0 text-gray-500">Want to claim your links, edit them,or view their  <Label className="underline font-bold">analytics</Label>? <Label onClick={()=>router.push('/signup')} className="underline font-bold cursor-pointer">Create a
                free account on EatMyUrl</Label> to get started.
              </Label>
            </div>
            </CardContent>
        </Card>
       </div>
      </div>
      </div>
    </div>
  );
}
