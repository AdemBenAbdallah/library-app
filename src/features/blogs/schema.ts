import { PromiseReturnType } from "blitz";
import { z } from "zod";
import getBlogs from "./queries/getBlogs";

const BaseBlogSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(3),
  category: z.string().optional(),
  blogImageKey: z.string().optional(),
});

export const InputAddBlog = BaseBlogSchema;
export const InputUpdateBlog = BaseBlogSchema.extend({
  id: z.string().uuid(),
});

export type InputAddBlogType = z.infer<typeof InputAddBlog>;
export type BlogsType = PromiseReturnType<typeof getBlogs>;
export type BlogType = BlogsType["blogs"][number];
