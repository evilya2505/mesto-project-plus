import { constants } from 'http2';
import ErrorMessages from '../types/errors';

class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = ErrorMessages.UNAITHORIZED_ERROR;
    this.statusCode = constants.HTTP_STATUS_UNAUTHORIZED;
  }
}

export default UnauthorizedError;