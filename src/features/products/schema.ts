import { BookCategory } from "@prisma/client";
import { PromiseReturnType } from "blitz";
import { z } from "zod";
import getProductsByAdmin from "./queries/getProductsByAdmin";

const BaseProductSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  price: z.number(),
  language: z.string(),
  category: z.nativeEnum(BookCategory),
  author: z.string().optional(),
  isbn: z.string().optional(),
  productImageKey: z.string().min(3),
});

export const InputAddProduct = BaseProductSchema;
export const InputUpdateProduct = BaseProductSchema.extend({
  id: z.string().uuid(),
});

export type InputAddProductType = z.infer<typeof InputAddProduct>;
export type ProductsType = PromiseReturnType<typeof getProductsByAdmin>;
export type ProductType = ProductsType["products"][number];
