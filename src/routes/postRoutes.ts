import { Router } from 'express';
import { create, getPost, getUserPostsController, getFeed, reply } from '../controllers/postController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, create);
router.get('/:id', getPost);
router.get('/user/:userId', getUserPostsController);
router.get('/feed', authMiddleware, getFeed);
router.post('/:id/reply', authMiddleware, reply);

export { router as postRoutes };
