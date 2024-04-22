import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function CreatePage(){
    return <div>
        <div className="flex justify-center mt-12">
    <div className="h-screen flex flex-col w-[300px] md:w-[800px] px-6">
        <Label className="text-2xl font-bold">Create New</Label>
        <div className="mt-8">
        <Label>Destination</Label>
        <Input className="mt-2" placeholder="https://example.com/my-long-url"/>
        </div>
        <div>
        <div className="flex mt-8">
        <Label className="font-bold">Title</Label>
        <Label className="ml-2">(optional)</Label>
        </div>
        <Input className="mt-2" placeholder="Enter title"/>
        </div>
    </div>
    </div> 
    </div>
    
}