import moment from 'moment';
import { type DBArticle } from '../../types/db';
import {
	NewsCountry,
	NewsLanguage,
	NewsdataIoApiResponseStatus,
	type NewsdataIoApiParams,
	type NewsdataIoApiResponse,
	NewsTimezone,
	type Article,
} from '../../types/news';
import {
	NEWSDATA_IO_API_KEY,
	NEWSDATA_IO_API_URL,
} from '../../utils/environment';
import {
	NEWS_DELAYED_TIME,
	NEWS_FETCH_INTERVAL,
	NEWS_SIZE,
} from '../../utils/news';

const baseParams: NewsdataIoApiParams = {
	apikey: NEWSDATA_IO_API_KEY,
	language: NewsLanguage.ENGLISH,
	country: NewsCountry.JAPAN,
	timezone: NewsTimezone.UNITED_KINGDOM,
	size: NEWS_SIZE,
};

const createNewsdataIoApiParams = (
	params: NewsdataIoApiParams,
	page: NewsdataIoApiResponse['nextPage'] | undefined,
): URLSearchParams => {
	const searchParams = new URLSearchParams({
		apikey: params.apikey,
		language: params.language,
		country: params.country,
		timezone: params.timezone,
		size: params.size,
	});

	if (page) {
		console.log(`page: ${page}`);

		searchParams.set('page', page);
	}

	return searchParams;
};

export const fetchNews = async (
	page: NewsdataIoApiResponse['nextPage'] | undefined,
	latestPublishedDate: DBArticle['publishedDate'],
): Promise<{
	results: Article[];
	nextPage: NewsdataIoApiResponse['nextPage'];
}> => {
	const params = createNewsdataIoApiParams(baseParams, page);

	const url = new URL(NEWSDATA_IO_API_URL);
	url.search = params.toString();

	try {
		const response = await fetch(url.toString());

		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status}`);
		}

		const formattedResponse = (await response.json()) as NewsdataIoApiResponse;
		const status = formattedResponse.status;

		if (status !== NewsdataIoApiResponseStatus.SUCCESS) {
			throw new Error(`Error with status code : ${formattedResponse.status}`);
		}

		const results = formattedResponse.results;
		const nextPage = formattedResponse.nextPage;

		const filteredResults = results.filter((result) => {
			const articleDate = new Date(result.pubDate);
			const isNewerThanLatestNewsInArticles = articleDate > latestPublishedDate;
			const newsFetchIntervalDate = moment()
				.subtract(NEWS_FETCH_INTERVAL + NEWS_DELAYED_TIME, 'hours')
				.toDate();
			const isWithinNewsFetchInterval = articleDate > newsFetchIntervalDate;

			return isNewerThanLatestNewsInArticles && isWithinNewsFetchInterval;
		});

		return results.length === filteredResults.length
			? { results: filteredResults, nextPage }
			: { results: filteredResults, nextPage: '' };
	} catch (e) {
		throw new Error(`Error while fetching news: ${e}`);
	}
};
