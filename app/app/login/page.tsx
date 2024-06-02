"use client";

import React, { useEffect } from "react";
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
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { SkeletonCard } from "@/components/CardComponents/SkeletonCard";
import { Turnstile } from '@marsidev/react-turnstile'
import { captchaVerify } from "@/lib/actions/captchaVerify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [token,setToken] = useState<string>("")
  
  const { data } = useSession();
  useEffect(() => {
    if (data) {
      router.push("/app/home");
      toast({ title: "Welcome back!" });
    }
  }, [data, router, toast]);

  useEffect(()=>setLoading(false),[])

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
          <CardTitle className="text-center text-xl">Login</CardTitle>
          <CardDescription className="text-center text-lg">
            Enter your credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label>Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
            placeholder="Enter your email"
          />
          <Label>Password</Label>
          <Input
            value={pass}
            type="password"
            onChange={(e) => setPass(e.target.value)}
            className="mb-4"
            placeholder="Enter your password"
          />
        </CardContent>
        <CardFooter>
        <div className="flex flex-col items-center w-full">
          
        <Turnstile onSuccess={(token) => {
        setToken(token)
      }} siteKey='0x4AAAAAAAbu8T-y1tAsroOZ' />

            <Button disabled={token==""} className="w-32 mt-4"
              onClick={async () => {
                const verify = await captchaVerify(token);

                if(verify == 403){
                    toast({
                      title:"Captcha invalid",
                      description: "Please try again",
                      variant:"destructive"
                    })
                    return;
                }

                const res: any = await signIn("credentials", {
                  email: email,
                  password: pass,
                  redirect: false,
                  token:token
                });
                if (res.status == 200) {
                  toast({
                    title: "User logged in successfully !!",
                  });
                  router.push("/app/home");
                } else {
                  toast({
                    title: "Wrong credentials !!",
                    variant: "destructive",
                  });
                }
              }}
            >
              Login
            </Button> 
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
