import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";

export function DownloadQRDropDown ({children,downloadQRCode}:{
    children: React.ReactNode,
    downloadQRCode: (format:string)=>void
}){
    return <div>
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
      {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={()=>downloadQRCode("jpeg")}>
            <span>Download as JPEG</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>downloadQRCode("png")}>
            <span>Download as PNG</span>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <span>Download as SVG</span>
          </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
}