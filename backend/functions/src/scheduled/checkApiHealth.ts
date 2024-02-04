import * as functions from 'firebase-functions';
import { type RuntimeOptions } from 'firebase-functions';
import {
	API_HEALTH_CHECK_URL,
	RUNTIME_MEMORY_SIZE,
	RUNTIME_TIMEOUT_SECONDS,
} from '../utils/common';
import {
	CHECK_API_HEALTH_SCHEDULE,
	FUNCTIONS_REGION,
} from '../utils/environment';

const options: RuntimeOptions = {
	timeoutSeconds: RUNTIME_TIMEOUT_SECONDS,
	memory: RUNTIME_MEMORY_SIZE,
};

export const checkApiHealth = functions
	.region(FUNCTIONS_REGION)
	.runWith(options)
	.pubsub.schedule(CHECK_API_HEALTH_SCHEDULE)
	.timeZone('Etc/GMT')
	.onRun(async () => {
		console.log('---checkApiHealth start---');

		try {
			const response = await fetch(API_HEALTH_CHECK_URL);

			if (response.status !== 200) {
				console.error(
					`API health check failed with status: ${response.status}}`,
				);

				throw new Error(JSON.stringify(response));
			}

			console.log('API server is healthy.');
		} catch (e) {
			throw new Error(`API health check failed: ${e}`);
		} finally {
			console.log('---checkApiHealth end---');
		}
	});
