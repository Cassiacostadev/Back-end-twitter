import { Router } from 'express';
import { like, unlike } from '../controllers/likeController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/:id/like', authMiddleware, like);
router.post('/:id/unlike', authMiddleware, unlike);

export { router as likeRoutes };
