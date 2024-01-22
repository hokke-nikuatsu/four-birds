import { type RowDataPacket } from 'mysql2';
import { storeArticleCategories } from './articleCategories';
import { storeArticleCountries } from './articleCountries';
import { dbConnection } from './connection';
import { fetchPublisherId } from './publisher';
import { obtainOgpUrls } from '../../shared/news/ogp';
import { type DBArticle } from '../../types/db';
import { type Article } from '../../types/news';
import {
	containsJapanese,
	shortenSentence,
	trimAfterSpecialSymbols,
} from '../../utils/common';
import {
	DESCRIPTION_MAXIMUM_LENGTH,
	QUERY_HAS_ARTICLE_ID,
	QUERY_INSERT_ARTICLE,
	QUERY_LATEST_PUBLISHED_DATE,
} from '../../utils/db';
import { validateUrl } from '../../utils/validator';

export const storeNews = async (newsData: Article[]): Promise<number> => {
	const connection = await dbConnection();
	connection.beginTransaction();

	const articlesData: DBArticle[] = [];

	try {
		const urls = newsData.map((eachNewsData) => eachNewsData.link);
		// NOTE: Fetching each ogp url separately takes long time to finish,
		// so it should be implemented all at once.
		const ogpUrls = await obtainOgpUrls(urls);

		for (let i = 0; i < newsData.length; i++) {
			const eachNewsData = newsData[i];
			const ogpUrl = ogpUrls[i];

			if (eachNewsData === undefined || ogpUrl === undefined) {
				console.log(
					`News data ${eachNewsData} or ogp url ${ogpUrl} is invalid, so skip this article.`,
				);
				continue;
			}

			const title = eachNewsData.title;
			const hasTitleJapanese = containsJapanese(title);

			if (hasTitleJapanese) {
				console.log(`Title has Japanese words, so skip this article.`);
				console.log(`Title : ${title}`);
				continue;
			}

			const description = eachNewsData.description;
			const hasDescriptionJapanese = description
				? containsJapanese(description)
				: true;

			if (hasDescriptionJapanese) {
				console.log(`Description has Japanese words, so skip this article.`);
				console.log(`Description : ${description}`);
				continue;
			}

			const url = eachNewsData.link;
			const isValidUrl = validateUrl(url);
			const isValidOgpUrl = ogpUrl === '' ? true : validateUrl(ogpUrl);

			if (!isValidUrl) {
				console.log(`${url} is not secure url, so skip this article.`);
				continue;
			}

			if (!isValidOgpUrl) {
				console.log(`${ogpUrl} is not secure url, so skip this article.`);
				continue;
			}

			const articleId = eachNewsData.article_id;

			const result = await connection.query(QUERY_HAS_ARTICLE_ID, [articleId]);
			const [rows] = result as RowDataPacket[];

			if (!rows) {
				throw new Error('Validation of articleId failed.');
			}

			if (rows.length === 1) {
				console.log(
					`articleId "${articleId}" is already in articles, so skip the insertion.`,
				);
				continue;
			}

			const trimmedDescription = trimAfterSpecialSymbols(description);
			const shortenedDescription = shortenSentence(
				trimmedDescription,
				DESCRIPTION_MAXIMUM_LENGTH,
			);
			const publishedDate = new Date(eachNewsData.pubDate);
			const createdAt = new Date();
			const publisher = eachNewsData.source_id;
			const publisherId = await fetchPublisherId(publisher);

			const articleData: DBArticle = {
				articleId,
				title,
				description: shortenedDescription,
				publishedDate,
				url,
				ogpUrl,
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

		const newsCount = articlesData.length;

		return newsCount;
	} catch (e) {
		await connection.rollback();

		throw new Error(`Insert articles failed: ${e}`);
	} finally {
		if (connection) {
			connection.release();
		}
	}
};

export const obtainLatestPublishedDate = async (): Promise<
	DBArticle['publishedDate']
> => {
	const connection = await dbConnection();
	const results = await connection.execute(QUERY_LATEST_PUBLISHED_DATE);
	const [rows] = results as RowDataPacket[];

	if (!rows || rows.length !== 1) {
		throw new Error('results from articles is invalid.');
	}

	const latestPublishedDate: DBArticle['publishedDate'] =
		rows[0].latest_published_date;

	return latestPublishedDate;
};
