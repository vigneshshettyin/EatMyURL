"use client";

import { LoadingSpinner } from "@/components/LoadingComponents/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { createLinkAction } from "@/lib/actions/createLinkAction";
import { HTTP_STATUS } from "@/lib/constants";

import { Lock } from "lucide-react";
import { useState } from "react";
import { render } from "react-dom";

export default function CreatePage() {
  const [longUrl, setLongurl] = useState("");
  const [title, setTitle] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [loading, setLoading] = useState(false);
  // const [requireQRCode, setRequireQRCode] = useState(false);

  return (
    <div>
      <div className="flex justify-center mt-12">
        <form
          action={(e) => {
            
            // issue - not updating in dom
            setLoading(true);
            
            createLinkAction(e).then((res) => {
              if (res.status == HTTP_STATUS.CREATED) {
                toast({
                  title: "Link shortened successfully !!",
                });
              } else if (res.status == HTTP_STATUS.BAD_REQUEST) {
                toast({
                  title: "Invalid Inputs !!",
                  description: "Please try again",
                  variant: "destructive",
                });
              } else {
                toast({
                  title: "Error while shortening the link",
                  description: "Please try again",
                  variant: "destructive",
                });
              }
              setLongurl("");
              setTitle("");
              
              setLoading(false);
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

            {/* <div>
            <div className="flex mt-12">
              <Label className="font-bold text-xl">QR Code</Label>
              <Label className="ml-2 text-gray-400 text-xl">(optional)</Label>
            </div>

            <div className="mt-4 flex">
              <Switch checked={requireQRCode} onClick={()=>setRequireQRCode(q=>!q)} />
              <h1 className="ml-2 text-sm">
                {" "}
                Generate a QR Code to share anywhere people can see it{" "}
              </h1>
            </div>
          </div> */}

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
                  name="shortLink"
                  value={shortLink}
                  onChange={(e) => setShortLink(e.target.value)}
                  className="mt-2 md:mt-0"
                />
              </div>
            </div>

            <div className="mt-16 flex justify-between">
              <div className="ml-4">
                {loading ? <LoadingSpinner size={32} /> : <div></div>}
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
