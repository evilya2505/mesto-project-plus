import { Router, Request, Response } from 'express';
import NotFoundError from '../errors/NotFoundError';

const router = Router();
const notFoundError = new NotFoundError('Запрашиваемый ресурс не найден.');

router.all('*', (req: Request, res: Response) => {
  Promise.reject(notFoundError).catch((error) => res
    .status(error.statusCode)
    .send({ message: `${error.name}: ${error.message}` }));
});

export default router;
