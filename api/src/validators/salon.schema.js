import { z } from 'zod';
// This is the "Gatekeeper"
export const createSalonSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    address: z.string(),
    contactEmail: z.email("Invalid email address"),
    slots: z.number().int().positive().default(1),
});
//# sourceMappingURL=salon.schema.js.map