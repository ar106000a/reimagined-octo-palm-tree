// // packages/env/index.ts
// export const env = {
//   ACCESS_SECRET_KEY: "MYACCESSSECRET",
//   NODE_ENV: "development",
//   DATABASE_URL: process.env.DATABASE_URL || "",
// };
// /app/api/src/config/env.ts
// This validates and types your environment variables (process.env) using Zod. It ensures required vars (e.g., DATABASE_URL) are set correctly at runtime, throwing errors if missing/invalid. Import and use in files like db.ts.

import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(), // Validates as URL (e.g., postgres://...)

  ACCESS_SECRET_KEY: z.string(),
  NODE_ENV: z.string(),
  // Add more (e.g., REDIS_URL: z.string().url() for SRS caching)
});

export const env = envSchema.parse(process.env); // Parses and validates – crashes if invalid
