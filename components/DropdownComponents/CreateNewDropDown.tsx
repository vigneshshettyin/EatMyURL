import { Link2Icon, QrCodeIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";

export function CreateNewDropDown ({children}:{
    children: React.ReactNode
}){
    return <div>
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
      {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link2Icon className="mr-2 h-4 w-4" />
            <span>Link</span>
            <DropdownMenuShortcut>B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <QrCodeIcon className="mr-2 h-4 w-4" />
            <span>QR Code</span>
            <DropdownMenuShortcut>Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
}