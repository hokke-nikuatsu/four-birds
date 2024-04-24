import { type PoolClient } from 'pg';
import { type DBCategory, type DBInsertCountry } from '../../types/db';
import {
	QUERY_HAS_CATEGORY,
	QUERY_INSERT_CATEGORY,
	QUERY_SELECT_CATEGORY_ID,
} from '../../utils/db';

export const fetchCategoryId = async (
	connection: PoolClient,
	category: DBCategory['name'],
): Promise<DBCategory['categoryId']> => {
	const results = await connection.query(QUERY_SELECT_CATEGORY_ID, [category]);

	const rows = results.rows;

	if (!rows || rows.length !== 1) {
		throw new Error('results from categories is invalid.');
	}

	const categoryId: DBCategory['categoryId'] = rows[0].category_id;

	return categoryId;
};

export const hasCategoryInCategories = async (
	connection: PoolClient,
	category: DBCategory['name'],
): Promise<boolean> => {
	const result = await connection.query(QUERY_HAS_CATEGORY, [category]);
	const rows = result.rows;

	if (!rows) {
		throw new Error('Selection of category_id failed.');
	}

	return !!rows.length;
};

export const insertCategoryInCategories = async (
	connection: PoolClient,
	category: DBCategory['name'],
): Promise<void> => {
	const now = new Date();
	const categoryData: DBInsertCountry = {
		name: category,
		createdAt: now,
	};

	await connection.query(QUERY_INSERT_CATEGORY, Object.values(categoryData));
};
