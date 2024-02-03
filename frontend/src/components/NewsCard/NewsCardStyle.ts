import styled from 'styled-components';
import { Colors } from '../../types/components';

type CardImageProps = {
	$imageLoaded: boolean;
};

type CategoryProps = {
	$category: string;
};

export const Card = styled.div`
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	margin-bottom: 20px;
	border-radius: 10px;
	background-color: #ffffff;
	transition: background-color 0.3s ease;
`;

export const CardLink = styled.a`
	color: inherit;
	&:hover {
		background-color: #f4f4f4;
		img {
			filter: brightness(112%);
		}
	}
	&:hover {
		color: inherit;
	}
`;

export const CardImage = styled.img<CardImageProps>`
	width: 100%;
	height: 180px;
	object-fit: cover;
	object-position: center;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	background-color: ${(props) =>
		props.$imageLoaded ? 'transparent' : '#f0f0f0'};
	opacity: ${(props) => (props.$imageLoaded ? 1 : 0.5)};
	transition:
		background-color 0.3s ease,
		opacity 0.3s ease,
		filter 0.3s ease;
`;

export const CardImageContainer = styled.div`
	position: relative;
	width: 100%;
	height: 180px;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	overflow: hidden;
`;

export const TitleDescriptionContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100px;
	margin-bottom: 0;
`;

export const Title = styled.h2`
	margin: 0;
	color: #333;
	font-size: 1.2em;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 4;
	overflow: hidden;
`;

export const DateAndPublisher = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	font-size: 0.8em;
`;

export const PublishedDate = styled.p`
	font-size: 0.8em;
	color: #666;
	margin-right: 10px;
`;

export const Publisher = styled.p`
	color: #000;
	font-weight: bold;
	margin: 0;
	padding: 0;
`;

export const CategoriesContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	margin: 0;
	padding: 0 16px 16px 16px;
`;

export const Categories = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	flex-wrap: wrap;
	gap: 8px;
`;

export const Category = styled.span<CategoryProps>`
	display: inline-block;
	background-color: ${(props) =>
		Colors[props.$category as keyof typeof Colors] || '#d6e4f7'};
	padding: 4px 8px;
	border-radius: 5px;
	font-size: 0.8em;
	line-height: 1;
	color: #000;
`;

export const CardContent = styled.div`
	padding: 16px;
	display: flex;
	flex-direction: column;
`;

export const CategoriesAndArrowContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

export const IconButton = styled.button`
	background-color: lightblue;
	border: none;
	cursor: pointer;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	transition:
		background-color 0.3s ease,
		box-shadow 0.3s;

	&:hover {
		background-color: skyblue;
	}

	&:active {
		background-color: deepskyblue;
	}
`;
