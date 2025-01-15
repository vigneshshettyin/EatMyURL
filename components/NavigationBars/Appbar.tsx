"use client";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "../DropdownComponents/ModeToggle";
import { Card } from "../ui/card";
import Link from "next/link";
import LoginRegDisplay from "../Auth/LoginRegDisplay";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { SideNavbarMobile } from "./SideNavbarMobile";

export function Appbar() {

  return (
    <div className="fixed h-fit py-3 top-0 w-full pb-3 z-30 bg-inherit border-b-2">
      <div className="flex px-6">
        <div className="flex mt-1">
        <Link href="/">
          <Label className="text-xl font-bold cursor-pointer">
            EatMyUrl
          </Label>
          </Link>
        </div>
        <div className="absolute right-6 flex">
          <div className="mr-3 md:hidden block">
          <SideNavbarMobile><Button variant="outline"><HamburgerMenuIcon/></Button></SideNavbarMobile>
          </div>
          <LoginRegDisplay/>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
