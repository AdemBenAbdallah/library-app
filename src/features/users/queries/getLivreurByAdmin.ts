import { resolver } from "@blitzjs/rpc";
import { z } from "zod";
import db from "~/db";

const Input = z.object({
  search: z.string(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize("ADMIN"),
  async ({ search }, { session: { userId } }) => {
    return await db.user.findMany({
      where: {
        role: "LIVREUR",
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      take: 5,
      orderBy: { name: "asc" },
    });
  },
);
