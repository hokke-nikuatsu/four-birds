import { dbConnection } from './connection';
import { type DBInsertArticleFetchLog } from '../../types/db';
import { QUERY_INSERT_FETCH_ARTICLES_LOG } from '../../utils/db';

export const fetchArticlesLog = async (
	articleCount: number,
	status: DBInsertArticleFetchLog['status'],
): Promise<void> => {
	const now = new Date();
	const articleFetchLogData: DBInsertArticleFetchLog = {
		executedDate: now,
		articleCount,
		status,
		createdAt: now,
	};

	const connection = await dbConnection();

	await connection.query(
		QUERY_INSERT_FETCH_ARTICLES_LOG,
		Object.values(articleFetchLogData),
	);
};
