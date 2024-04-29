"use client"
import { SideNavBar } from "@/components/NavigationBars/SideNavBar";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Layout({children}:{
    children : React.ReactNode
}){

  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login')
      toast({
        title: 'You are not authenticated',
        description: 'You need to be authenticated to access this page',
        variant: 'destructive',
      })
    },
    })

    return <div className="flex pb-4">
        <SideNavBar/>
        <div className="ml-[40px] md:ml-[150px] w-full mt-[34px]">
        {children}
        </div>
    </div>
}

