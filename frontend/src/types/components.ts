export enum Colors {
	'Top' = '#d6e4f7',
	'Technology' = '#FFCDD2',
	'Business' = '#C8E6C9',
	'Health' = '#BBDEFB',
	'Sports' = '#FFECB3',
	'Crime' = '#E1BEE7',
	'Domestic' = '#B3E5FC',
	'Education' = '#F0F4C3',
	'Entertainment' = '#FFCCBC',
	'Food' = '#FFF9C4',
	'Politics' = '#D1C4E9',
	'Science' = '#C5CAE9',
	'Tourism' = '#B2EBF2',
	'Other' = '#F5F5F5',
	'Environment' = '#DCEDC8',
	'World' = '#D7CCC8',
}

export type NewsItem = {
	title: string;
	description: string;
	publishedDate: string;
	url: string;
	ogpUrl: string;
	publisherName: string;
	categories: string[];
};

export type Loading = {
	isLoading: boolean;
};
