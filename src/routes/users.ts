import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUserAvatar,
  updateUserInfo,
  getUserInfo,
} from '../controllers/users';

const router = Router();

// --- Описание основных роутов для пользователя ---
router.get('/me', getUserInfo);
router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUserById);
router.patch('/me/avatar', updateUserAvatar);
router.patch('/me', updateUserInfo);

export default router;
