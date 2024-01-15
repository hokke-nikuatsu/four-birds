import express from 'express';
import { fetchNewsList } from '../controllers/newsController';

const router = express.Router();

router.get('/', fetchNewsList);

export default router;
