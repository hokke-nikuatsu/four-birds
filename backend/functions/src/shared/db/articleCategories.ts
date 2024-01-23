import { type PoolConnection } from 'mysql2/promise';
import {
	hasCategoryInCategories,
	insertCategoryInCategories,
	fetchCategoryId,
} from './categories';
import { type DBArticleCategory } from '../../types/db';
import { type Article } from '../../types/news';
import { QUERY_INSERT_ARTICLE_CATEGORY } from '../../utils/db';

export const storeArticleCategories = async (
	connection: PoolConnection,
	articleId: Article['article_id'],
	categories: Article['category'],
) => {
	for (const category of categories) {
		const hasCategory = await hasCategoryInCategories(connection, category);

		if (!hasCategory) {
			console.warn(`${category} is not in categories yet, so insert first.`);
			await insertCategoryInCategories(connection, category);
		}

		const categoryId = await fetchCategoryId(connection, category);
		const now = new Date();
		const articleCategoryData: DBArticleCategory = {
			articleId,
			categoryId,
			createdAt: now,
		};

		await connection.query(
			QUERY_INSERT_ARTICLE_CATEGORY,
			Object.values(articleCategoryData),
		);
	}
};
