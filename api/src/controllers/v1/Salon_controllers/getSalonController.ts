import type { Context } from "hono";
import z from "zod";
import { getSalons } from "src/services/getSalon";
import { salonQuerySchema } from "@app/shared/validators/salon.schema";
import AppError from "src/utils/AppError";

export const getSalonController = async (c: Context) => {
  try {
    const query = c.req.query();
    const validatedQuery = salonQuerySchema.parse(query);

    const result = await getSalons(validatedQuery);
    if (result == null) {
      throw new AppError("NOT_FOUND", 404, "No salons Found");
    }
    return c.json(
      {
        success: true,
        message: "Salons fetched",
        data: {
          salons: result,
        },
      },
      200,
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(
        "VALIDATION_ERROR",
        400,
        "Query params not valid",
        error.flatten(),
      );
    }
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Server error", 500, "Internal Server Error", error);
  }
};
