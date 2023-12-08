import StatusCodes from "../types/codes";
import ErrorMessages from "../types/errors";

class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = ErrorMessages.BAD_REQUEST_ERROR;
    this.statusCode = StatusCodes.BAD_REQUEST_CODE;
  }
}

export default BadRequestError;
