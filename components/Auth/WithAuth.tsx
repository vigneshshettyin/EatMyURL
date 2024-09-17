"use client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AuthenticatingComponent from "../LoadingComponents/AuthenticatingComponent";
import { LinkLoading } from "../LoadingComponents/LinkLoading";

export default function WithAuth(Component : any){
    return function WithAuth(props:any){
        const {status} = useSession();
        const [show,setShow] = useState(false);


        useEffect(()=>{
            if(status!='loading' && !show) setShow(true)
            if(status == 'unauthenticated'){
                toast.error('You are not authenticated')
                redirect('/app/login')
            }
        },[status])
        
        if(show) 
            return <Component {...props}/>
        else
            return <LinkLoading/>
    }
}