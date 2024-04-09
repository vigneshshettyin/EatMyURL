'use server'
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient
type registerReturn = {
    status : Number
}

export async function register (email:string,password:string) {
    try{
        await prisma.user.create({
            data:{
                password,
                email
            }
        })

        return {status:200}
    }
    catch(e){
        return {status:400}
    }
}