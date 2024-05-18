import { base62_encode } from "@/lib/services/base62";
import { NextRequest } from "next/server";

import incrementCounter from "@/lib/services/counter";
import { getServerSession } from "next-auth";

import { ISessionType } from "@/interfaces/url";
import authOptions from "@/lib/authOptions";
import validateURLCreateReq from "@/lib/validations/url_create";
import PrismaClientManager from "@/lib/services/pgConnect";
import { HTTP_STATUS } from "@/lib/constants";

export async function createPrivateLink(formdata : FormData) {

  const posgresInstance = PrismaClientManager.getInstance();
  const prisma = posgresInstance.getPrismaClient();
  const { title,long_url, status, msg } =  validateURLCreateReq(formdata);
  const session: ISessionType | null = await getServerSession(authOptions);

  if (!status) {
    return {
        status: HTTP_STATUS.BAD_REQUEST
      }
  }

  if (!session?.user) {
    return {
        status: HTTP_STATUS.UNAUTHORIZED
      }
  }

  const shortIdLength = await incrementCounter();
  const shortId = base62_encode(shortIdLength);

  try {
    await prisma.links.create({
      data: {
        title : title as string,
        long_url: long_url as string,
        short_code: shortId,
        created_at: new Date(),
        user: {
          connect: {
            id: parseInt(session.user.sub),
          },
        },
      },
    });
    return {
        short_url: shortId,
        status: HTTP_STATUS.CREATED
      }

  } catch (e) {
    return {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR
      }
      
  }
}
