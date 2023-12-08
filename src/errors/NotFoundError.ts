import StatusCodes from "../types/codes";
import ErrorMessages from "../types/errors";

class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = ErrorMessages.NOT_FOUND_ERROR;
    this.statusCode = StatusCodes.NOT_FOUND_CODE;
  }
}

module.exports = NotFoundError;
// export default NotFoundError;
