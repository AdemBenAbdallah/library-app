import { resolver } from "@blitzjs/rpc";
import { paginate } from "blitz";
import db, { Prisma } from "db";

interface GetUsersInput extends Pick<Prisma.UserFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize("ADMIN"),
  async ({ where, orderBy, skip = 0, take = 100 }: GetUsersInput) => {
    const {
      items: users,
      pageCount,
      from,
      to,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.user.count({ where }),
      query: (paginateArgs) =>
        db.user.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include: {
            subscriptions: {
              orderBy: { startDate: "desc" },
              select: { startDate: true, endDate: true },
              take: 1,
            },
          },
        }),
    });

    const formatteUsers = users.map((user) => {
      const { subscriptions, ...restUser } = user;
      return Object.assign({}, restUser, {
        lastSubscription: subscriptions.length ? subscriptions[0] : null,
      });
    });

    return {
      users: formatteUsers,
      pageCount,
      from,
      to,
      count,
    };
  },
);
