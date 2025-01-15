"use server";

import { getServerSession } from "next-auth";
import { ISessionType } from "@/interfaces/url";
import authOptions from "@/lib/authOptions";
import prisma from "@/lib/services/pgConnect";
import { HTTP_STATUS } from "@/lib/constants";

export async function getLinks(pageNumber: string) {
  const session: ISessionType | null = await getServerSession(authOptions);

  const page_size = 5; // Ensure this is a number for safer operations
  const page = parseInt(pageNumber, 10);

  if (!session?.user) {
    return {
      status: HTTP_STATUS.UNAUTHORIZED,
    };
  }

  try {
    const userId = parseInt(session.user.sub, 10);

    // Count total links for the user
    const totalLinks = await prisma.links.count({
      where: {
        user_id: userId,
      },
    });

    // Handle case where no links are present
    if (totalLinks === 0) {
      return {
        links: [],
        totalLinks,
        total_pages: 0,
        status: HTTP_STATUS.OK,
      };
    }

    // Calculate total pages
    const total_pages = Math.ceil(totalLinks / page_size);

    // Fetch links with pagination and click analytics count
    const links = await prisma.links.findMany({
      where: {
        user_id: userId,
      },
      skip: (page - 1) * page_size,
      take: page_size,
      include: {
        _count: {
          select: {
            click_analytics: true,
          },
        },
      },
    });

    return {
      links,
      totalLinks,
      total_pages,
      status: HTTP_STATUS.OK, // Use HTTP 200 for successful retrieval
    };
  } catch (error) {
    console.error("Error fetching links:", error);
    return {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
}

export async function getLinkDetailsWithAnalytics(linkId: string) {
  const session: ISessionType | null = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      link: {},
      analytics: {},
      status: HTTP_STATUS.UNAUTHORIZED,
    };
  }

  const regex = /^\d+$/;

  function isValidNumber(str: string) {
    return regex.test(str);
  }

  if (!isValidNumber(linkId)) {
    return {
      link: {},
      analytics: {},
      status: HTTP_STATUS.NOT_FOUND,
    };
  }

  const userId = parseInt(session.user.sub, 10);
  const link = await prisma.links.findFirst({
    where: {
      id: parseInt(linkId, 10),
      user_id: userId,
    },
    include: {
      _count: {
        select: {
          click_analytics: true,
        },
      },
    },
  });

  if (!link) {
    return {
      link: {},
      analytics: {},
      status: HTTP_STATUS.NOT_FOUND,
    };
  }

  const todayDate = new Date();
  const sevenDaysAgo = new Date(todayDate);
  sevenDaysAgo.setDate(todayDate.getDate() - 7);

  const lastWeekStartDate = new Date(sevenDaysAgo);
  lastWeekStartDate.setDate(lastWeekStartDate.getDate() - 7);
  const lastWeekEndDate = new Date(sevenDaysAgo);

  const [thisWeekCount, lastWeekCount] = await Promise.all([
    prisma.clickAnalytics.count({
      where: {
        code: link.short_code,
        timestamp: {
          gte: sevenDaysAgo,
          lte: todayDate,
        },
      },
    }),
    prisma.clickAnalytics.count({
      where: {
        code: link.short_code,
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

  // Fetch analytics for devices, OS, browsers, cities, and countries
  const [deviceData, osData, browserData, cityData, locationData] = await Promise.all([
    prisma.clickAnalytics.groupBy({
      // @ts-ignore
      by: ["device"],
      where: { code: link.short_code },
      _count: { id: true },
    }),
    prisma.clickAnalytics.groupBy({
      // @ts-ignore
      by: ["os"],
      where: { code: link.short_code },
      _count: { id: true },
    }),
    prisma.clickAnalytics.groupBy({
      // @ts-ignore
      by: ["browser"],
      where: { code: link.short_code },
      _count: { id: true },
    }),
    prisma.clickAnalytics.groupBy({
      // @ts-ignore
      by: ["city"],
      where: { code: link.short_code },
      _count: { id: true },
    }),
    prisma.clickAnalytics.groupBy({
      // @ts-ignore
      by: ["country"],
      where: { code: link.short_code },
      _count: { id: true },
    }),
  ]);

  // Convert data to the desired format
  const devices = deviceData.map((data) => ({
    device: data.device,
    engagements: data._count.id,
  }));

  const os = osData.map((data) => ({
    os: data.os,
    engagements: data._count.id,
  }));

  const browsers = browserData.map((data) => ({
    browser: data.browser,
    engagements: data._count.id,
  }));

  const cities = cityData.map((data) => ({
    city: data.city,
    engagements: data._count.id,
  }));

  const totalCountryVisits = locationData.reduce((acc, data) => acc + data._count.id, 0);
  const locations = locationData.map((data, index) => ({
    id: index + 1,
    country: data.country,
    engagements: data._count.id,
    percentage: ((data._count.id / totalCountryVisits) * 100).toFixed(2),
  }));

  const analytics = {
    totalVisitsThisWeek: thisWeekCount,
    totalVisitsLastWeek: lastWeekCount,
    percentageChange,
    devices,
    os,
    browsers,
    cities,
    locations,
  };

  return {
    status: HTTP_STATUS.OK,
    link,
    analytics,
  };
}

