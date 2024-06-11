"use client"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SideNavBar } from "./SideNavBar"
import { useState } from "react"

export function SideNavbarMobile ({children}:{
    children:React.ReactNode
}){
      const [isOpen,setIsOpen] = useState(false);

      return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            {children}
          </SheetTrigger>
          <SheetClose asChild>
          <SheetContent>
              <div onClick={()=>setIsOpen(false)}>
            <SideNavBar/>
              </div>
          </SheetContent>
          </SheetClose>
        </Sheet>
      )
    }