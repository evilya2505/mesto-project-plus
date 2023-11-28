import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import BadRequestError from '../errors/BadRequestError';
import ConflictError from '../errors/ConflictError';

const NotFoundError = require('../errors/NotFoundError');

// Получить всех пользователей
const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

// Получить пользователя по ID
const getUserById = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError('Пользователь не найден.'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы неккоректные данные.');
      } else {
        next(err);
      }
    })
    .catch(next);
};

// Создать пользователя
const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError('Переданы неккоректные данные.');
      } else if (err.name === 'MongoServerError' && err.code === 11000) {
        throw new ConflictError('Пользователь с таким email уже существует.');
      }
    })
    .catch(next);
};

// Получить информацию о пользователе
const getUserInfo = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail(new NotFoundError('Пользователь с таким id не найден.'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

// Обновить информацию о пользователе
const updateUserInfo = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Пользователь с таким id не найден'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError('Переданы неккоректные данные.');
      } else {
        next(err);
      }
    })
    .catch(next);
};

// Обновление аватара пользователя
const updateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Пользователь с таким id не найден'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError('Переданы неккоректные данные.');
      } else {
        next(err);
      }
    })
    .catch(next);
};

export {
  getUsers,
  getUserById,
  createUser,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
};
