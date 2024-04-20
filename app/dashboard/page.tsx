"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Label } from "@radix-ui/react-label";
import {
  BarChart2Icon,
  BoomBox,
  HomeIcon,
  LineChart,
  Link2,
  LinkIcon,
  Plus,
  QrCodeIcon,
  ScanLineIcon,
  Settings,
} from "lucide-react";

export default function Dashboard() {
  const session = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (session.status == "unauthenticated") {
  //     toast({
  //       title: "Please login to continue !!",
  //     });
  //     router.push("/login");
  //   }
  // }, [session.status]);

  return (
    <div className="flex">
      <div className="flex flex-col px-2 md:px-4 border-r-2 h-screen">
        <Button className="hidden md:block mt-12">Create New</Button>
        <Button size="icon" className="md:hidden mt-12">
          <Plus />
        </Button>
        {/* this is a seperator */}
        <div className="border-t-2 my-4"></div>
        <div className="flex flex-col items-center md:items-start">
          <div className="flex mt-3 cursor-pointer">
            <HomeIcon />
            <Label className="hidden md:block ml-1 cursor-pointer">Home</Label>
          </div>
          <div className="flex mt-8 cursor-pointer">
            <LinkIcon />
            <Label className="ml-1 hidden md:block cursor-pointer">Links</Label>
          </div>
          <div className="flex mt-8 cursor-pointer">
            <QrCodeIcon />
            <Label className="ml-1 hidden md:block cursor-pointer">
              QR Codes
            </Label>
          </div>
          <div className="flex mt-8 cursor-pointer">
            <BarChart2Icon />
            <Label className="ml-1 hidden md:block cursor-pointer">
              Analytics
            </Label>
          </div>
        </div>
        <div className="border-t-2 my-6"></div>
        <div className="flex mt-4 justify-center md:justify-start cursor-pointer">
          <Settings />
          <Label className="ml-1 cursor-pointer hidden md:block ">
            Settings
          </Label>
        </div>
      </div>
      <div className="flex flex-col pt-8 pl-4 w-full pr-4">
        <h1 className="text-2xl text-center md:text-left md:text-3xl font-bold ml-5">Your connections platform</h1>
        <div className="flex flex-col md:flex-row  w-full h-36 rounded-xl mt-6 p-3">
          <div className="ml-2 flex-1 drop-shadow-xl border-[1px] p-2 rounded-xl">
            <div className="flex h-full">
              <div className="flex-1 flex justify-center items-center">
                <Link2 size="50px" />
              </div>
              <div className="flex-1 flex justify-center items-center flex-col py-2 md:py-0">
                <h1 className="font-bold text-sm text-center">Make it short</h1>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm mt-2 text-wrap"
                >
                  Go to Links
                </Button>
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
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm mt-2 text-wrap"
                >
                  Go to QR
                </Button>
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
                <Button variant="outline" size="sm" className="text-sm mt-2">
                  Go to Analysis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
