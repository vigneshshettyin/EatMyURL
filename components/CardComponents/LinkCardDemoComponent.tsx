import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { CopyIcon, BarChart } from "lucide-react";
import { QrPopup } from "../DialogComponents/QrPopup";
import { copyToClipboard } from "@/lib/utils";
import { publicLinkType } from "@/interfaces/types";

const REDIRECT_URL = process.env.REDIRECT_URL || "https://eurl.dev";

export function LinkCardComponent({
  publicLink,
}: {
  publicLink: publicLinkType;
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
            <div className="items-center flex">
              <Label
                onClick={() =>
                  window.open(
                    `${REDIRECT_URL}/${publicLink.shortUrl}`,
                    "_blank"
                  )
                }
                className="cursor-pointer hover:underline text-md md:text-lg text-blue-500"
              >{`${REDIRECT_URL}/${publicLink.shortUrl}`}</Label>

              <div className="md:flex hidden">
                <CopyIcon
                  onClick={() => {
                    copyToClipboard(`${REDIRECT_URL}/${publicLink.shortUrl}`);
                  }}
                  className="ml-3 h-4 w-4 cursor-pointer hover:scale-110"
                />
                <QrPopup shortUrl={publicLink.shortUrl} />
                <BarChart className="ml-6 h-4 w-4" />
                <Label className="text-xs ml-1 text-gray-500">
                  7.5K Clicks
                </Label>
              </div>

            </div>

            <Label className="text-sm text-gray-400 text-wrap mt-[2px]">
              {publicLink.longUrl.length > 30
                ? `${publicLink.longUrl.slice(0, 31)}...`
                : `${publicLink.longUrl}`}
            </Label>
            
            <div className="md:hidden flex mt-4">
                <CopyIcon
                  onClick={() => {
                    copyToClipboard(`${REDIRECT_URL}/${publicLink.shortUrl}`);
                  }}
                  className="h-4 w-4 cursor-pointer hover:scale-110"
                />
                <QrPopup shortUrl={publicLink.shortUrl} />
                <BarChart className="ml-6 h-4 w-4" />
                <Label className="text-xs ml-1 text-gray-500">
                  7.5K Clicks
                </Label>
              </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
