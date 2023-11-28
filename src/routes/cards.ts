import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  putLike,
  removeLike,
} from '../controllers/cards';

const router = Router();

// --- Описание основных роутов для карточки ---
router.post('/', createCard);
router.get('/', getCards);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', putLike);
router.delete('/:cardId/likes', removeLike);

export default router;
