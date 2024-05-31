"use server"

import { getServerSession } from "next-auth";
import { ISessionType } from "@/interfaces/url";
import authOptions from "@/lib/authOptions";
import PrismaClientManager from "@/lib/services/pgConnect";
import { HTTP_STATUS } from "@/lib/constants";

export async function getLinks(pageNumber: string) {
  const posgresInstance = PrismaClientManager.getInstance();
  const prisma = posgresInstance.getPrismaClient();
  const session: ISessionType | null = await getServerSession(authOptions);
  // const searchParams = req.nextUrl.searchParams;

  const page_size = "5";
  const page = pageNumber;

  if (!session?.user) {
    return {
        status: HTTP_STATUS.UNAUTHORIZED
    }
  }

  try {
    const totalLinks = await prisma.links.count({
      where: {
        user: {
          id: parseInt(session.user.sub),
        },
      },
    });
    if (totalLinks === 0) {
      return {
          links: [],
          totalLinks,
          status:HTTP_STATUS.OK
        }
    }

    const total_pages = Math.ceil(totalLinks/Number.parseInt(page_size))

    const links = await prisma.links.findMany({
      where: {
        user: {
          id: parseInt(session.user.sub),
        },
      },
      skip: (parseInt(page) - 1) * parseInt(page_size),
      take: parseInt(page_size),
    });
    return {
        links,
        totalLinks,
        total_pages,
        status: HTTP_STATUS.CREATED
      }
    } 
    catch (e) {
    return {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR
    }
  }
}
