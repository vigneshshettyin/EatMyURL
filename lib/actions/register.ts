"use server";


import bcrypt from "bcrypt";
import PrismaClientManager from "../services/pgConnect";

const prisma = PrismaClientManager.getInstance().getPrismaClient();

const register = async (formData: FormData) => {
  const password: any = formData.get("password");
  const email: any = formData.get("email");

  // check if the user already exists
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });


  if (user) return 403;

  // hashing the password
  const passwordHash = await bcrypt.hash(password, 10);

  // todo add this to UI as well
  // image url is hardcoded for now
  try {
    await prisma.user.create({
      data: {
        password: passwordHash,
        email: email,
        name: "TODO",
        created_at: new Date(),
        imageurl: "https://avatar.iran.liara.run/public",
      },
    });

    return 200;
  } catch (e) {
    return 500
  }
}

export default register;