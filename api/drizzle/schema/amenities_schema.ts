import { text, integer, pgTable, timestamp } from "drizzle-orm/pg-core";

export const amenities = pgTable("amenities", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull().unique(),
  icon: text("icon"),
  createdAt: timestamp("created_at").defaultNow(),
});
