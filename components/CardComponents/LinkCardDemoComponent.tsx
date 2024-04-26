import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { CopyIcon, QrCodeIcon, BarChart } from "lucide-react";
import { toast } from "../ui/use-toast";
import { QrPopup } from "../DialogComponents/QrPopup";

export function LinkCardComponent() {
  return (
    <div>
      <Card>
        <CardContent className="mt-4 flex">
          <div className="flex flex-col justify-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
          </div>
          <div className="flex flex-col justify-center ml-4">
            <div className="flex items-center">
              <Label className="text-lg text-blue-500">eurl.dev/new</Label>
              <CopyIcon
                onClick={() => {
                  navigator.clipboard.writeText("eurl.dev/new");
                  toast({
                    title: "Copied the link to clipboard !!",
                  });
                }}
                className="ml-3 h-4 w-4 cursor-pointer hover:scale-110"
              />
              <QrPopup />
              <BarChart className="ml-6 h-4 w-4" />
              <Label className="text-xs ml-1 text-gray-500">7.5K Clicks</Label>
            </div>
            <Label className="text-sm text-gray-400">
              http://eatmyurl.vshetty.dev
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}