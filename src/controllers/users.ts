import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/NotFoundError';
import User from '../models/user';
import BadRequestError from '../errors/BadRequestError';
import ConflictError from '../errors/ConflictError';
import UnauthorizedError from '../errors/UnauthorizedError';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const { NODE_ENV, JWT_SECRET } = process.env;

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
      next(err);
    })
    .catch(next);
};

// Создать пользователя
const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const {
        name: userName,
        about: userAbout,
        avatar: userAvatar,
        email: userEmail,
        _id: userID,
      } = user;

      res.send({
        data: {
          name: userName, about: userAbout, avatar: userAvatar, email: userEmail, _id: userID,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы неккоректные данные.');
      } else if (err.name === 'MongoServerError' && err.code === 11000) {
        throw new ConflictError('Пользователь с таким email уже существует.');
      } else {
        next(err);
      }
    })
    .catch(next);
};

// Контроллер получсет из запроса почту и пароль и проверяет их.
const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  let _id: string;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильная почта или пароль.');
      }

      _id = user._id.toString();
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new UnauthorizedError('Неправильная почта или пароль.');
      }

      const secret = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : 'dev-secret';

      const token = jwt.sign({ _id }, secret, { expiresIn: '7d' });

      res.send({ token });
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
      if (err.name === 'ValidationError') {
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
      if (err.name === 'ValidationError') {
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
  login,
};
