import type { ContentfulStatusCode } from "hono/utils/http-status";

class AppError extends Error {
  public isOperational: boolean;
  constructor(
    public error_code: string,
    public error_status_code: ContentfulStatusCode,
    error_message: string,
    public error_details: any,
  ) {
    super(error_message);

    this.isOperational = true;
    Object.setPrototypeOf(this, AppError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default AppError;
