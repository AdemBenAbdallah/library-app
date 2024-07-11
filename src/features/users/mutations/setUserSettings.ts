import { resolver } from "@blitzjs/rpc";
import { z } from "zod";
import db from "db";

const Input = z.object({
  key: z.string(),
  value: z.boolean(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ key, value }, { session: { userId } }) => {
    return db.user.update({
      where: { id: userId },
      data: { [key]: value },
    });
  }
);
