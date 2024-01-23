import { type Request, type Response } from 'express';
import { fetchNewsList as fetchNewsListService } from '../services/newsService';
import { dbConnection } from '../shared/db/connection';
import {
	type FetchNewsResponse,
	type FetchNewsRequest,
	type ApiResponse,
	STATUS,
} from '../types/io';

export const fetchNewsList = async (
	req: Request<FetchNewsRequest>,
	res: Response<ApiResponse<FetchNewsResponse>>,
) => {
	try {
		const offset = req.query.offset;

		if (!offset || typeof offset !== 'string') {
			throw new Error(`Request parameter is invalid.`);
		}

		const parsedOffset = parseInt(offset);
		const connection = await dbConnection();

		const newsList = await fetchNewsListService(connection, parsedOffset);

		res.json({ status: STATUS.SUCCESS, data: newsList });
	} catch (e) {
		console.error(e);

		if (e instanceof Error) {
			res.status(500).send({ status: STATUS.ERROR, message: e.message });
		} else {
			res.status(500).send({ status: STATUS.ERROR, message: 'Unknown error.' });
		}
	}
};
