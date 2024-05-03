"use client";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "../DropdownComponents/ModeToggle";
import { LoginRegDropDown } from "../DropdownComponents/LoginRegDropDown";
import { Card } from "../ui/card";
import { useSession } from "next-auth/react"
import Link from "next/link";
import LoginRegDisplay from "../Auth/LoginRegDisplay";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { SideNavbarMobile } from "./SideNavbarMobile";

export function Appbar() {

  const {status} = useSession()

  return (
    <Card className="sticky top-0 w-full pb-3 z-30">
      <div className="flex mt-3 px-6">
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
          <LoginRegDropDown status={status} />
          <LoginRegDisplay/>
          <ModeToggle />
        </div>
      </div>
    </Card>
  );
}
