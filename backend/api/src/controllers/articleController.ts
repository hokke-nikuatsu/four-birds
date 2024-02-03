import { type Request, type Response } from 'express';
import { fetchArticles as fetchArticlesService } from '../services/articleService';
import { dbConnection } from '../shared/db/connection';
import {
	type FetchArticlesResponse,
	type FetchArticlesRequest,
	type ApiResponse,
	STATUS,
} from '../types/io';

export const fetchArticles = async (
	req: Request<FetchArticlesRequest>,
	res: Response<ApiResponse<FetchArticlesResponse>>,
) => {
	try {
		const offset = req.query.offset;

		if (!offset || typeof offset !== 'string') {
			throw new Error(`Request parameter is invalid.`);
		}

		const parsedOffset = parseInt(offset);
		const connection = await dbConnection();

		const articles = await fetchArticlesService(connection, parsedOffset);

		res.json({ status: STATUS.SUCCESS, data: articles });
	} catch (e) {
		console.error(e);

		if (e instanceof Error) {
			res.status(500).send({ status: STATUS.ERROR, message: e.message });
		} else {
			res.status(500).send({ status: STATUS.ERROR, message: 'Unknown error.' });
		}
	}
};
