import { resolver } from "@blitzjs/rpc";
import { z } from "zod";
import db from "~/db";

const Input = z.object({
  productId: z.string(),
  quantity: z.number(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ productId, quantity }, { session: { userId } }) => {
    const existingCartItem = await db.cartItem.findFirst({
      where: {
        product: { id: productId },
        cart: { userId },
      },
    });

    if (existingCartItem) {
      return await db.cartItem.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: { increment: quantity },
        },
      });
    }

    const existingCart = await db.cart.findFirst({
      where: { userId },
    });

    if (existingCart) {
      return await db.cartItem.create({
        data: {
          quantity,
          product: { connect: { id: productId } },
          cart: { connect: { id: existingCart.id } },
        },
      });
    }

    const newCart = await db.cart.create({
      data: {
        user: { connect: { id: userId } },
      },
    });

    await db.cartItem.create({
      data: {
        quantity,
        product: { connect: { id: productId } },
        cart: { connect: { id: newCart.id } },
      },
    });

    return newCart;
  },
);
