import { type RowDataPacket, type PoolConnection } from 'mysql2/promise';
import { type DBFetchArticles } from '../types/db';
import { type FetchArticlesResponse } from '../types/io';
import {
	capitalizeFirstLetter,
	convertToCamelCase,
	convertToJapanTime,
	formatDate,
	splitText,
	trimText,
} from '../utils/common';
import { QUERY_SELECT_ARTICLES } from '../utils/query';

export const fetchArticles = async (
	connection: PoolConnection,
	offSet: number,
): Promise<FetchArticlesResponse> => {
	try {
		const result = await connection.query(QUERY_SELECT_ARTICLES, [offSet]);
		const [rows] = result as RowDataPacket[];

		if (!rows) {
			throw new Error('Fetching articles failed.');
		}

		const articles = rows.map(convertToCamelCase) as DBFetchArticles;

		const formattedArticles = articles.map((article) => {
			const convertedPublishedDate = convertToJapanTime(article.publishedDate);
			const formattedPublishedDate = formatDate(convertedPublishedDate);
			const trimmedDescription = trimText(article.description);
			const splittedCategories = splitText(article.categories);
			const formattedCategories = capitalizeFirstLetter(splittedCategories);

			return {
				...article,
				description: trimmedDescription,
				publishedDate: formattedPublishedDate,
				categories: formattedCategories,
			};
		});

		return formattedArticles;
	} catch (e) {
		await connection.rollback();

		throw new Error(`Fetch articles failed: ${e}`);
	} finally {
		connection.release();
	}
};
