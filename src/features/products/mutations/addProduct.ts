import { resolver } from "@blitzjs/rpc";
import db from "db";
import { InputAddProduct } from "../schema";

export default resolver.pipe(
  resolver.zod(InputAddProduct),
  resolver.authorize("ADMIN"),
  async ({ title, description, price, language, category, author, isbn, productImageKey }) => {
    return await db.product.create({
      data: {
        title,
        description,
        price,
        language,
        category,
        author,
        isbn,
        productImageKey,
      },
    });
  },
);
