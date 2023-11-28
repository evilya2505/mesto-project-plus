class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'Forbidden';
    this.statusCode = 403;
  }
}

export default ForbiddenError;
