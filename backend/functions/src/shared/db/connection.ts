import { Pool } from 'pg';
import {
	DB_NAME,
	DB_PASSWORD,
	DB_URL,
	DB_USER_NAME,
} from '../../utils/environment';

export const dbConnection = async () => {
	const dbPool = new Pool({
		host: DB_URL,
		user: DB_USER_NAME,
		password: DB_PASSWORD,
		database: DB_NAME,
		ssl: {
			rejectUnauthorized: true,
		},
	});

	try {
		const dbConnection = await dbPool.connect();
		return dbConnection;
	} catch (e) {
		if (e instanceof Error) {
			console.error('Database connection failed:', e.stack);
		} else {
			console.error('Database connection failed with unknown error.');
		}

		throw e;
	}
};
