import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  PgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { salons } from "./salon.schema";

export const imageProviderEnum = pgEnum("imageProviderEnum", [
  "S3",
  "Cloudinary",
  "Local",
]);
export const salonImages = pgTable(
  "salon_images",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    salonId: integer("salon_id")
      .notNull()
      .references(() => salons.id, { onDelete: "cascade" }),
    imageUrl: text("image_url").notNull(),
    provider: imageProviderEnum("provider").notNull().default("Cloudinary"),
    isCover: boolean("is_cover").default(false),
    displayOrder: integer("display_order").default(0),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("salon_images_salon_idx").on(table.salonId),
    uniqueIndex("salon_images_order_unique").on(
      table.salonId,
      table.displayOrder,
    ),
  ],
);
