import * as functions from 'firebase-functions';
import { type RuntimeOptions } from 'firebase-functions';
import {
	obtainLatestPublishedDate,
	storeArticles,
} from '../shared/db/articles';
import { fetchArticlesLog } from '../shared/db/fetchArticlesLogs';
import { fetchNews } from '../shared/news/newsdataIo';
import { type Article } from '../types/news';
import { RUNTIME_MEMORY_SIZE, RUNTIME_TIMEOUT_SECONDS } from '../utils/common';
import {
	FUNCTIONS_REGION,
	FETCH_ARTICLES_SCHEDULE,
} from '../utils/environment';

const options: RuntimeOptions = {
	timeoutSeconds: RUNTIME_TIMEOUT_SECONDS,
	memory: RUNTIME_MEMORY_SIZE,
};

export const fetchArticles = functions
	.region(FUNCTIONS_REGION)
	.runWith(options)
	.pubsub.schedule(FETCH_ARTICLES_SCHEDULE)
	.timeZone('Etc/GMT')
	.onRun(async () => {
		console.log('---fetchArticles start---');

		let articles: Article[] = [];
		let page = undefined;

		try {
			const latestPublishedDate = await obtainLatestPublishedDate();

			do {
				const { results, nextPage } = await fetchNews(
					page,
					latestPublishedDate,
				);

				articles = articles.concat(results);
				page = nextPage;
			} while (page);

			const articleCount = await storeArticles(articles);

			await fetchArticlesLog(articleCount, true);
		} catch (e) {
			await fetchArticlesLog(0, false);

			throw new Error(`Fetching articles failed: ${e}`);
		} finally {
			console.log('---fetchArticles end---');
		}
	});
