import { useEffect, useState } from 'react';
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
import { type NewsItem } from '../../types/components';
import { pathToPlaceHolderImage } from '../../utils/common';

const NewsCard: React.FC<NewsItem> = ({
	title,
	description,
	publishedDate,
	url,
	ogpUrl,
	publisherName,
	categories,
}) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageUrl, setImageUrl] = useState(ogpUrl || pathToPlaceHolderImage);

	useEffect(() => {
		const img = new Image();
		img.src = imageUrl;
		img.onload = () => {
			setImageLoaded(true);
		};
		img.onerror = () => {
			setImageUrl(pathToPlaceHolderImage);
			setImageLoaded(true);
		};
	}, [imageUrl]);

	return (
		<Card>
			<CardLink href={url} target="_blank" rel="noopener noreferrer">
				<CardImage src={imageUrl} alt={title} $imageLoaded={imageLoaded} />
				<CardContent>
					<TitleDescriptionContainer>
						<Title>{title}</Title>
						<Description>{description}</Description>
					</TitleDescriptionContainer>
					<DateAndPublisher>
						<PublishedDate>{publishedDate.toString()}</PublishedDate>
						<Publisher>{publisherName}</Publisher>
					</DateAndPublisher>
					<Categories>
						{categories.map((category, index) => (
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
