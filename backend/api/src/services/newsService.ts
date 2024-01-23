import { type RowDataPacket, type PoolConnection } from 'mysql2/promise';
import { type DBFetchNews } from '../types/db';
import { type FetchNewsResponse } from '../types/io';
import {
	capitalizeFirstLetter,
	convertToCamelCase,
	convertToJapanTime,
	formatDate,
	splitText,
	trimText,
} from '../utils/common';
import { QUERY_SELECT_ARTICLES } from '../utils/query';

export const fetchNewsList = async (
	connection: PoolConnection,
	offSet: number,
): Promise<FetchNewsResponse> => {
	const result = await connection.query(QUERY_SELECT_ARTICLES, [offSet]);
	const [rows] = result as RowDataPacket[];

	if (!rows) {
		throw new Error('Selection of news list failed.');
	}

	const newsList = rows.map(convertToCamelCase) as DBFetchNews;

	const formattedNewsList = newsList.map((newsItem) => {
		const convertedPublishedDate = convertToJapanTime(newsItem.publishedDate);
		const formattedPublishedDate = formatDate(convertedPublishedDate);
		const trimmedDescription = trimText(newsItem.description);
		const splittedCategories = splitText(newsItem.categories);
		const formattedCategories = capitalizeFirstLetter(splittedCategories);

		return {
			...newsItem,
			description: trimmedDescription,
			publishedDate: formattedPublishedDate,
			categories: formattedCategories,
		};
	});

	return formattedNewsList;
};
