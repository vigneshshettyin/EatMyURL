'use server'

import { ISessionType } from "@/interfaces/url";
import prisma from "../services/pgConnect"
import { getServerSession } from "next-auth";
import authOptions from "../authOptions";
import bcrypt from 'bcryptjs'
import { HTTP_STATUS } from "../constants";
import z from 'zod'

const nameSchema = z.string().min(1);
const newPassSchema = z.string().min(6);

export async function updateUser(formdata: FormData){
    const name = formdata.get('name') as string
    const confPass = formdata.get('confPass') as string
    let newPass = formdata.get('newPass') as string

    const session: ISessionType | null = await getServerSession(authOptions);
  
    if (!session?.user) {
      return {
        status: HTTP_STATUS.UNAUTHORIZED
      };
    }

    const user:any = await prisma.user.findFirst({
        where:{
            id: parseInt(session.user.sub)
        }
    });

    const res = await bcrypt.compare(confPass, user.password)

    console.log(res)

    if(!res){
        return {
            status: HTTP_STATUS.BAD_REQUEST
        }
    }

    if(!newPass){
        newPass = confPass
    }

    let valid2 = newPassSchema.safeParse(newPass)

    if(!valid2.success){
        return {
            status: HTTP_STATUS.NOT_ACCEPTABLE
        }
    }

    const passwordHash = await bcrypt.hash(newPass, 10);

    try{
        await prisma.user.update({
            where:{
                id: parseInt(session.user.sub)
            },
            data:{
                name: name,
                password:passwordHash
            }
        })

        return {
            status: HTTP_STATUS.OK
        }
    }catch(e){
        return {
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR
        }
    }
}

export async function getUserDetails(){
    const session: ISessionType | null = await getServerSession(authOptions);

    if (!session?.user) {
        return {
          status: HTTP_STATUS.UNAUTHORIZED
        };
      }

    const user = await prisma.user.findFirst({
        where:{
            id: parseInt(session.user.sub)
        }
    });

    return {
        email : user?.email,
        name: user?.name
    }
}