import { type RowDataPacket, type PoolConnection } from 'mysql2/promise';
import { type User } from '../types/io';
import {
	QUERY_CREATE_USER,
	QUERY_SELECT_USER,
	QUERY_UPDATE_USER,
} from '../utils/query';

export const updateUser = async (
	connection: PoolConnection,
	user: User,
): Promise<void> => {
	try {
		const userId = user.uid;

		const result = await connection.query(QUERY_SELECT_USER, [userId]);
		const [rows] = result as RowDataPacket[];

		if (!rows) {
			throw new Error('Fetch user failed.');
		}

		const isExists = rows[0].count;
		const now = new Date();

		if (isExists) {
			const userData = {
				email: user.email,
				photoUrl: user.photoUrl,
				isActive: true,
				lastLoggedInAt: now,
				updatedAt: now,
				userId,
			};

			await connection.query(QUERY_UPDATE_USER, Object.values(userData));
		} else {
			const userData = {
				userId,
				email: user.email,
				photoUrl: user.photoUrl,
				isActive: true,
				lastLoggedInAt: now,
				createdAt: now,
			};

			await connection.query(QUERY_CREATE_USER, Object.values(userData));
		}
	} catch (e) {
		await connection.rollback();

		throw new Error(`Update user failed: ${e}`);
	} finally {
		connection.release();
	}
};
