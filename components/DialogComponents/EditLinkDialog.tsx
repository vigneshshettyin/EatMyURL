"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditLink } from "@/interfaces/types";
import { Lock } from "lucide-react";
import { useState } from "react";

export function EditLinkDialog({ children,link }: {
  children:React.ReactNode,
  link: EditLink
}) {
  const [title,setTitle] = useState(link.title)
  const [shortLink,setShortLink] = useState(link.shortLink)

  function editLink(){
    const tempLink = {
      title,
      shortLink
    }
    
    console.log(tempLink)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
        </DialogHeader>
        <div>
          <Label className="text-sm">Title</Label>
          <Input value={title} onChange={(e)=>setTitle(e.target.value)} className="mt-2" />
          <div className="flex mt-4 md:flex-row flex-col">
            <div className="flex-3">
              <div className="flex items-center">
                <Label className="text-sm">Domain</Label>
                <Lock className="ml-1" size={12} />
              </div>
              <Input className="mt-2" placeholder="eurl.dev" disabled />
            </div>
            <div className="flex-1 ml-0 md:ml-2 md:mt-0 mt-3">
              <Label className="text-sm">BackHalf</Label>
              <Input value={shortLink} onChange={(e)=>setShortLink(e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={editLink}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
