import { toast } from "@/components/ui/use-toast";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function copyToClipboard(text:string){
  navigator.clipboard.writeText(text);
    toast({
      title: "Copied the link to clipboard !!",
    });
}