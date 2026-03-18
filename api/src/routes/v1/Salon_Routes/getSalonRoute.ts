import { Hono } from "hono";
import { getSalonController } from "../../../controllers/v1/Salon_controllers/getSalonController";
export const getSalonRoute = new Hono();
getSalonRoute.get("/salon", getSalonController);
