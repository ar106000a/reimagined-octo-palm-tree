import { z } from "zod";
export const reqBodySchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email adress"),
});

export const salonQuerySchema = z.object({
  // .coerce converts the string "31.5" from the URL into a number 31.5
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  radius: z.coerce.number().default(5000), // distance in meters
  city: z.string().optional(),
  name: z.string().optional(),
  min_rating: z.coerce.number().min(0).max(5).optional(),

  // Boolean filters (Coerced: "true" -> true)
  is_verified: z.coerce.boolean().optional(),
  is_active: z.coerce.boolean().default(true),

  // Array filters (e.g., ?amenities=wifi,ac)
  // We transform the comma-separated string into a real array
  amenities: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",") : undefined)),

  // Pagination
  page: z.coerce.number().int().default(1),
});
// This is the "Gatekeeper"
export const createSalonSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  address: z.string(),
  contactEmail: z.string().email("Invalid email address"),
  slots: z.number().int().positive().default(1),
});

// This automatically creates a TypeScript Type for you!
export type CreateSalonInput = z.infer<typeof createSalonSchema>;
export type ReqBodyInput = z.infer<typeof reqBodySchema>;
export type SalonQueryInput = z.infer<typeof salonQuerySchema>;
