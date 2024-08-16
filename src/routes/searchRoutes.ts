import { Router } from 'express';
import { searchForUsers, searchForPosts, searchForHashtags } from '../controllers/searchController';

const router = Router();

router.get('/users', searchForUsers);
router.get('/posts', searchForPosts);
router.get('/hashtags', searchForHashtags);

export { router as searchRoutes };
