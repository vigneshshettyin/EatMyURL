import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

export default function CreatePage() {
  return (
    <div>
      <div className="flex justify-center mt-12">
        <div className="h-screen flex flex-col w-[300px] md:w-[800px] px-3">
          <Label className="text-2xl font-bold">Create a QR Code</Label>
          <div className="mt-8">
            <Label>Destination URL</Label>
            <Input
              className="mt-2"
              placeholder="https://example.com/my-long-url"
            />
          </div>
          <div>
            <div className="mt-14">
          <Label className="text-2xl font-bold">Code Details</Label>
          </div>
            <div className="flex mt-6">
              <Label className="font-bold">Title</Label>
              <Label className="ml-2">(optional)</Label>
            </div>
            <Input className="mt-2" placeholder="Enter title" />
          </div>

          <div className="pr-4">
            <div className="mt-10">
              <Label className="font-bold text-xl">Short Link</Label>
              <br />
              <Label className="text-gray-400">The short link directs users to the website or content linked to your QR Code. If you update the short link after creating the QR Code it will change the code.</Label>
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
              <Input className="mt-2 md:mt-0" />
            </div>
          </div>

          <div className="mt-16 flex justify-end">
            <Button variant="ghost">Cancel</Button>
            <Button className="ml-4">Create</Button>
          </div>
        </div>
      </div>
      
      {/* issue - grey color texture appears  */}
      <div className="h-[100px]">

      </div>
    </div>
  );
}
