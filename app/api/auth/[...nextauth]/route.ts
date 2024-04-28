import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import getPrisma from "@/lib/services/pg_connect";

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
        const email = credentials?.email;
        const password = credentials?.password;

        try {
          const user: any = await prisma.user.findFirst({
            where: {
              email,
              password,
            },
          });
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
    })
  ],
  secret:process.env.NEXTAUTH_URL,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
