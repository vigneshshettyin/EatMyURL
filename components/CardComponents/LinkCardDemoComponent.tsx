import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { CopyIcon, BarChart } from "lucide-react";
import { QrPopup } from "../DialogComponents/QrPopup";
import { copyToClipboard } from "@/lib/utils";
import { publicLinkType } from "@/interfaces/types";

export function LinkCardComponent({publicLink}:{
  publicLink : publicLinkType
}) {
  return (
    <div className="mt-4">
      <Card>
        <CardContent className="mt-4 flex">
          <div className="flex flex-col justify-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
          </div>
          <div className="flex flex-col justify-center ml-4">
            <div className="flex items-center">
              <Label className="text-lg text-blue-500">eurl.vshetty.dev/{publicLink.shortUrl}</Label>
              <CopyIcon
                onClick={()=>{copyToClipboard("eurl.vshetty.dev/" + publicLink.shortUrl)}}
                className="ml-3 h-4 w-4 cursor-pointer hover:scale-110"
              />
              <QrPopup shortUrl={publicLink.shortUrl} />
              <BarChart className="ml-6 h-4 w-4" />
              <Label className="text-xs ml-1 text-gray-500">7.5K Clicks</Label>
            </div>
            <Label className="text-sm text-gray-400">
              {publicLink.longUrl}
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
