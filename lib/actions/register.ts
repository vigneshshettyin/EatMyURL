"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function register(formData: FormData) {
  const password: any = formData.get("password");
  const email: any = formData.get("email");

  try {
    await prisma.user.create({
      data: {
        password,
        email,
      },
    });

    return true;
  } catch (e) {
    return false;
  }
}
