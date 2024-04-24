import ArticleCard from '../../components/ArticleCard/ArticleCard';
import { StyledSingleArticleGrid } from '../../pages/TrainingPage/TrainingPageStyle';
import { type Article } from '../../types/components';

const Writing: React.FC<{ articleId: Article['articleId'] }> = ({
	articleId,
}) => {
	if (!articleId) return;

	return (
		<StyledSingleArticleGrid>
			<ArticleCard articleId={articleId} isSelectedArticle={true} />
		</StyledSingleArticleGrid>
	);
};

export default Writing;
