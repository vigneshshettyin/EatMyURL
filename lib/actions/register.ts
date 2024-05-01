"use server";

import getPrisma from "../services/pg_connect";
import bcrypt from 'bcrypt'

const prisma = getPrisma();

export async function register(formData: FormData) {
  const password: any = formData.get("password");
  const email: any = formData.get("email");

  // check if the user already exists  
  const user = await prisma.user.findFirst({
    where:{
      email
    }
  })

  console.log(user)

  if(user) return 403;
  
  // hashing the password
  const passwordHash = await bcrypt.hash(password, 10);

  // todo add this to UI as well
  // image url is hardcoded for now
  try {
    let obj = await prisma.user.create({
      data: {
        password:passwordHash,
        email:email,
        name:'TODO',
        imageurl:'https://avatar.iran.liara.run/public',
      },
    });

    console.log(obj);

    return 200;
  } catch (e) {
    console.log(e);
    return 500;
  }
}
