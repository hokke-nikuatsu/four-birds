import * as functions from 'firebase-functions';
import { type RuntimeOptions } from 'firebase-functions';
import { obtainLatestPublishedDate, storeNews } from '../shared/db/articles';
import { storeNewsFetchLog } from '../shared/db/newsFetchLogs';
import { fetchNews } from '../shared/news/newsdataIo';
import { type Article } from '../types/news';
import { FUNCTIONS_REGION } from '../utils/env';

const options: RuntimeOptions = {
	timeoutSeconds: 540,
	memory: '256MB',
};

export const fetchAndStoreNews = functions
	.region(FUNCTIONS_REGION)
	.runWith(options)
	.pubsub.schedule('0 6,14,22 * * *') // 6am, 2pm, and 10pm in Japan
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
