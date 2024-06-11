"use client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import AuthenticatingComponent from "../LoadingComponents/AuthenticatingComponent";
import { LinkLoading } from "../LoadingComponents/LinkLoading";

export default function WithAuth(Component : any){
    return function WithAuth(props:any){
        const {status} = useSession();
        const [show,setShow] = useState(false);


        useEffect(()=>{
            if(status!='loading' && !show) setShow(true)
            if(status == 'unauthenticated'){
                toast({
                    title: 'You are not authenticated',
                    description: 'You need to be authenticated to access this page',
                    variant: 'destructive',
                })
                redirect('/app/login')
            }
        },[status])
        
        if(show) 
            return <Component {...props}/>
        else
            return <LinkLoading/>
    }
}