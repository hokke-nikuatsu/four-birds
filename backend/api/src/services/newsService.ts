import { type RowDataPacket, type PoolConnection } from 'mysql2/promise';
import { type FetchNewsResponse } from 'types/io';
import { convertToCamelCase } from '../utils/common';
import { QUERY_SELECT_ARTICLES } from '../utils/query';

export const fetchNewsList = async (
	connection: PoolConnection,
): Promise<FetchNewsResponse[]> => {
	const result = await connection.query(QUERY_SELECT_ARTICLES);
	const [rows] = result as RowDataPacket[];

	if (!rows) {
		throw new Error('Selection of news list failed.');
	}

	const newsList = rows.map(convertToCamelCase) as FetchNewsResponse[];

	return newsList;
};
