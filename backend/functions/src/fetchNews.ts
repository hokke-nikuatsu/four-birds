import * as functions from 'firebase-functions';
import { type RuntimeOptions } from 'firebase-functions';

const options: RuntimeOptions = {
	timeoutSeconds: 540,
	memory: '256MB',
};

export const fetchNews = functions
	.region('asia-northeast1')
	.runWith(options)
	.pubsub.schedule('0 21,3,9 * * *') // 6am, 12am, and 6pm in Japan
	.timeZone('Etc/GMT')
	.onRun(async () => {
		console.log('---fetchNews start---');

		console.log('---fetchNews end---');
		return null;
	});
