import { resolver } from "@blitzjs/rpc";
import { paginate } from "blitz";
import db, { Prisma } from "db";

interface GetBlogsInput extends Pick<Prisma.BlogFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(resolver.authorize(), async ({ where, orderBy, skip = 0, take = 100 }: GetBlogsInput) => {
  const {
    items: blogs,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.blog.count({ where }),
    query: (paginateArgs) => db.blog.findMany({ ...paginateArgs, where, orderBy }),
  });

  return {
    blogs,
    nextPage,
    hasMore,
    count,
  };
});
