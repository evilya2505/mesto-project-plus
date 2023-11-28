class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'Bad Request';
    this.statusCode = 400;
  }
}

export default BadRequestError;
