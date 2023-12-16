import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ForbiddenError from '../errors/ForbiddenError';
import UnauthorizedError from '../errors/UnauthorizedError';

const { NODE_ENV, JWT_SECRET } = process.env;

const forbiddenError = new ForbiddenError('Запрос перенаправлен.');
const unauthorizedError = new UnauthorizedError('Необходима авторизация.');

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(forbiddenError);
  }

  if (authorization !== undefined) {
    const token = authorization.replace('Bearer ', '');
    let playload: any;

    try {
      const secret = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : 'dev-secret';

      playload = jwt.verify(token, secret);
    } catch (err) {
      next(unauthorizedError);
    }

    req.user = playload;
  }

  next();
};