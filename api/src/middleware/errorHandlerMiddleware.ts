import FormatError from "../utils/formatError.js";
import AppError from "../utils/AppError.js";
// import type { MiddlewareHandler } from "hono";
import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
export type Env = {
  Bindings: {
    JWT_ACCESS_SECRET: string;
  };
  Variables: {
    user: {
      id: string; // uuid
      email: string;
      username: string;
      password_hash: string; // Sensitive, but present in DB
      first_name: string | null;
      last_name: string | null;
      is_verified: boolean;
      created_at: string; // Timestamps are usually strings (ISO) when fetched
      updated_at: string;
      avatar_url: string | null;
      github_connected: boolean;
      points: number; // bigint maps to number (or string if > 2^53)
      rank: string; // varchar
      is_test_user: boolean;
    };
  };
};
export const errorHandler = async (err: Error, c: Context<Env>) => {
  if (err instanceof AppError) {
    return c.json(
      FormatError(err.error_code, err.error_message, err.error_details),
      err.error_status_code as ContentfulStatusCode,
    );
  }
  console.log(err.stack);
  return c.json(FormatError("SERVER_ERROR", "Internal server error!"), 500);
};
