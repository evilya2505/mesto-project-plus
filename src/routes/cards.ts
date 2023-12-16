import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  putLike,
  removeLike,
} from '../controllers/cards';
import { celebrate, Joi } from 'celebrate';

const router = Router();

// --- Описание основных роутов для карточки ---
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^https?:\/\/((www\.)?[\w-]+\.\w{2,6})\/?/),
  }),
}), createCard);
router.get('/', getCards);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), deleteCard);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), putLike);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), removeLike);

export default router;
