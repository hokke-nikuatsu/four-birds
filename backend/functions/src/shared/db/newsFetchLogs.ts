import { dbConnection } from './connection';
import { type DBInsertNewsFetchLog } from '../../types/db';
import { QUERY_INSERT_FETCH_NEWS_LOG } from '../../utils/db';

export const storeNewsFetchLog = async (
	newsCount: number,
	status: DBInsertNewsFetchLog['status'],
): Promise<void> => {
	const now = new Date();
	const newsFetchLogData: DBInsertNewsFetchLog = {
		executedDate: now,
		newsCount,
		status,
		createdAt: now,
	};

	const connection = await dbConnection();

	await connection.query(
		QUERY_INSERT_FETCH_NEWS_LOG,
		Object.values(newsFetchLogData),
	);
};
