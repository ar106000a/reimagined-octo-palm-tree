import { db } from "../lib/db"; // Drizzle instance
import { salons } from "../../drizzle/schema"; // Table schema
import { and, eq, ilike, sql } from "drizzle-orm"; // For raw SQL helpers
import type { SalonQueryInput } from "@app/shared/validators/salon.schema";

// Query function: Fetches salons with optional geospatial filter
export async function getSalons(query: SalonQueryInput) {
  let baseQuery = db.select().from(salons).limit(query.limit).$dynamic();

  let conditions = [];
  if (query.name) {
    conditions.push(ilike(salons.name, `%${query.name}%`));
  }
  if (query.city) {
    conditions.push(eq(salons.city, `${query.city}`));
  }
  if (query.amenities) {
    conditions.push(sql`${salons.amenities} @> ${query.amenities}`);
  }
  if (query.lat && query.lng) {
    // SRS: Nearby search
    baseQuery = baseQuery.where(
      sql`ST_DWithin(${salons.location}, ST_MakePoint(${query.lng}, ${query.lat})::geography, 5000)`,
    ); // 5km radius
  }
  conditions.push(eq(salons.isActive, query.is_active ?? true));
  baseQuery = baseQuery.where(and(...conditions)).limit(query.limit || 10);
  return await baseQuery; // Returns array of salons (typed from schema)
}
