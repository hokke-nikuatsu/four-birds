import { useParams } from 'react-router-dom';
import {
	StyledSingleArticleGrid,
	StyledTrainingPage,
} from './TrainingPageStyle';
import ArticleCard from '../../components/ArticleCard/ArticleCard';

const TrainingPage = () => {
	const { articleId } = useParams();
	if (!articleId) return;

	return (
		<StyledTrainingPage>
			<StyledSingleArticleGrid>
				<ArticleCard articleId={articleId} isChosen={true} />
			</StyledSingleArticleGrid>
		</StyledTrainingPage>
	);
};

export default TrainingPage;
