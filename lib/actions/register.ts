"use server";

import bcrypt from "bcrypt";
import prisma from "../services/pgConnect";
import { HTTP_STATUS } from "../constants";
import z from 'zod'

const emailValid = z.string().email()
const passwordValid = z.string().min(6)


const register = async (formData: FormData) => {
  const password: string = formData.get("password") as string;
  const email: string = formData.get("email") as string;
  const name: string = formData.get("name") as string;
  const emailRes = emailValid.safeParse(email)
  const passwordRes = passwordValid.safeParse(password)

  if(!emailRes.success || !passwordRes.success) return HTTP_STATUS.BAD_REQUEST
  
  if(!password || !email || !name)
      return HTTP_STATUS.NOT_FOUND;

  // check if the user already exists
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });


  if (user) return HTTP_STATUS.UNAUTHORIZED;

  // hashing the password
  const passwordHash = await bcrypt.hash(password, 10);

  // todo add this to UI as well
  // image url is hardcoded for now
  try {
    await prisma.user.create({
      data: {
        password: passwordHash,
        email: email,
        name: name,
        created_at: new Date(),
        imageurl: "https://avatar.iran.liara.run/public",
      },
    });

    return HTTP_STATUS.OK;
  } catch (e) {
    return HTTP_STATUS.INTERNAL_SERVER_ERROR;
  }
}

export default register;