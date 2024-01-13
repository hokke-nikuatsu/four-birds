import { type PoolConnection, type RowDataPacket } from 'mysql2/promise';
import { type DBInsertCountry, type DBCountry } from '../../types/db';
import {
	QUERY_HAS_COUNTRY,
	QUERY_INSERT_COUNTRY,
	QUERY_SELECT_COUNTRY_ID,
} from '../../utils/query';

export const fetchCountryId = async (
	connection: PoolConnection,
	country: DBCountry['name'],
): Promise<DBCountry['countryId']> => {
	try {
		const results = await connection.execute(QUERY_SELECT_COUNTRY_ID, [
			country,
		]);
		const [rows] = results as RowDataPacket[];

		if (!rows || rows.length !== 1) {
			throw new Error('results from countries is invalid.');
		}

		const countryId: DBCountry['countryId'] = rows[0].country_id;

		return countryId;
	} catch (e) {
		throw new Error(`Error in fetchCountryId: ${e}`);
	} finally {
		if (connection) {
			connection.release();
		}
	}
};

export const hasCountryInCountries = async (
	connection: PoolConnection,
	country: DBCountry['name'],
): Promise<boolean> => {
	const result = await connection.query(QUERY_HAS_COUNTRY, [country]);
	const [rows] = result as RowDataPacket[];

	if (!rows) {
		throw new Error('Selection of country_id failed.');
	}

	return rows.length;
};

export const insertCountryInCountries = async (
	connection: PoolConnection,
	country: DBCountry['name'],
): Promise<void> => {
	const now = new Date();
	const countryData: DBInsertCountry = {
		name: country,
		createdAt: now,
	};

	await connection.query(QUERY_INSERT_COUNTRY, Object.values(countryData));
};
