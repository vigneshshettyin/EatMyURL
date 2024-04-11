"use client";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "./ModeToggle";
import { signOut, signIn } from "next-auth/react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { Button } from "./button";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { LoginRegDropDown } from "./LoginRegDropDown";
import { Card } from "./card";

export function Appbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Card className="sticky top-0 overflow-hidden w-full pb-3">
      <div className="flex mt-3 px-6">
        <div className="flex mt-1">
          <Label
            onClick={() => router.push("/")}
            className="text-xl font-bold cursor-pointer"
          >
            EatMyUrl
          </Label>
        </div>
        <div className="absolute right-6 flex">
          <LoginRegDropDown pathname={pathname} />
          {pathname == "/dashboard" ? (
            <div>
              <Button
                variant="outline"
                className="mr-4 hidden md:inline-block"
                onClick={() => signOut()}
              >
                Signout
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant="outline"
                onClick={() => signIn()}
                className="mr-2 hidden md:inline-block"
              >
                Login
              </Button>
              <Button
                variant="outline"
                className="mr-4 hidden md:inline-block"
                onClick={() => router.push("/register")}
              >
                Register
              </Button>
            </div>
          )}

          <ModeToggle />
        </div>
      </div>
    </Card>
  );
}
