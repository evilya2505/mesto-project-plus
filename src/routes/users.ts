import { Router } from 'express';
import {
  getUsers,
  getUserById,
  // createUser,
  updateUserAvatar,
  updateUserInfo,
  getUserInfo,
  // login,
} from '../controllers/users';
import { celebrate, Joi } from 'celebrate';

const router = Router();

// --- Описание основных роутов для пользователя ---
router.get('/me', getUserInfo);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUserInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^https?:\/\/((www\.)?[\w-]+\.\w{2,6})\/?/),
  }),
}), updateUserAvatar);
export default router;
