import { Label } from "@/components/ui/label";
import { ModeToggle } from "./ModeToggle";

export function Appbar(){
    return <div className="flex justify-between mt-3 px-6">
        <div>
        <Label className="text-xl font-bold">EatMyUrl</Label>
        </div>
        <div>
        <ModeToggle/>
        </div>
    </div>
}