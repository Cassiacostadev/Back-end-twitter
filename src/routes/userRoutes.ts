import { Router } from 'express';
import { viewProfile, updateProfile, follow, unfollow } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/:id', viewProfile);
router.put('/me', authMiddleware, updateProfile);
router.post('/:id/follow', authMiddleware, follow);
router.post('/:id/unfollow', authMiddleware, unfollow);

export { router as userRoutes };
