import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React, { type MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	Card,
	CardImage,
	CardContent,
	Title,
	Publisher,
	Categories,
	CardLink,
	PublishedDate,
	DateAndPublisher,
	TitleDescriptionContainer,
	Category,
	IconButton,
	CardImageContainer,
	CategoriesAndArrowContainer,
} from './NewsCardStyle';
import { type AppState } from '../../services/store/store';
import { type NewsItem } from '../../types/components';
import { PATH_TO_PLACE_HOLDER_IMAGE } from '../../utils/common';

const NewsCard: React.FC<{
	articleId: NewsItem['articleId'];
	isChosen: boolean;
}> = ({ articleId, isChosen }) => {
	const navigate = useNavigate();
	const handleViewDetails = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		navigate(`/training/${articleId}`);
	};

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

	if (!article) return null;

	return (
		<Card>
			<CardLink href={article.url} target="_blank" rel="noopener noreferrer">
				<CardImageContainer>
					<CardImage
						src={imageUrl}
						alt={article.title}
						$imageLoaded={imageLoaded}
					/>
				</CardImageContainer>
			</CardLink>
			<CardContent>
				<TitleDescriptionContainer>
					<Title>{article.title}</Title>
				</TitleDescriptionContainer>
				<DateAndPublisher>
					<PublishedDate>{article.publishedDate.toString()}</PublishedDate>
					<Publisher>{article.publisherName}</Publisher>
				</DateAndPublisher>
				<CategoriesAndArrowContainer>
					<Categories>
						{article.categories.map((category, index) => (
							<Category key={index} $category={category}>
								{category}
							</Category>
						))}
					</Categories>
					{!isChosen && (
						<IconButton
							onClick={(e) => handleViewDetails(e)}
							aria-label="move to training page"
						>
							<ArrowForwardIcon sx={{ color: '#4f4f4f' }} />
						</IconButton>
					)}
				</CategoriesAndArrowContainer>
			</CardContent>
		</Card>
	);
};

export default NewsCard;
