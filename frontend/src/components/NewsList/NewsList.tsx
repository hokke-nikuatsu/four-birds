import { useState, useEffect } from 'react';
import { NewsGrid } from './NewsListStyle';
import { fetchNews } from '../../services/newsService';
import { type FetchNewsResponse } from '../../types/api';
import NewsCard from '../NewsCard/NewsCard';

const NewsList = () => {
	const [newsItems, setNewsItems] = useState<FetchNewsResponse>();

	const fetchNewsItems = async (start: number) => {
		const data = await fetchNews(start);

		setNewsItems(data);
	};

	useEffect(() => {
		fetchNewsItems(0);
	}, []);

	return (
		<NewsGrid>
			{newsItems &&
				newsItems.map((newsItem) => (
					<NewsCard
						key={newsItem.articleId}
						title={newsItem.title}
						description={newsItem.description}
						publishedDate={newsItem.publishedDate}
						url={newsItem.url}
						ogpUrl={newsItem.ogpUrl}
						publisherName={newsItem.publisherName}
						categories={newsItem.categories}
					/>
				))}
		</NewsGrid>
	);
};

export default NewsList;
