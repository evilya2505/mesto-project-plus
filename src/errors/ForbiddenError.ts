import StatusCodes from "../types/codes";
import ErrorMessages from "../types/errors";

class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = ErrorMessages.FORBIDDENT_ERROR;
    this.statusCode = StatusCodes.FORBIDDENT_CODE;
  }
}

export default ForbiddenError;
