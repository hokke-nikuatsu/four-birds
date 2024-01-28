import * as functions from 'firebase-functions';
import { type RuntimeOptions } from 'firebase-functions';
import { obtainLatestPublishedDate, storeNews } from '../shared/db/articles';
import { storeNewsFetchLog } from '../shared/db/newsFetchLogs';
import { fetchNews } from '../shared/news/newsdataIo';
import { type Article } from '../types/news';
import { RUNTIME_MEMORY_SIZE, RUNTIME_TIMEOUT_SECONDS } from '../utils/common';
import { FUNCTIONS_REGION, FETCH_AND_STORE_NEWS_SCHEDULE } from '../utils/env';

const options: RuntimeOptions = {
	timeoutSeconds: RUNTIME_TIMEOUT_SECONDS,
	memory: RUNTIME_MEMORY_SIZE,
};

export const fetchAndStoreNews = functions
	.region(FUNCTIONS_REGION)
	.runWith(options)
	.pubsub.schedule(FETCH_AND_STORE_NEWS_SCHEDULE)
	.timeZone('Etc/GMT')
	.onRun(async () => {
		console.log('---fetchAndStoreNews start---');

		let newsData: Article[] = [];
		let page = undefined;

		try {
			const latestPublishedDate = await obtainLatestPublishedDate();

			do {
				const { results, nextPage } = await fetchNews(
					page,
					latestPublishedDate,
				);

				newsData = newsData.concat(results);
				page = nextPage;
			} while (page);

			const newsCount = await storeNews(newsData);

			await storeNewsFetchLog(newsCount, true);
		} catch (e) {
			await storeNewsFetchLog(0, false);

			throw new Error(`Fetching and storing news failed: ${e}`);
		} finally {
			console.log('---fetchAndStoreNews end---');
		}
	});
