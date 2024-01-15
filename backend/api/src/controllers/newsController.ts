import { type Request, type Response } from 'express';
import { fetchNewsList as fetchNewsListService } from '../services/newsService';
import { dbConnection } from '../shared/db/connection';

export const fetchNewsList = async (_req: Request, res: Response) => {
	try {
		const connection = await dbConnection();

		const newsList = await fetchNewsListService(connection);

		res.json(newsList);
	} catch (e) {
		res.status(500).send(e);
	}
};
