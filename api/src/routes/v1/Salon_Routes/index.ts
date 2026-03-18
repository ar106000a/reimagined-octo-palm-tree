import { Hono } from "hono";
import { getSalonRoute } from "./getSalonRoute";
export const salon = new Hono();
salon.route("/", getSalonRoute);
