"use client"

import React, { useState,useEffect } from 'react'
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { register } from '@/lib/actions/register'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { SkeletonCard } from '@/components/ui/SkeletonCard'

const SignupPage = () => {
    const [email,setEmail] = useState("")
    const [pass,setPass] = useState("")
    const {toast} = useToast()
    const router = useRouter()
    const [loading,setLoading] = useState(true)
    const session = useSession();

    useEffect(()=>{
        if(session.status == 'authenticated' || session.status == 'unauthenticated'){
            if(session.status == 'authenticated'){
                toast({
                    title: "Welcome back !!"
                })
                router.push('/dashboard')
            }
                
            if(loading){
                setLoading(false);
            }   
        }
    },[session.status])

    if(loading)
        return <div className='flex w-full h-screen justify-center items-center'>
            <SkeletonCard/>
        </div> 

  return (
    <div className='flex w-full h-screen justify-center items-center px-4'>
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