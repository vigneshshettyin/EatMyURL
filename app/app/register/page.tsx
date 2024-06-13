"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import register from "@/lib/actions/register";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { SkeletonCard } from "@/components/CardComponents/SkeletonCard";
import { Turnstile } from "@marsidev/react-turnstile";
import { captchaVerify } from "@/lib/actions/captchaVerify";
import { LoadingSpinner } from "@/components/LoadingComponents/LoadingSpinner";
import { HTTP_STATUS } from "@/lib/constants";
import { useRouter } from "next/navigation";



const RegisterPage = () => {
  const [loading, setLoading] = useState(true);
  const [token,setToken] = useState<string>("")
  const site_id = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY || ""
  const router = useRouter();
  const [confirmLoading,setConfirmLoading] = useState(false)

  const registerUser = async (formData: FormData) => {
    // Issue :- Component is not rendering after the below setState
    setConfirmLoading(true)

    const verify = await captchaVerify(token);
    if(verify == 403){
        toast({
          title:"Invalid Captcha",
          description: "Please try again",
          variant:"destructive"
        })
        return;
    }

    const status:number = await register(formData);
    
    if (status == HTTP_STATUS.OK) {
      toast({
        title: "User registered successfully !!",
        description: "Please login to continue",
      });
      redirect("/app/login");
    } else if ( status == HTTP_STATUS.BAD_REQUEST){
      toast({
        title: "Invalid Inputs !!",
        description: "Enter valid email / Password should contains atleast 6 characters",
        variant:"destructive"
      });
    } 
    else if ( status == HTTP_STATUS.NOT_FOUND){
      toast({
        title: "Please enter all fields",
        variant:"destructive"
      });
    } 
    else if (status == HTTP_STATUS.UNAUTHORIZED) {
      toast({
        title: "User already exists !!",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Error while user registration !!",
        variant: "destructive",
      });
    }

    setConfirmLoading(false)
  };

  const { data } = useSession();
  useEffect(() => {
    setLoading(false)
    if (data) {
      toast({ title: "User already logged in" });
      redirect("/app/home");
    }
  }, [data]);

  if (loading)
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <SkeletonCard />
      </div>
    );
  
  return (
    <div className="flex w-full h-screen justify-center items-center px-4">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center text-xl">Register</CardTitle>
          <CardDescription className="text-center text-lg">
            Enter your details to get started
          </CardDescription>
        </CardHeader>
        <form action={registerUser}>
          <CardContent>
          <Label>Name</Label>
            <Input
              name="name"
              className="mb-4"
              placeholder="Enter your name"
            />
            <Label>Email</Label>
            <Input
              name="email"
              className="mb-4"
              placeholder="Enter your email"
            />
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              className="mb-4"
              placeholder="Enter your password"
            />
          </CardContent>
          <CardFooter>
            <div className="flex flex-col items-center w-full">
            <Turnstile onSuccess={(token) => {
              setToken(token)
            }} siteKey={site_id} />
              <Button className="mt-4" disabled={token == ""}>Register</Button>
              <div className="flex mt-5">
            <Label className="text-gray-500">Already have an account?</Label>
            <Label onClick={()=>router.push('/app/login')} className="cursor-pointer underline ml-1 text-gray-500">Login</Label>
            </div>
              {confirmLoading?<LoadingSpinner className="mt-4" size={26}/>:<div></div>}
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
