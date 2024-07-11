import { resolver } from "@blitzjs/rpc";
import db from "~/db";
import { InputSubscription } from "../schemas";

export default resolver.pipe(
  resolver.zod(InputSubscription),
  resolver.authorize(),
  async ({ userId, startDate, endDate, subscriptionCost }) => {
    if (!startDate || !endDate) return;

    const existingSubscription = await db.subscription.findMany({
      where: {
        AND: [{ endDate: { gt: startDate } }, { user: { id: userId } }],
      },
    });

    if (existingSubscription.length > 0) {
      throw new Error("une souscription existe déjà dans ce intervalle de dates");
    }

    await db.subscription.create({
      data: {
        startDate,
        endDate,
        subscriptionCost,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return "subscription created";
  },
);
