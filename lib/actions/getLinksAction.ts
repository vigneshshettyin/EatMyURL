"use server"

import { getServerSession } from "next-auth";
import { ISessionType } from "@/interfaces/url";
import authOptions from "@/lib/authOptions";
import PrismaClientManager from "@/lib/services/pgConnect";
import { HTTP_STATUS } from "@/lib/constants";
const prisma = PrismaClientManager.getInstance().getPrismaClient();

export async function getLinks(pageNumber: string) {
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
      include: {
        _count : {
          select: {
            click_analytics: true
          }
        }
      }
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

export async function getLinkDetails(linkId:string){
  const session: ISessionType | null = await getServerSession(authOptions);

  if (!session?.user) {
    return {
        link : {},
        status: HTTP_STATUS.UNAUTHORIZED
    }
  }

  const regex = /^\d+$/;

  function isValidNumber(str:string) {
    return regex.test(str);
  }

  if(!isValidNumber(linkId)){
    return {
      link : {},
      status: HTTP_STATUS.NOT_FOUND
    }
  }

  const link = await prisma.links.findFirst({
      where:{
        id : Number.parseInt(linkId),
        user_id : parseInt(session.user.sub)
      },
      include: {
        _count: {
          select: {
            click_analytics: true
          }
        }
      }
  })

  if(!link){
      return {
        link : {},
        status: HTTP_STATUS.NOT_FOUND
      }
  }

  return {status:HTTP_STATUS.OK,link};
} 

export const lastSevenDaysAnalytics = async (code: string) => {
  const todayDate = new Date();
  const sevenDaysAgo = new Date(todayDate);
  sevenDaysAgo.setDate(todayDate.getDate() - 7);

  const lastWeekStartDate = new Date(sevenDaysAgo);
  lastWeekStartDate.setDate(lastWeekStartDate.getDate() - 7);
  const lastWeekEndDate = new Date(sevenDaysAgo);

  const [thisWeekCount, lastWeekCount] = await Promise.all([
    prisma.clickAnalytics.count({
      where: {
        code,
        timestamp: {
          gte: sevenDaysAgo,
          lte: todayDate,
        },
      },
    }),
    prisma.clickAnalytics.count({
      where: {
        code,
        timestamp: {
          gte: lastWeekStartDate,
          lte: lastWeekEndDate,
        },
      },
    }),
  ]);

  const percentageChange =
    lastWeekCount !== 0
      ? ((thisWeekCount - lastWeekCount) / lastWeekCount) * 100
      : thisWeekCount !== 0
      ? 100
      : 0;

  return {
    totalVisitsThisWeek: thisWeekCount,
    totalVisitsLastWeek: lastWeekCount,
    percentageChange,
  };
};