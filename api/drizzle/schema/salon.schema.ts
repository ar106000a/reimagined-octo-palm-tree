import {
  pgTable,
  serial,
  text,
  boolean,
  customType,
} from "drizzle-orm/pg-core";
const geography = customType<{ data: string }>({
  // Custom for PostGIS (string for coords)
  dataType() {
    return "geography(POINT, 4326)";
  },
});

export const salons = pgTable("salons", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  isActive: boolean("is_active").default(true),
  location: geography("location", { type: "point", srid: 4326 }),
});
