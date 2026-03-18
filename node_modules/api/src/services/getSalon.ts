import { db } from "../lib/db"; // Drizzle instance
import { salons } from "../../drizzle/schema"; // Table schema
import { sql } from "drizzle-orm"; // For raw SQL helpers
import type { SalonQueryInput } from "@app/shared/validators/salon.schema";

// Query function: Fetches salons with optional geospatial filter
export async function getSalons(query: SalonQueryInput) {
  let baseQuery = db.select().from(salons).limit(query.limit).$dynamic();

  if (query.lat && query.lng) {
    // SRS: Nearby search
    baseQuery = baseQuery.where(
      sql`ST_DWithin(${salons.location}, ST_MakePoint(${query.lng}, ${query.lat})::geography, 5000)`,
    ); // 5km radius
  }
  if ((await baseQuery).length == 0) {
    return null;
  }
  return await baseQuery; // Returns array of salons (typed from schema)
}
