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
	UNITED_KINGDOM = 'Europe/London',
}

export enum NewsdataIoApiResponseStatus {
	SUCCESS = 'success',
	ERROR = 'error',
}

// timeframe can't be set in free plan anymore (default "24h" is adopted)
export type NewsdataIoApiParams = {
	apikey: string;
	language: NewsLanguage;
	country: NewsCountry;
	timezone: NewsTimezone;
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
