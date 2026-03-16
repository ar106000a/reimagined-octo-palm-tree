import { z } from 'zod';
export declare const createSalonSchema: z.ZodObject<{
    name: z.ZodString;
    address: z.ZodString;
    contactEmail: z.ZodEmail;
    slots: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
export type CreateSalonInput = z.infer<typeof createSalonSchema>;
//# sourceMappingURL=salon.schema.d.ts.map