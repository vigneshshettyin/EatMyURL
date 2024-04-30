"use client";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "../DropdownComponents/ModeToggle";
import { signOut, signIn } from "next-auth/react";

import { Button } from "../ui/button";
import { LoginRegDropDown } from "../DropdownComponents/LoginRegDropDown";
import { Card } from "../ui/card";
import { useSession } from "next-auth/react"
import Link from "next/link";
import LoginRegDisplay from "../Auth/LoginRegDisplay";

export function Appbar() {

  const {status} = useSession()

  return (
    <Card className="sticky top-0 w-full pb-3 z-30">
      <div className="flex mt-3 px-6">
        <div className="flex mt-1">
          <Label className="text-xl font-bold cursor-pointer">
            EatMyUrl
          </Label>
        </div>
        <div className="absolute right-6 flex">
          <LoginRegDropDown status={status} />
          <LoginRegDisplay/>
          <ModeToggle />
        </div>
      </div>
    </Card>
  );
}
