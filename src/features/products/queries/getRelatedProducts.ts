import { resolver } from "@blitzjs/rpc";
import db, { BookCategory } from "db";
import { z } from "zod";

const Input = z.object({
  category: z.nativeEnum(BookCategory),
});

export default resolver.pipe(resolver.zod(Input), async ({ category }) => {
  const relatedProducts = await db.product.findMany({
    where: {
      category: category,
    },
    take: 5,
  });

  if (relatedProducts.length < 5) {
    const products = await db.product.findMany({
      take: 5 - relatedProducts.length,
    });

    return [...relatedProducts, ...products];
  }
  return relatedProducts;
});
