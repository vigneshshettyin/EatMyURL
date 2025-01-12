import { prisma } from "../connection/prisma";

export const fetchAnalyticsByOption = async (option: string, code: string) => {
  const totalVisits = await prisma.clickAnalytics.count({ where: { code } });

  const groupedData = await prisma.clickAnalytics.groupBy({
    // @ts-ignore
    by: [option] as any,
    where: { code },
    _count: { id: true },
  });

  return {
    totalVisits,
    breakdown: groupedData.map((data) => ({
      [option]: data[option],
      count: data._count.id,
      percentage: ((data._count.id / totalVisits) * 100).toFixed(2),
    })),
  };
};

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
