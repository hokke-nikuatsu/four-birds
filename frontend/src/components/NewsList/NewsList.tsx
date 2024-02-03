import { useState, useEffect, useCallback } from 'react';
import { NewsGrid } from './NewsListStyle';
import { fetchArticles } from '../../services/redux/articles/actions';
import { useAppDispatch } from '../../services/store/store';
import { type FetchNewsResponse } from '../../types/api';
import { FETCH_ARTICLE_OFFSET } from '../../utils/common';
import Loading from '../Loading/Loading';
import NewsCard from '../NewsCard/NewsCard';

const NewsList = () => {
	const [newsItems, setNewsItems] = useState<FetchNewsResponse>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [pageIndex, setPageIndex] = useState<number>(0);
	const dispatch = useAppDispatch();

	const fetchNewsItems = useCallback(
		async (start: number) => {
			if (isLoading) {
				return;
			}

			setIsLoading(true);

			try {
				const data = await dispatch(fetchArticles(start));

				setNewsItems([...newsItems, ...data]);
				setPageIndex(pageIndex + FETCH_ARTICLE_OFFSET);
			} catch (e) {
				console.error('Fetch news items failed:', e);

				// TODO : Popup error messages
			} finally {
				setIsLoading(false);
			}
		},
		[dispatch, isLoading, newsItems, pageIndex],
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
						<NewsCard key={newsItem.articleId} articleId={newsItem.articleId} />
					))}
			</NewsGrid>
			{<Loading isLoading={isLoading} />}
		</>
	);
};

export default NewsList;
