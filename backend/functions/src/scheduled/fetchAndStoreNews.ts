import * as functions from 'firebase-functions';
import { type RuntimeOptions } from 'firebase-functions';
import { storeNews } from '../shared/db/articles';
import { obtainNews } from '../shared/news/newsdataIo';
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
			do {
				const response = await obtainNews(page);
				const results = response.results;

				newsData = newsData.concat(results);
				page = response.nextPage;
			} while (page);

			await storeNews(newsData);
		} catch (e) {
			throw new Error(`Fetching and storing news failed: ${e}`);
		}

		console.log('---fetchAndStoreNews end---');
	});
