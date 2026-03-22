import {
  pgTable,
  timestamp,
  integer,
  numeric,
  pgEnum,
} from "drizzle-orm/pg-core";

export const subscriptionTierEnum = pgEnum("subscriptionTierEnum", [
  "Free",
  "Silver",
  "Gold",
  "Platinum",
]);

export const salonSubscriptionTier = pgTable("salon_subscription_tier", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  subscription: subscriptionTierEnum("subscription").notNull().unique(),
  price: numeric("price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
