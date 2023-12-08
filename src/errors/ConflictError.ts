import { constants } from 'http2';
import ErrorMessages from '../types/errors';

class ConflictError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = ErrorMessages.CONFLICT_ERROR;
    this.statusCode = constants.HTTP_STATUS_CONFLICT;
  }
}

export default ConflictError;
