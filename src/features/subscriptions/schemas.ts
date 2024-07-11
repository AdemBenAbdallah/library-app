import { date, number, string, z } from "zod";

export const InputSubscription = z.object({
  startDate: date(),
  endDate: date(),
  subscriptionCost: number(),
  userId: string().min(1),
});

export type InputSubscriptionType = z.infer<Omit<typeof InputSubscription, "userId">>;
