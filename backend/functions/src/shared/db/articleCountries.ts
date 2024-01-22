import { type PoolConnection } from 'mysql2/promise';
import {
	hasCountryInCountries,
	insertCountryInCountries,
	fetchCountryId,
} from './countries';
import { type DBArticleCountry } from '../../types/db';
import { type Article } from '../../types/news';
import { QUERY_INSERT_ARTICLE_COUNTRY } from '../../utils/db';

export const storeArticleCountries = async (
	connection: PoolConnection,
	articleId: Article['article_id'],
	countries: Article['country'],
) => {
	for (const country of countries) {
		const hasCountry = await hasCountryInCountries(connection, country);

		if (!hasCountry) {
			console.warn(`${country} is not in countries yet, so insert first.`);
			await insertCountryInCountries(connection, country);
		}

		const countryId = await fetchCountryId(connection, country);
		const now = new Date();
		const articleCountryData: DBArticleCountry = {
			articleId,
			countryId,
			createdAt: now,
		};

		await connection.query(
			QUERY_INSERT_ARTICLE_COUNTRY,
			Object.values(articleCountryData),
		);
	}
};
