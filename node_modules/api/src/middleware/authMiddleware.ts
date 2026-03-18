import type { Context, MiddlewareHandler } from "hono";

import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import { getCookie } from "hono/cookie";
import type { Env } from "@projects/types";

export const authMiddleware: MiddlewareHandler<Env> = async (
  c: Context<Env>,
  next: () => Promise<void>,
) => {
  try {
    const accessToken = getCookie(c, "accessToken");

    if (!accessToken) {
      throw new AppError(
        "VALIDATION_ERROR",
        403,
        "Access token is not present",
        null,
      );
    }
    let decoded;
    try {
      decoded = jwt.verify(accessToken, c.env.JWT_ACCESS_SECRET, {
        algorithms: ["HS256"],
      });
    } catch (err: any) {
      // Logic for specific JWT errors
      const message =
        err.name === "TokenExpiredError" ? "Expired token" : "Invalid token";
      throw new AppError("VALIDATION_ERROR", 401, message, err);
    }
    c.set("user", decoded as Env["Variables"]["user"]);
    await next();
  } catch (err) {
    if (err instanceof AppError) {
      throw err; // Pass the AppError directly to the error handler
    }
    // For unexpected errors, create a new AppError with a generic message

    new AppError("SERVER_ERROR", 500, "Internal server error", err);
  }
};
