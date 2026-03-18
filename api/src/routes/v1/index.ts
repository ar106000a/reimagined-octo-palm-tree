import { Hono } from "hono";
import { salon } from "./Salon_Routes";
export const v1 = new Hono();
v1.route("/salon", salon);
