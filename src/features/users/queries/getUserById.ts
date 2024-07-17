import { resolver } from "@blitzjs/rpc";
import { NotFoundError } from "blitz";
import { string, z } from "zod";
import db from "~/db";

const Input = z.object({
  userId: string(),
});

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ userId }) => {
  if (!userId) throw new NotFoundError();

  return db.user.findFirst({
    where: { id: userId },
  });
});
