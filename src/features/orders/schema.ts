import { PromiseReturnType } from "blitz";
import getOrders from "./queries/getOrders";

export type OrdersType = PromiseReturnType<typeof getOrders>;
