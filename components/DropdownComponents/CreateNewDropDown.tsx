"use client"

import { Link2Icon, QrCodeIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from 'next/link';

export function CreateNewDropDown ({children}:{
    children: React.ReactNode
}){

    return <div>
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
      {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        <DropdownMenuGroup>
          
          <Link href="/app/links/create">
          <DropdownMenuItem>
            <Link2Icon className="mr-2 h-4 w-4" />
            <span>Link</span>
          </DropdownMenuItem>
          </Link>

          <Link href="/app/qrcodes/create">
          <DropdownMenuItem>
            <QrCodeIcon className="mr-2 h-4 w-4" />
            <span>QR Code</span>
          </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
}