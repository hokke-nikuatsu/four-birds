import { type RowDataPacket } from 'mysql2';
import { storeArticleCategories } from './articleCategories';
import { storeArticleCountries } from './articleCountries';
import { dbConnection } from './connection';
import { storeNewsFetchLog } from './newsFetchLogs';
import { obtainPublisherId } from './publisher';
import { DESCRIPTION_MAXIMUM_LENGTH, type DBArticle } from '../../types/db';
import { type Article } from '../../types/news';
import { shortenSentence, trimBrackets } from '../../utils/common';
import { QUERY_HAS_ARTICLE_ID, QUERY_INSERT_ARTICLE } from '../../utils/query';

export const storeNews = async (newsData: Article[]): Promise<void> => {
	const connection = await dbConnection();
	connection.beginTransaction();

	const articlesData: DBArticle[] = [];
	const articleIds: DBArticle['articleId'][] = [];

	try {
		for (const eachNewsData of newsData) {
			const articleId = eachNewsData.article_id;

			const result = await connection.query(QUERY_HAS_ARTICLE_ID, [articleId]);
			const [rows] = result as RowDataPacket[];

			if (!rows) {
				throw new Error('Validation of articleId failed.');
			}

			if (rows.length === 1) {
				console.log(
					`articleId "${articleId}" is already in articles, skip the insertion.`,
				);
				continue;
			}

			const trimmedDescription = trimBrackets(eachNewsData.description);
			const shortenedDescription = shortenSentence(
				trimmedDescription,
				DESCRIPTION_MAXIMUM_LENGTH,
			);
			const publishedDate = new Date(eachNewsData.pubDate);
			const createdAt = new Date();
			const publisher = eachNewsData.source_id;
			const publisherId = await obtainPublisherId(publisher);

			const articleData: DBArticle = {
				articleId,
				title: eachNewsData.title,
				description: shortenedDescription,
				publishedDate,
				url: eachNewsData.link,
				ogpUrl: eachNewsData.image_url,
				publisherId,
				isValid: true,
				createdAt: createdAt,
			};

			articlesData.push(articleData);

			const categories = eachNewsData.category;
			await storeArticleCategories(connection, articleId, categories);

			const countries = eachNewsData.country;
			await storeArticleCountries(connection, articleId, countries);
		}

		for (const article of articlesData) {
			await connection.query(QUERY_INSERT_ARTICLE, Object.values(article));
		}

		await connection.commit();

		console.log(`Insert articles succeeded.`);
		articlesData.forEach((article) => {
			console.log(`articleId: ${article.articleId}`);
			articleIds.push(article.articleId);
		});

		const newsCount = articlesData.length;
		await storeNewsFetchLog(newsCount, true);
	} catch (e) {
		await storeNewsFetchLog(0, false);
		await connection.rollback();

		throw new Error(`Insert articles failed: ${e}`);
	} finally {
		if (connection) {
			connection.release();
		}
	}
};
