import { useState, useEffect, useCallback } from 'react';
import { NewsGrid } from './NewsListStyle';
import { fetchNews } from '../../services/api/news';
import { type FetchNewsResponse } from '../../types/api';
import Loading from '../Loading/Loading';
import NewsCard from '../NewsCard/NewsCard';

const NewsList = () => {
	const [newsItems, setNewsItems] = useState<FetchNewsResponse>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [pageIndex, setPageIndex] = useState<number>(0);

	const fetchNewsItems = useCallback(
		async (start: number) => {
			if (isLoading) {
				return;
			}

			setIsLoading(true);

			try {
				const data = await fetchNews(start);

				setNewsItems([...newsItems, ...data]);
				setPageIndex(pageIndex + 21);
			} catch (e) {
				console.error('Fetch news items failed:', e);

				// TODO : Popup error messages
			} finally {
				setIsLoading(false);
			}
		},
		[isLoading, newsItems, pageIndex],
	);

	useEffect(() => {
		fetchNewsItems(pageIndex);
		// Make empty the second argument to avoid reloading fetchNewsItems multiple times.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop >=
				document.documentElement.offsetHeight - 10
			) {
				fetchNewsItems(pageIndex);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [fetchNewsItems, pageIndex]);

	return (
		<>
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
			{<Loading isLoading={isLoading} />}
		</>
	);
};

export default NewsList;
