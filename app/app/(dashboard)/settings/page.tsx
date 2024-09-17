"use client"

import AuthenticatingComponent from "@/components/LoadingComponents/AuthenticatingComponent";
import { LoadingSpinner } from "@/components/LoadingComponents/LoadingSpinner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getUserDetails, updateUser } from "@/lib/actions/updateUserAction";
import { HTTP_STATUS } from "@/lib/constants";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";


export default function SettingsPage(){
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [confPass,setConfPass] = useState("")
    const [newPass,setNewPass] = useState("")

    const [loading,setLoading] = useState(true)
    const [updateLoading,setUpdateLoading] = useState(false)

    useEffect(()=>{
        setLoading(true);
        getUserDetails().then((res)=>{
            setEmail(res.email || "")
            setName(res.name || "")

            setLoading(false)
        })
    },[])

    async function updateDetails(){
        const formdata = new FormData();

        if(!name || !confPass){
            toast.error("Invalid Inputs")
            return;
        }

        formdata.append('name',name);
        formdata.append('confPass',confPass)
        formdata.append('newPass',newPass)
        setUpdateLoading(true)
        const res = await updateUser(formdata);
        
        if(res.status == HTTP_STATUS.OK){
            toast.success("User updated successfully")
        } else if(res.status == HTTP_STATUS.BAD_REQUEST){
            toast.error("Incorrect password")
        } 
        else if(res.status == HTTP_STATUS.NOT_ACCEPTABLE){
            toast.error("Password must contain atleast 6 characters")
        } else{
            toast.error("Error while updating the user")
        }
        setUpdateLoading(false)
        setConfPass("")
        setNewPass("")
        
    }

    if(loading){
        return <div className="flex justify-center items-center h-screen"><AuthenticatingComponent/></div>
    }


    return <div className="mt-10 flex flex-col items-center">
        <Avatar className="w-16 h-16">
              <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <div className="mt-6">
        <Label className="font-semibold">Name</Label>
        <Input value={name} onChange={(e)=>setName(e.target.value)} className="w-[300px] mt-[4px]"/>
        </div>
        <div className="mt-6">
        <Label className="font-semibold">Email Address</Label>
        <Input className="w-[300px] mt-[4px]" value={email} disabled/>
        </div>
        <div className="mt-6">
        <Label className="font-semibold">Confirm Password</Label>
        <Input type="password" value={confPass} onChange={(e)=>setConfPass(e.target.value)} className="w-[300px] mt-[4px]"/>
        </div>
        <div className="mt-6">
        <Label className="font-semibold">New Password</Label>
        <Input type="password" value={newPass} onChange={(e)=>setNewPass(e.target.value)} className="w-[300px] mt-[4px]"/>
        </div>
        <Button onClick={()=>updateDetails()} className="mt-8 w-[300px]">Update</Button>
        {updateLoading?<LoadingSpinner className="mt-6" size={30}/>:<></>}
    </div>
}