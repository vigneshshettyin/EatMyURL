import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions = {
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials:{
            email: { label: "Email", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials,req){
            const email = credentials?.email;
            const password = credentials?.password;
            
            try{
              const user:any = await prisma.user.findFirst({
                where:{
                  email,
                  password
                }
              })
              return {
                id: user.id,
                email: user.email
              }
              }
              catch(e){
                  return null
              }
          }
    })
  ],

  pages:{
    signIn : '/signin'
  }
}

const handler = NextAuth(authOptions)

export const GET = handler
export const POST = handler