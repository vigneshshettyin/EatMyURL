"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createLinkAction } from "@/lib/actions/createLinkAction";
import { HTTP_STATUS } from "@/lib/constants";
import encodeId from "@/lib/services/encodeId";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePage() {
  const router  = useRouter();
  const [longUrl, setLongurl] = useState("");
  const [title, setTitle] = useState("");
  const [shortLink, setShortLink] = useState("");


  return (
    <div>
      <div className="flex justify-center mt-12">
        <form
          action={(e) => {
            
            createLinkAction(e).then((res) => {
              if (res.status == HTTP_STATUS.CREATED) {
                toast.success("Link shortened successfully !!");

              router.push(`/app/links/${encodeId(res.linkId as number)}`)
              } else if(res.status == HTTP_STATUS.NOT_ACCEPTABLE){
                  toast.error("This url cannot be shortened")
              } 
              else if (res.status == HTTP_STATUS.BAD_REQUEST) {
                toast.error("Invalid Inputs !!");
              }else if (res.status == HTTP_STATUS.CONFLICT) {
                toast.error("The short code has already been in use")
              }
              else{
                toast.error("Error while shortening the link");
              }
              setLongurl("");
              setTitle("");
              setShortLink("");
              
            });
          }}
        >
          <div className="h-screen flex flex-col w-[300px] md:w-[800px] px-3">
            <Label className="text-2xl font-bold">Create New</Label>
            <div className="mt-8">
              <Label>Destination</Label>
              <Input
                value={longUrl}
                onChange={(e) => setLongurl(e.target.value)}
                name="longUrl"
                className="mt-2"
                placeholder="https://example.com/my-long-url"
              />
            </div>
            <div>
              <div className="flex mt-8">
                <Label className="font-bold">Title</Label>
                <Label className="ml-2">(optional)</Label>
              </div>
              <Input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2"
                placeholder="Enter title"
              />
            </div>

            <div className="pr-4">
              <div className="mt-10">
                <Label className="font-bold text-xl">Short Link</Label>
                <br />
                <div className="flex mt-6 justify-start md:justify-around">
                  <div className="flex">
                    <Label className="ml-1">Domain</Label>
                    <Lock className="ml-2" size="13" />
                  </div>
                  <div className="hidden md:flex">
                    <Label>Custom back-half</Label>
                    <Label className="text-gray-400 ml-2">(Optional)</Label>
                  </div>
                </div>
              </div>
              <div className="flex mt-4 flex-col md:flex-row">
                <Input placeholder="eurl.dev" disabled />
                <Label className="mx-4 hidden md:block text-2xl">/</Label>
                <div className="flex md:hidden mt-4 md:mt-0">
                  <Label>Custom back-half</Label>
                  <Label className="text-gray-400 ml-2">(Optional)</Label>
                </div>
                <Input
                  name="short_code"
                  value={shortLink}
                  onChange={(e) => setShortLink(e.target.value)}
                  className="mt-2 md:mt-0"
                />
              </div>
            </div>

            <div className="mt-16 flex justify-between">
              <div className="ml-4">
              </div>
              <div className="">
                <Button variant="ghost">Cancel</Button>
                <Button className="ml-4" type="submit">
                  Create
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
