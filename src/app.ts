import mongoose from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import type { ErrorRequestHandler } from 'express';
import { constants } from 'http2';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import notExistRouter from './routes/notExist';
import auth from './middlewares/auth';
import { createUser, login } from './controllers/users';
import { requestLogger, errorLogger } from './middlewares/logger';
import { celebrate, Joi } from 'celebrate';

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

// app.use((req: Request, res: Response, next: NextFunction) => {
//   req.user = {
//     _id: '6573748a527e068a49a15230',
//   };

//   next();
// });

app.use(requestLogger);

// Регистрация и логин
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
}), login);

app.use(auth);

app.use('/users', usersRouter);

app.use('/cards', cardsRouter);

// Подключение логгера ошибок
app.use(errorLogger);

// eslint-disable-next-line no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { name, statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).send({ message: `${name}: ${message}` });
};

app.use(errorHandler);

app.all('*', notExistRouter);

app.listen(PORT);
