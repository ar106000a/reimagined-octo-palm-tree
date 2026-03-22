import {
  boolean,
  index,
  integer,
  pgTable,
  time,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { salons } from "./salon.schema";

export const salonHours = pgTable(
  "salon_hours",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    salonId: uuid("salon_id")
      .references(() => salons.id, {
        onDelete: "cascade",
      })
      .notNull(),
    dayOfWeek: integer("day_of_week").notNull(),
    openTime: time("open_time"),
    closeTime: time("close_time"),
    isClosed: boolean("is_closed").default(false),
  },
  (table) => [
    uniqueIndex("salon_day_unique").on(table.salonId, table.dayOfWeek),
    index("salon_hours_salon_idx").on(table.salonId),
  ],
);
