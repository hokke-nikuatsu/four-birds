import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Card,
	CardImage,
	CardContent,
	Title,
	Description,
	Publisher,
	Categories,
	CardLink,
	PublishedDate,
	DateAndPublisher,
	TitleDescriptionContainer,
	Category,
} from './NewsCardStyle';
import { type AppState } from '../../services/store/store';
import { type NewsItem } from '../../types/components';
import { PATH_TO_PLACE_HOLDER_IMAGE } from '../../utils/common';

const NewsCard: React.FC<{ articleId: NewsItem['articleId'] }> = ({
	articleId,
}) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageUrl, setImageUrl] = useState(PATH_TO_PLACE_HOLDER_IMAGE);

	const article = useSelector((state: AppState) =>
		Array.isArray(state.articles)
			? state.articles.find((article) => article.articleId === articleId)
			: undefined,
	);

	useEffect(() => {
		if (!article) return;

		const newImageUrl = article.ogpUrl;
		const img = new Image();

		img.src = newImageUrl;
		img.onload = () => {
			setImageUrl(newImageUrl);
			setImageLoaded(true);
		};
		img.onerror = () => {
			setImageUrl(PATH_TO_PLACE_HOLDER_IMAGE);
			setImageLoaded(true);
		};
	}, [article]);

	if (!article) return;

	return (
		<Card>
			<CardLink href={article.url} target="_blank" rel="noopener noreferrer">
				<CardImage
					src={imageUrl}
					alt={article.title}
					$imageLoaded={imageLoaded}
				/>
				<CardContent>
					<TitleDescriptionContainer>
						<Title>{article.title}</Title>
						<Description>{article.description}</Description>
					</TitleDescriptionContainer>
					<DateAndPublisher>
						<PublishedDate>{article.publishedDate.toString()}</PublishedDate>
						<Publisher>{article.publisherName}</Publisher>
					</DateAndPublisher>
					<Categories>
						{article.categories.map((category, index) => (
							<Category key={index} $category={category}>
								{category}
							</Category>
						))}
					</Categories>
				</CardContent>
			</CardLink>
		</Card>
	);
};

export default NewsCard;
