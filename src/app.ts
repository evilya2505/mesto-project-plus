import mongoose from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import type { ErrorRequestHandler } from 'express';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import notExistRouter from './routes/notExist';
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/mestodb');

declare module 'express-serve-static-core' {
  interface User {
    _id: string;
  }

  // eslint-disable-next-line no-shadow, no-unused-vars
  interface Request {
    user: User;
  }
}

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '6573748a527e068a49a15230',
  };

  next();
});
app.use('/users', usersRouter);

app.use('/cards', cardsRouter);

// eslint-disable-next-line no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { name, statusCode = 500, message } = err;

  res.status(statusCode).send({ message: `${name}: ${message}` });
};

app.use(errorHandler);

app.all('*', notExistRouter);

app.listen(PORT);
