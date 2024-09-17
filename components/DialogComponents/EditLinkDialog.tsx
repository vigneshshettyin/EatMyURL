"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateLinkAction } from "@/lib/actions/updateLinkAction";
import { HTTP_STATUS } from "@/lib/constants";
import { Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { linkType } from "@/interfaces/types";

export function EditLinkDialog({ children,link,setShortcode,setParentTitle }: {
  children:React.ReactNode,
  link: linkType,
  setShortcode:React.Dispatch<React.SetStateAction<string>>,
  setParentTitle:React.Dispatch<React.SetStateAction<string | null>>
}) {
  const [title,setTitle] = useState<string>(link.title || "")
  const [shortLink,setShortLink] = useState(link.short_code)

  const updateLink = async () =>{
      const formdata = new FormData();
      formdata.append('title',title);
      formdata.append('short_code',shortLink)
      formdata.append('linkId',link.id.toString())
      const new_title = title;
      const new_short_code = shortLink;

      const res = await updateLinkAction(formdata)
      
      if(res.status == HTTP_STATUS.OK){
        toast.success("Link Updated Successfully !!")

        setParentTitle(new_title)
        setShortcode(new_short_code)
      }
      else if(res.status == HTTP_STATUS.CONFLICT){
          toast.error("The short code has already been taken")
      }
      else if(res.status == HTTP_STATUS.BAD_REQUEST){
        toast.error("Invalid Inputs")
      }
      else{
        toast.error("Some error occured")
      }
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
          <Input name="title" value={title} onChange={(e)=>setTitle(e.target.value)} className="mt-2" />
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
              <Input name="shortcode" value={shortLink} onChange={(e)=>setShortLink(e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button onClick={()=>updateLink()}>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
