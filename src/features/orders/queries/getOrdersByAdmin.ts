import { resolver } from "@blitzjs/rpc";
import { paginate } from "blitz";
import db, { Prisma } from "db";

interface GetOrdersInput extends Pick<Prisma.OrderFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(resolver.authorize(), async ({ where, orderBy, skip = 0, take = 100 }: GetOrdersInput) => {
  const {
    items: orders,
    pageCount,
    from,
    to,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.order.count({ where }),
    query: (paginateArgs) => db.order.findMany({ ...paginateArgs, where, orderBy, include: { user: true } }),
  });

  return {
    orders,
    pageCount,
    from,
    to,
    count,
  };
});
