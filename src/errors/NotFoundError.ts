const { constants } = require('http2');
const ErrorMessages = require('../types/errors');

class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = ErrorMessages.NOT_FOUND_ERROR;
    this.statusCode = constants.HTTP_STATUS_NOT_FOUND;
  }
}

module.exports = NotFoundError;
// export default NotFoundError;
