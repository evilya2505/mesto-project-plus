import StatusCodes from "../types/codes";
import ErrorMessages from "../types/errors";

class ConflictError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = ErrorMessages.CONFLICT_ERROR;
    this.statusCode = StatusCodes.CONFLICT_CODE;
  }
}

export default ConflictError;
