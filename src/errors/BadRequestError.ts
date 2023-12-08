import { constants } from 'http2';
import ErrorMessages from '../types/errors';

class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = ErrorMessages.BAD_REQUEST_ERROR;
    this.statusCode = constants.HTTP_STATUS_BAD_REQUEST;
  }
}

export default BadRequestError;
