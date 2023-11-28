class ConflictError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'Conflict';
    this.statusCode = 409;
  }
}

export default ConflictError;
