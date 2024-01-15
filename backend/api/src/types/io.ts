export type FetchNewsResponse = {
	articleId: string;
	title: string;
	description: string;
	publishedDate: Date;
	url: string;
	ogpUrl: string;
	publisher_name: string;
	categories: string;
	countries: string;
};
