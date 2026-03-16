import { z } from "zod";
export const reqBodySchema = z.object({
  name: z.string(),
  email: z.email("Invalid email adress"),
});

// This is the "Gatekeeper"
export const createSalonSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  address: z.string(),
  contactEmail: z.email("Invalid email address"),
  slots: z.number().int().positive().default(1),
});

// This automatically creates a TypeScript Type for you!
export type CreateSalonInput = z.infer<typeof createSalonSchema>;
export type ReqBodyInput = z.infer<typeof reqBodySchema>;
