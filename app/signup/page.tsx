"use client"

import React, { useState } from 'react'
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { register } from '@/lib/actions/register'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

const SignupPage = () => {
    const [email,setEmail] = useState("")
    const [pass,setPass] = useState("")
    const {toast} = useToast()
    const router = useRouter()

  return (
    <div className='flex w-full h-screen justify-center items-center'>
        <Card className='w-[400px]'>
            <CardHeader>
                <CardTitle className='text-center text-xl'>Register Page</CardTitle>
            <CardDescription className='text-center text-lg'>Enter your details to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <Label>Email</Label>
                <Input value={email} onChange={(e)=>setEmail(e.target.value)} className='mb-4' placeholder='Enter your email'/>
                <Label>Password</Label>
                <Input value={pass} onChange={(e)=>setPass(e.target.value)} className='mb-4' placeholder='Enter your password'/>
            </CardContent>
            <CardFooter>
                <div className='flex justify-center w-full'>
                <Button onClick={async ()=>{
                    console.log("initiated")
                    const res:any = await register(email,pass)
                    console.log(res)
                    if(res.status == 200){
                        toast({
                            title: "User registered successfully",
                            description: "You can login now",
                        })
                        router.push('/signin')
                    }
                    else{
                        toast({
                            title: "Uh no! Something went wrong",
                            description: "Error while signing up",
                            variant: 'destructive'
                        })
                    }
                   
                }}>Register</Button>
                </div>
            </CardFooter>
        </Card>
    </div>
  )
}

export default SignupPage