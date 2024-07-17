import { resolver } from "@blitzjs/rpc";
import dayjs from "dayjs";
import { z } from "zod";
import db from "~/db";

const Input = z.object({});

const getDateRange = (unit: "month" | "year", subtract = 0) => {
  const start = dayjs().subtract(subtract, unit).startOf(unit).toDate();
  const end = dayjs().subtract(subtract, unit).endOf(unit).toDate();
  return { start, end };
};

export default resolver.pipe(resolver.zod(Input), resolver.authorize("ADMIN"), async (_, { session: { userId } }) => {
  const currentMonth = getDateRange("month");
  const lastMonth = getDateRange("month", 1);

  const [currentMonthRevenue, lastMonthRevenue, newUsersCount, lastMonthUsersCount] = await Promise.all([
    db.order.aggregate({
      _sum: { totalPrice: true },
      where: {
        status: "DELIVERED",
        createdAt: { gte: currentMonth.start, lte: currentMonth.end },
      },
    }),
    db.order.aggregate({
      _sum: { totalPrice: true },
      where: {
        status: "DELIVERED",
        createdAt: { gte: lastMonth.start, lte: lastMonth.end },
      },
    }),
    db.user.count({
      where: { createdAt: { gte: currentMonth.start, lte: currentMonth.end } },
    }),
    db.user.count({
      where: { createdAt: { gte: lastMonth.start, lte: lastMonth.end } },
    }),
  ]);

  const currentRevenue = currentMonthRevenue._sum.totalPrice || 0;
  const lastRevenue = lastMonthRevenue._sum.totalPrice || 0;

  const diffLastMonth = currentRevenue - lastRevenue;
  const diffLastMonthPercentage = lastRevenue ? (diffLastMonth / lastRevenue) * 100 : 0;

  const totalUsersCount = newUsersCount + lastMonthUsersCount;
  const newUsersPercentage = totalUsersCount ? (newUsersCount / totalUsersCount) * 100 : 0;

  return {
    currentMonthRevenue: currentRevenue,
    diffLastMonthPercentage,
    newUsersCount,
    newUsersPercentage,
  };
});
