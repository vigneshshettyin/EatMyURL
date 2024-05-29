import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Copy, Facebook, MessageCircleCodeIcon,LinkedinIcon } from "lucide-react"
import React from "react"
import { toast } from "../ui/use-toast"
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from "react-share";
import { TwitterLogoIcon } from "@radix-ui/react-icons"
import { linkType } from "@/interfaces/types"

export function LinkShareDialog({children,link}:{
    children : React.ReactNode,
    link: linkType
}) {

  const REDIRECT_URL:string = process.env.REDIRECT_URL || "https://eurl.vshetty.dev";
  const shortLink:string = `${REDIRECT_URL}/${link.short_code}` 

  function copyToClipboard(){
    navigator.clipboard.writeText(shortLink);
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
          <Input type="email" value={shortLink} disabled />
          
          <Button className="ml-2" onClick={copyToClipboard} >
          <Copy size={20} className="md:hidden block"/>
            <h1 className="hidden md:block">Copy</h1>
          </Button>
          </div>
        <div className="flex justify-center">
        <WhatsappShareButton url={shortLink} title="EatMyUrl">
          <div className="flex cursor-pointer justify-center items-center h-14 w-14 mt-4 rounded-full border-2">
              <MessageCircleCodeIcon size={35}/>
          </div>
          </WhatsappShareButton>
          <LinkedinShareButton url={shortLink} title="Empower your links with EatMyURL's effortless shortening. Streamline sharing and make every link count. Try it now: ">
          <div className="flex ml-4 cursor-pointer justify-center items-center h-14 w-14 mt-4 rounded-full border-2">
              <LinkedinIcon size={30}/>
          </div>
          </LinkedinShareButton>
          <FacebookShareButton url={shortLink} title="Empower your links with EatMyURL's effortless shortening. Streamline sharing and make every link count. Try it now: " >
          <div className="flex ml-4 cursor-pointer justify-center items-center h-14 w-14 mt-4 rounded-full border-2">
              <Facebook size={30}/>
          </div>
          </FacebookShareButton>
          <TwitterShareButton url={shortLink} title="Empower your links with EatMyURL's effortless shortening. Streamline sharing and make every link count. Try it now: ">
          <div className="flex ml-4 cursor-pointer justify-center items-center h-14 w-14 mt-4 rounded-full border-2">
              <TwitterLogoIcon />
          </div>
          </TwitterShareButton>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
