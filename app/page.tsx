"use client"
import { LinkCardComponent } from "@/components/ui/LinkCardComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";

export default function Home() {
  return (
    <div className="flex-row justify-center mt-14 flex">
      <div className="flex flex-col items-center">
      <Label className="text-5xl font-bold">Short Links with</Label>
      <Label className="text-5xl font-bold text-yellow-500 mt-4">With SuperPowers</Label>
      <Label className="text-lg mt-5">EatMyUrl is an open source link management website</Label>
      <div className="mt-6">
        <Button>Start for free</Button>
        <Button variant='outline' className="ml-4">Get a demo</Button>
      </div>
      <Input placeholder="🔗   http://eatmyurl.vshetty.dev" className="mt-6"/>
      <div className="mt-6">
        <LinkCardComponent/>
      </div>
      </div>
    </div>
  );
}
