import mysql from 'mysql2/promise';
import { DB_NAME, DB_PASSWORD, DB_URL, DB_USER_NAME } from '../../utils/env';

export const dbConnection = async () => {
	const dbPool = mysql.createPool({
		host: DB_URL,
		user: DB_USER_NAME,
		password: DB_PASSWORD,
		database: DB_NAME,
		ssl: {
			rejectUnauthorized: true,
		},
	});
	const dbConnection = await dbPool.getConnection();

	return dbConnection;
};
