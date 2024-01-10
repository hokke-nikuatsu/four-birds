import {
	NewsCountry,
	NewsLanguage,
	NewsdataIoApiResponseStatus,
	type NewsdataIoApiParams,
	type NewsdataIoApiResponse,
	NewsTimezone,
	NEWS_FETCH_INTERVAL,
	NeedsFullContent,
	NEWS_SIZE,
} from '../../types/news';
import { NEWSDATA_IO_API_KEY, NEWSDATA_IO_API_URL } from '../../utils/env';

const baseParams: NewsdataIoApiParams = {
	apikey: NEWSDATA_IO_API_KEY,
	language: NewsLanguage.ENGLISH,
	country: NewsCountry.JAPAN,
	timezone: NewsTimezone.JAPAN,
	timeframe: NEWS_FETCH_INTERVAL,
	full_content: NeedsFullContent.FALSE,
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
		timeframe: params.timeframe,
		full_content: params.full_content,
		size: params.size,
	});

	if (page) {
		console.log(`page: ${page}`);

		searchParams.set('page', page);
	}

	return searchParams;
};

export const obtainNews = async (
	page: NewsdataIoApiResponse['nextPage'] | undefined,
): Promise<NewsdataIoApiResponse> => {
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

		return formattedResponse;
	} catch (e) {
		throw new Error(`Error while fetching news: ${e}`);
	}
};
