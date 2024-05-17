import { base62_encode } from "@/lib/services/base62";
import { NextRequest } from "next/server";

import incrementCounter from "@/lib/services/counter";
import { getServerSession } from "next-auth";

import { ISessionType } from "@/interfaces/url";
import authOptions from "@/lib/authOptions";
import validateURLCreateReq from "@/lib/validations/url_create";
import PrismaClientManager from "@/lib/services/pgConnect";
import { HTTP_STATUS, RESPONSE } from "@/lib/constants";

export async function POST(req: NextRequest) {
  const posgresInstance = PrismaClientManager.getInstance();
  const prisma = posgresInstance.getPrismaClient();
  const { long_url, status, msg } = await validateURLCreateReq(req);
  const session: ISessionType | null = await getServerSession(authOptions);

  if (!status) {
    return RESPONSE(
      {
        error: "Invalid input",
        more_info: msg,
      },
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (!session?.user) {
    return RESPONSE(
      {
        error: "Unauthorized",
      },
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  const shortIdLength = await incrementCounter();
  const shortId = base62_encode(shortIdLength);

  try {
    await prisma.links.create({
      data: {
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
    return RESPONSE(
      {
        short_url: shortId,
      },
      HTTP_STATUS.CREATED
    );
  } catch (e) {
    return RESPONSE(
      {
        error: "Internal Server Error",
        moreinfo: JSON.stringify(e),
      },
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
}
