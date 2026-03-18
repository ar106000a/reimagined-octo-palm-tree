import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createSalonSchema } from "./validators/salon.schema.js";
const app = new Hono();
app.get("/", (c) => {
    return c.text("Hello Hono!");
});
app.post("/salons", zValidator("json", createSalonSchema), (c) => {
    // If we reach this line, the data is 100% valid!
    const data = c.req.valid("json");
    console.log(data.name); // TypeScript knows 'name' is a string
    return c.json({
        message: "Salon created successfully!",
        salon: data,
    });
});
serve({
    fetch: app.fetch,
    port: 3001,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
//# sourceMappingURL=index.js.map