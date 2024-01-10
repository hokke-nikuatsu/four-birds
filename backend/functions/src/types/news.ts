export const NEWS_FETCH_INTERVAL = '9'; // hours

export const NEWS_SIZE = '10';

export enum NeedsFullContent {
	TRUE = '1',
	FALSE = '0',
}

export enum NewsLanguage {
	ENGLISH = 'en',
	JAPANESE = 'jp',
}

export enum NewsCountry {
	UNITED_KINGDOM = 'gb',
	JAPAN = 'jp',
}

export enum NewsTimezone {
	JAPAN = 'Japan',
}

export enum NewsdataIoApiResponseStatus {
	SUCCESS = 'success',
	ERROR = 'error',
}

export type NewsdataIoApiParams = {
	apikey: string;
	language: NewsLanguage;
	country: NewsCountry;
	timezone: NewsTimezone;
	timeframe: string;
	full_content: string;
	size: string;
	nextPage?: string;
};

export type Article = {
	article_id: string;
	title: string;
	link: string;
	keywords: string[] | null;
	creator: string[] | null;
	video_url: string | null;
	description: string | null;
	pubDate: string;
	image_url: string;
	source_id: string;
	source_priority: number;
	country: string[];
	category: string[];
	language: string;
};

export type NewsdataIoApiResponse = {
	status: NewsdataIoApiResponseStatus;
	totalResults: number;
	results: Article[];
	nextPage: string;
};
