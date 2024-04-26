import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Facebook, Instagram, MessageCircle, MessageCircleCodeIcon, MessageCircleDashed } from "lucide-react"
import React from "react"
import { toast } from "../ui/use-toast"
import { InstagramLogoIcon } from "@radix-ui/react-icons"

export function LinkShareDialog({children,link}:{
    children : React.ReactNode,
    link:any
}) {

  function copyToClipboard(){
    navigator.clipboard.writeText(link.shortLink);
    toast({
      title: "Copied the link to clipboard !!",
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Link</DialogTitle>
          <DialogDescription>
          Showcase your content and get more visitors by sharing your link across the web
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="flex">
          <Input type="email" value={link.shortLink} disabled />
          
          <Button className="ml-2" onClick={copyToClipboard} >
          <Copy size={20} className="md:hidden block"/>
            <h1 className="hidden md:block">Copy</h1>
          </Button>
          </div>
        <div className="flex justify-center">
          <div className="flex cursor-pointer justify-center items-center h-14 w-14 mt-4 rounded-full border-2">
              <MessageCircleCodeIcon size={35}/>
          </div>
          <div className="flex ml-4 cursor-pointer justify-center items-center h-14 w-14 mt-4 rounded-full border-2">
              <Instagram size={30}/>
          </div>
          <div className="flex ml-4 cursor-pointer justify-center items-center h-14 w-14 mt-4 rounded-full border-2">
              <Facebook size={30}/>
          </div>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
