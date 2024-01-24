import * as functions from 'firebase-functions';
import { type RuntimeOptions } from 'firebase-functions';
import { API_HEALTH_CHECK_URL } from '../utils/common';
import { FUNCTIONS_REGION } from '../utils/env';

const options: RuntimeOptions = {
	timeoutSeconds: 540,
	memory: '128MB',
};

export const apiHealthCheck = functions
	.region(FUNCTIONS_REGION)
	.runWith(options)
	.pubsub.schedule('*/10 * * * *')
	.timeZone('Etc/GMT')
	.onRun(async () => {
		console.log('---apiHealthCheck start---');

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
			console.log('---apiHealthCheck end---');
		}
	});
