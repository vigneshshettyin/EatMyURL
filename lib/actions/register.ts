"use server";

import { getPrisma } from "../services/pg_connect";

const prisma = getPrisma();

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
