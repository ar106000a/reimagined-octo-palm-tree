import { pgTable, uuid, integer, primaryKey } from "drizzle-orm/pg-core";
import { salons } from "./salon.schema";
import { amenities } from "./amenities_schema";

export const salonAmenities = pgTable(
  "salon_amenities",
  {
    salonId: uuid("salon_id")
      .notNull()
      .references(() => salons.id, { onDelete: "cascade" }),
    amenityId: integer("amenity_id")
      .notNull()
      .references(() => amenities.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.salonId, table.amenityId] })],
);
