import { Link2Icon, QrCodeIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function CreateNewDropDown ({children}:{
    children: React.ReactNode
}){
  const router = useRouter()
    return <div>
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
      {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={()=>router.push('/links/create')}>
            <Link2Icon className="mr-2 h-4 w-4" />
            <span>Link</span>
            <DropdownMenuShortcut>B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>router.push('/qrcodes/create')}>
            <QrCodeIcon className="mr-2 h-4 w-4" />
            <span>QR Code</span>
            <DropdownMenuShortcut>Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
}