"use client";
import {
  BarChart2Icon,
  Divide,
  HomeIcon,
  LinkIcon,
  LogInIcon,
  LogOutIcon,
  Plus,
  QrCodeIcon,
  Settings,
  User2Icon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { CreateNewDropDown } from "../DropdownComponents/CreateNewDropDown";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function SideNavBar() {
  const { status } = useSession();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (status == "authenticated" && show) setShow(false);
  }, [status]);

  return (
    <div className="md:px-4 md:border-r-2 border-0 h-screen md:fixed static md:left-0 pt-12">
      {show ? (
        <div></div>
      ) : (
        <div>
          <div className="flex justify-center">
            <CreateNewDropDown>
              <Button className="mt-12">Create New</Button>
            </CreateNewDropDown>
          </div>
          {/* this is a seperator */}
          <div className="border-t-2 my-4"></div>
          <div className="flex flex-col items-center md:items-start">
            <Link href="/app/home">
              <div className="flex mt-3 cursor-pointer">
                <HomeIcon />
                <Label className="ml-1 cursor-pointer">Home</Label>
              </div>
            </Link>

            <Link href="/app/links">
              <div className="flex mt-8 cursor-pointer">
                <LinkIcon />
                <Label className="ml-1 cursor-pointer">Links</Label>
              </div>
            </Link>

            <Link href="/app/qrcodes">
              <div className="flex mt-8 cursor-pointer">
                <QrCodeIcon />
                <Label className="ml-1 cursor-pointer">QR Codes</Label>
              </div>
            </Link>

            <div className="flex mt-8 cursor-pointer">
              <BarChart2Icon />
              <Label className="ml-1 cursor-pointer">Analytics</Label>
            </div>
          </div>
          <div className="border-t-2 my-6"></div>
          <div className="flex mt-4 justify-center md:justify-start cursor-pointer">
            <Settings />
            <Label className="ml-1 cursor-pointer">Settings</Label>
          </div>
          <div className="border-t-2 mt-5"></div>
        </div>
      )}

      <div className="md:hidden block">
        
        {show ? (
          <div className="flex mt-12 flex-col items-center md:items-start">
            <Link href="/app/login">
              <Button>Login</Button>
            </Link>
            <Link href="/app/register">
            <Button className="mt-4">Register</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center md:items-start">
            <div onClick={() => signOut()} className="flex mt-6 cursor-pointer">
              <LogOutIcon />
              <Label className="ml-2 cursor-pointer">Logout</Label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
