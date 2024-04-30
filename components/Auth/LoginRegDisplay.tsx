"use client"

import Link  from "next/link";
import { signIn, signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const LoginRegDisplay = ()=>{
    const {status} = useSession();
    const [show,setShow] = useState(false);
    const [loginBtnShow,setLoginBtnShow] = useState(false)
    
    useEffect(()=>{
        if(status != 'loading' && !show) setShow(true)

        if(status == 'unauthenticated' && !loginBtnShow) setLoginBtnShow(true)
        
        if(status == 'authenticated' && loginBtnShow) setLoginBtnShow(false)
    },[status])

    if(!show) return <div></div>

    if(loginBtnShow){
        return <div>
              <Button
                variant="outline"
                onClick={() => signIn()}
                className="mr-2 hidden md:inline-block"
              >
                Login
              </Button>
              <Link href="/register">
              <Button
                variant="outline"
                className="mr-4 hidden md:inline-block"
               >
                Register
              </Button>
              </Link>
            </div>
        }
        else{
            return <div>
            <Button
              variant="outline"
              className="mr-4 hidden md:inline-block"
              onClick={() => signOut()}
            >
              Signout
            </Button>
          </div>
        }
}


export default LoginRegDisplay