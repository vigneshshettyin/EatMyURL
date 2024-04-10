import { Avatar,AvatarImage,AvatarFallback } from "./avatar";
import { Card, CardContent } from "./card";
import { Label } from "./label";

export function LinkCardComponent(){
    return <div>
        <Card>
            <CardContent className="mt-4 flex">
            <div className="flex flex-col justify-center">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            </div>
            <div className="flex flex-col justify-center ml-4">
                <div className="flex items-center">
                <Label className="text-lg">eurl.dev/new</Label>
                <img src='https://cdn-icons-png.flaticon.com/512/126/126498.png' className="h-4 w-4 ml-3 hover:scale-110 cursor-pointer"/>
                <img src='https://upload.wikimedia.org/wikipedia/commons/5/5e/QR_Code_example.png' className="h-4 w-4 ml-3 hover:scale-110 cursor-pointer"/>
                </div>
                <Label className="text-sm text-gray-400">http://eatmyurl.vshetty.dev</Label>
            </div>
            </CardContent>
        </Card>
    </div>
}