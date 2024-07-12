import { resolver } from "@blitzjs/rpc";
import { paginate } from "blitz";
import db, { Prisma } from "db";

interface GetProductsInput extends Pick<Prisma.ProductFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetProductsInput) => {
    const {
      items: blogs,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.product.count({ where }),
      query: (paginateArgs) => db.product.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      blogs,
      nextPage,
      hasMore,
      count,
    };
  },
);
