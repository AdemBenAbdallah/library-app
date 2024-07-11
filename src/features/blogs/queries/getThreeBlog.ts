import { resolver } from "@blitzjs/rpc";
import db from "db";

export default resolver.pipe(async () => {
  return await db.blog.findMany({ take: 3, orderBy: { createdAt: "desc" } });
});
