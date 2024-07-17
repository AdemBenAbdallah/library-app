import { getDateRange } from "@/utils/utils";
import { resolver } from "@blitzjs/rpc";
import dayjs from "dayjs";
import { z } from "zod";
import db from "~/db";

const Input = z.object({});

const getMonthName = (date: Date) => dayjs(date).format("MMM YY");

export default resolver.pipe(resolver.zod(Input), resolver.authorize("ADMIN"), async (_) => {
  const monthlyRevenuePromises = Array.from({ length: 12 }, (_, i) => {
    const { start, end } = getDateRange("month", i - 11);
    return db.order
      .aggregate({
        _sum: { totalPrice: true },
        where: {
          status: "DELIVERED",
          createdAt: { gte: start, lte: end },
        },
      })
      .then((result) => ({
        date: getMonthName(start),
        Revenue: result._sum.totalPrice || 0,
      }));
  });

  const monthlyRevenue = await Promise.all(monthlyRevenuePromises);
  return monthlyRevenue;
});
