import { type PoolConnection, type RowDataPacket } from 'mysql2/promise';
import { dbConnection } from './connection';
import { type DBInsertPublisher, type DBPublisher } from '../../types/db';
import { type Article } from '../../types/news';
import {
	QUERY_HAS_PUBLISHER,
	QUERY_INSERT_PUBLISHER,
	QUERY_SELECT_PUBLISHER_ID,
} from '../../utils/query';

export const obtainPublisherId = async (
	publisher: Article['source_id'],
): Promise<DBPublisher['publisherId']> => {
	const connection = await dbConnection();

	try {
		const hasPublisher = await hasPublisherInPublishers(connection, publisher);

		if (!hasPublisher) {
			console.warn(`${publisher} is not in publishers yet, so insert first.`);
			await insertPublisherInPublishers(connection, publisher);
		}

		const result = await connection.execute(QUERY_SELECT_PUBLISHER_ID, [
			publisher,
		]);
		const [rows] = result as RowDataPacket[];

		if (!rows || rows.length !== 1) {
			throw new Error('category_id is not found in categories.');
		}

		const publisherId: DBPublisher['publisherId'] = rows[0].publisher_id;

		return publisherId;
	} catch (e) {
		throw new Error(`Error in obtainPublisherId: ${e}`);
	} finally {
		if (connection) {
			connection.release();
		}
	}
};

const hasPublisherInPublishers = async (
	connection: PoolConnection,
	publisher: DBPublisher['name'],
): Promise<boolean> => {
	const result = await connection.query(QUERY_HAS_PUBLISHER, [publisher]);
	const [rows] = result as RowDataPacket[];

	if (!rows) {
		throw new Error('Selection of publisher_id failed.');
	}

	return rows.length;
};

const insertPublisherInPublishers = async (
	connection: PoolConnection,
	publisher: DBPublisher['name'],
): Promise<void> => {
	const now = new Date();
	const publisherData: DBInsertPublisher = {
		name: publisher,
		createdAt: now,
	};

	await connection.query(QUERY_INSERT_PUBLISHER, Object.values(publisherData));
};
