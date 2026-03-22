import { sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  customType,
  uuid,
  integer,
  numeric,
  jsonb,
  timestamp,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./users.schema";
import {
  salonSubscriptionTier,
  subscriptionTierEnum,
} from "./salon_subscription_tier.schema";
import { table } from "console";
const geography = customType<{ data: string }>({
  // Custom for PostGIS (string for coords)
  dataType() {
    return "geography(POINT, 4326)";
  },
});

export const salons = pgTable(
  "salons",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    ownerId: uuid("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),
    phone: text("phone"),
    email: text("email"),
    addressLine: text("address_line").notNull(),
    city: text("city").notNull(),
    area: text("area"),
    location: geography("location", { type: "point", srid: 4326 }),

    coverImageUrl: text("cover_image_url"),

    isVerified: boolean("is_verified").default(false),
    isActive: boolean("is_active").default(true),

    subscriptionTierId: integer("subscription_tier_id").references(
      () => salonSubscriptionTier.id,
    ),
    avgRating: numeric("avg_rating", { precision: 2, scale: 1 }).default("0"),
    totalReviews: integer("total_reviews").default(0),
    totalBookings: integer("total_bookings").default(0),

    metadata: jsonb("metadata"),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    uniqueIndex("salon_slug_idx").on(table.slug),
    index("salons_owner_idx").on(table.ownerId),
    index("salons_city_idx").on(table.city),
    index("salons_area_idx").on(table.area),
    index("salons_active_idx").on(table.isActive),
    index("salons_verified_idx").on(table.isVerified),
  ],
);
