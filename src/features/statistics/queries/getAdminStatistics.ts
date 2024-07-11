import { resolver } from "@blitzjs/rpc";
import dayjs from "dayjs";
import db from "~/db";

export default resolver.pipe(resolver.authorize("ADMIN"), async () => {
  const getDateRange = (unit, subtract = 0) => {
    const start = dayjs().subtract(subtract, unit).startOf(unit).toDate();
    const end = dayjs().subtract(subtract, unit).endOf(unit).toDate();
    return { start, end };
  };

  const currentYear = getDateRange("year");
  const lastYear = getDateRange("year", 1);

  const currentMonth = getDateRange("month");
  const lastMonth = getDateRange("month", 1);

  const calculateProgress = (current, previous) => {
    if (previous === 0) return current === 0 ? 0 : 100;
    return ((current - previous) / previous) * 100;
  };

  const [yearRevenue, lastYearRevenue, monthlyRevenue, lastMonthRevenue, newUsersCount, lastMonthUsersCount] =
    await Promise.all([
      db.subscription.aggregate({
        _sum: { subscriptionCost: true },
        where: { startDate: { gte: currentYear.start, lte: currentYear.end } },
      }),
      db.subscription.aggregate({
        _sum: { subscriptionCost: true },
        where: { startDate: { gte: lastYear.start, lte: lastYear.end } },
      }),
      db.subscription.aggregate({
        _sum: { subscriptionCost: true },
        where: { startDate: { gte: currentMonth.start, lte: currentMonth.end } },
      }),
      db.subscription.aggregate({
        _sum: { subscriptionCost: true },
        where: { startDate: { gte: lastMonth.start, lte: lastMonth.end } },
      }),
      db.user.count({
        where: { createdAt: { gte: currentMonth.start, lte: currentMonth.end } },
      }),
      db.user.count({
        where: { createdAt: { gte: lastMonth.start, lte: lastMonth.end } },
      }),
    ]);

  const yearRevenueValue = yearRevenue._sum.subscriptionCost || 0;
  const lastYearRevenueValue = lastYearRevenue._sum.subscriptionCost || 0;

  const monthlyRevenueValue = monthlyRevenue._sum.subscriptionCost || 0;
  const lastMonthRevenueValue = lastMonthRevenue._sum.subscriptionCost || 0;

  return {
    yearRevenue: {
      value: yearRevenueValue,
      progress: calculateProgress(yearRevenueValue, lastYearRevenueValue),
      up: yearRevenueValue > lastYearRevenueValue,
    },
    monthlyRevenue: {
      value: monthlyRevenueValue,
      progress: calculateProgress(monthlyRevenueValue, lastMonthRevenueValue),
      up: monthlyRevenueValue > lastMonthRevenueValue,
    },
    newUsersCount: {
      value: newUsersCount,
      progress: calculateProgress(newUsersCount, lastMonthUsersCount),
      up: newUsersCount > lastMonthUsersCount,
    },
  };
});
