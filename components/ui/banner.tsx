"use client"
import { CookieIcon, Server } from "lucide-react";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function CookieConsent({ variant = "default", demo = true, onAcceptCallback = () => { }, onDeclineCallback = () => { } }) {
    const [isOpen, setIsOpen] = useState(false);
    const [hide, setHide] = useState(false);

    const accept = () => {
        setIsOpen(false);
        document.cookie = "cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        setTimeout(() => {
            setHide(true);
        }, 700);
        onAcceptCallback();
    };

    const decline = () => {
        setIsOpen(false);
        setTimeout(() => {
            setHide(true);
        }, 700);
        onDeclineCallback();
    };

    useEffect(() => {
        try {
            setIsOpen(true);
            if (document.cookie.includes("cookieConsent=true")) {
                if (!demo) {
                    setIsOpen(false);
                    setTimeout(() => {
                        setHide(true);
                    }, 700);
                }
            }
        }
        catch (e) {
            // console.log("Error: ", e);
        }
    }, []);

    return (
        variant != "small" ? (
            <div className={cn("fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700", !isOpen ? "transition-[opacity,transform] translate-y-8 opacity-0" : "transition-[opacity,transform] translate-y-0 opacity-100", hide && "hidden")}>
                <div className="dark:bg-card bg-background rounded-md m-3 border border-border shadow-lg">
                    <div className="grid gap-2">
                        <div className="border-b border-border h-14 flex items-center justify-between p-4">
                            <h1 className="text-lg font-medium">Server is down</h1>
                            <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
                        </div>
                        <div className="p-4">
                            <p className="text-sm font-normal text-start">
                           
                            </p>
                        </div>
                        <div className="flex gap-2 p-4 py-5 border-t border-border dark:bg-background/20">
                            
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className={cn("fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700", !isOpen ? "transition-[opacity,transform] translate-y-8 opacity-0" : "transition-[opacity,transform] translate-y-0 opacity-100", hide && "hidden")}>
                <div className="m-3 dark:bg-card bg-background border border-border rounded-lg">
                    <div className="flex items-center justify-between p-3">
                        <h1 className="text-lg font-medium">Server is down</h1>
                        <Server className="h-[1.2rem] w-[1.2rem]" />
                    </div>
                    <div className="p-3 -mt-2">
                        <p className="text-sm text-left text-muted-foreground">
                        The server will be temporarily unavailable until the end of the week due to maintenance. We apologize for any inconvenience this may cause.
                        </p>
                    </div>
                    <div className="p-3 flex items-center gap-2 mt-2 border-t">
                    <Button onClick={accept} className="w-full">I understand</Button>
                    </div>
                </div>
            </div>
        )
    )
}