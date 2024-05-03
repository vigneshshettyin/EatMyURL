import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SideNavBar } from "./SideNavBar"

export function SideNavbarMobile ({children}:{
    children:React.ReactNode
}){
      return (
        <Sheet>
          <SheetTrigger asChild>
            {children}
          </SheetTrigger>
          <SheetContent>
            <SheetClose asChild>
              <div>
            <SideNavBar/>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>
      )
    }