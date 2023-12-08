import { constants } from 'http2';
import ErrorMessages from '../types/errors';

class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = ErrorMessages.FORBIDDENT_ERROR;
    this.statusCode = constants.HTTP_STATUS_FORBIDDEN;
  }
}

export default ForbiddenError;
