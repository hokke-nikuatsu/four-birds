import express from 'express';
import { fetchArticles } from '../controllers/articleController';

const router = express.Router();

router.get('/', fetchArticles);

export default router;
