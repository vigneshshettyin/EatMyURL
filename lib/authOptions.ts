import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import getPrisma from "@/lib/services/pg_connect";
import bcrypt from 'bcrypt'

const prisma = getPrisma();

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
  
          const passwordHash = await bcrypt.hash(password, 10);
  
          try {
            const user: any = await prisma.user.findFirst({
              where: {
                email:email,
              },
            });
  
            const res = await bcrypt.compare(password, passwordHash)
  
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