import { useState, useEffect, useCallback } from 'react';
import { StyledArticleGrid } from './ArticleListStyle';
import { fetchArticles as fetchArticlesAction } from '../../services/redux/articles/actions';
import { useAppDispatch } from '../../services/store/store';
import { type FetchArticlesResponse } from '../../types/api';
import { FETCH_ARTICLE_OFFSET } from '../../utils/common';
import ArticleCard from '../ArticleCard/ArticleCard';
import Loading from '../Loading/Loading';

const ArticleList = () => {
	const dispatch = useAppDispatch();

	const [articles, setArticles] = useState<FetchArticlesResponse>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [offset, setOffset] = useState<number>(0);

	const fetchArticles = useCallback(
		async (start: number) => {
			if (isLoading) {
				return;
			}

			setIsLoading(true);

			try {
				const data = await dispatch(fetchArticlesAction(start));

				setArticles([...articles, ...data]);
				setOffset(offset + FETCH_ARTICLE_OFFSET);
			} catch (e) {
				console.error('Fetch articles failed:', e);

				// TODO : Popup error messages
			} finally {
				setIsLoading(false);
			}
		},
		[dispatch, isLoading, articles, offset],
	);

	useEffect(() => {
		fetchArticles(offset);

		// Make empty the second argument to avoid reloading fetchArticles multiple times.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop >=
				document.documentElement.offsetHeight - 10
			) {
				fetchArticles(offset);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [fetchArticles, offset]);

	return (
		<>
			<StyledArticleGrid>
				{articles &&
					articles.map((article) => (
						<ArticleCard
							key={article.articleId}
							articleId={article.articleId}
							isSelectedArticle={false}
						/>
					))}
			</StyledArticleGrid>
			{<Loading isLoading={isLoading} />}
		</>
	);
};

export default ArticleList;
