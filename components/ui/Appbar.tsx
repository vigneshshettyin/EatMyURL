"use client"
import { Label } from "@/components/ui/label";
import { ModeToggle } from "./ModeToggle";
import { signOut, useSession,getSession, signIn } from "next-auth/react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import { Button } from "./button";
import { useRouter } from "next/navigation";
  
export function Appbar(){
    const router = useRouter()

    return <div className="flex mt-3 px-6">
        <div className="flex mt-1">
        <Label className="text-xl font-bold">EatMyUrl</Label>
        </div>
        <div className="flex ml-12">
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>Features</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>New Tab</MenubarItem>
                    <MenubarItem>New Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Print</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
        <Button variant='link' className="ml-4">Customers</Button>
        <Button variant='link' className="ml-4">Pricing</Button>
        <Button variant='link' className="ml-4">Enterprise</Button>
        </div>
        <div className="absolute right-6 flex">
        <div>
        <Button variant='outline' onClick={()=>signIn()} className="mr-2">Login</Button>
        <Button variant='outline' className="mr-4" onClick={()=>router.push('/signup')}>Register</Button>
        </div>
        <ModeToggle/>
        </div>
    </div>
}