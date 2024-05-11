import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcrypt'
import PrismaClientManager from "./services/pg_connect";

const prisma = PrismaClientManager.getInstance().getPrismaClient();

const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const email = credentials?.email || "";
          const password = credentials?.password || "";
  
          try {
            const user: any = await prisma.user.findFirst({
              where: {
                email:email,
              },
            });
            
            // comparing password hash in database and user entered plain text
            // await bcrypt.compare(plainTextPassword, passwordHash)
            const res = await bcrypt.compare(password, user.password)
  
            if(!res) return null
  
            return {
              id: user.id,
              email: user.email,
            };
          } catch (e) {
            return null;
          }
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
      }
    )
    ],
    secret:process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/login",
    },
    callbacks: {
      async jwt({ token, user }) {
        return { ...token, ...user };
      },
      async session({ session, token, user }) {
        session.user = token as any;
        return session;
      },
    },
  };


export {
    authOptions
}