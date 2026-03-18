// /app/api/src/lib/db.ts
// This sets up the Drizzle ORM instance for type-safe DB queries. Import and use in services (e.g., db.select().from(salons)).

import { drizzle } from "drizzle-orm/node-postgres"; // PG driver
import { Pool } from "pg"; // Connection pool
import { env } from "../config/env"; // Your typed env vars
import * as schema from "../../drizzle/schema"; // All schema files (e.g., salons.ts)

const pool = new Pool({
  connectionString: env.DATABASE_URL, // From .env or process.env
  max: 20, // Optional: Pool size for concurrency (adjust for prod)
  idleTimeoutMillis: 30000, // Optional: Close idle connections
  connectionTimeoutMillis: 2000, // Optional: Timeout for new connections
});

export const db = drizzle(pool, { schema }); // Exported instance – use db.query, db.select, etc.
