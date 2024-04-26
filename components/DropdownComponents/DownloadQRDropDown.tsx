import { Link2Icon, QrCodeIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";

export function DownloadQRDropDown ({children}:{
    children: React.ReactNode
}){
    return <div>
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
      {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
          <DropdownMenuItem>
            <span>Download as JPEG</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Download as PNG</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Download as SVG</span>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
}