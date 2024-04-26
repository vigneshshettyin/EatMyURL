"use client"

import { ThemeProvider } from "@/components/ui/theme-provider";
import { SessionProvider } from "next-auth/react";

export function Providers ({children} : any){
    return <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>   
            {children}
        </ThemeProvider>
    </SessionProvider>
}