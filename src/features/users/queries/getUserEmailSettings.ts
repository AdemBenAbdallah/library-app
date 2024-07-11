import { resolver } from "@blitzjs/rpc";
import { z } from "zod";
import db from "db";

const Input = z.object({});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    return await db.user.findUnique({
      where: { id: userId },
      select: { settingsEmailMarketing: true, settingsEmailProduct: true },
    });
  }
);
