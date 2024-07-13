import { PromiseReturnType } from "blitz";
import getCart from "./queries/getCart";

export type CartItemsType = PromiseReturnType<typeof getCart>;
