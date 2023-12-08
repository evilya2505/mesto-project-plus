import { constants } from 'http2';
import ErrorMessages from '../types/errors';

class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = ErrorMessages.NOT_FOUND_ERROR;
    this.statusCode = constants.HTTP_STATUS_NOT_FOUND;
  }
}

export default NotFoundError;
