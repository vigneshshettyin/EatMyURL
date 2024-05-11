import { base62_encode } from "@/lib/services/base62";
import { NextRequest } from "next/server";

import incrementCounter from "@/lib/services/counter";
import { getServerSession } from "next-auth";

import { ISessionType } from "@/interfaces/url";
import authOptions from "@/lib/authOptions";
import ValidateURLCreateReq from "@/lib/validations/url_create";
import PrismaClientManager from "@/lib/services/pg_connect";

export async function POST(req: NextRequest) {
  const posgresInstance = PrismaClientManager.getInstance();
  const prisma = posgresInstance.getPrismaClient();
  const { long_url, status, msg } = await ValidateURLCreateReq(req);
  const session: ISessionType | null = await getServerSession(authOptions);

  if (!status) {
    return Response.json(
      {
        error: "Invalid input",
        moreinfo: msg,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      }
    );
  }

  if (!session?.user) {
    return Response.json(
      {
        error: "Unauthorized",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 401,
      }
    );
  }

  const short_id_length = await incrementCounter();
  const short_id = base62_encode(short_id_length);

  try {
    await prisma.links.create({
      data: {
        long_url: long_url as string,
        short_code: short_id,
        created_at: new Date(),
        user: {
          connect: {
            id: parseInt(session.user.sub),
          },
        },
      },
    });
    return Response.json(
      {
        short_url: short_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 201,
      }
    );
  } catch (e) {
    return Response.json(
      {
        error: "Internal Server Error",
        msg: JSON.stringify(e),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
}
