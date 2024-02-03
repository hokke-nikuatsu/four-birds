import { useParams } from 'react-router-dom';
import { StyledSingleNewsGrid, StyledTrainingPage } from './TrainingPageStyle';
import NewsCard from '../../components/NewsCard/NewsCard';

const TrainingPage = () => {
	const { articleId } = useParams();
	if (!articleId) return;

	return (
		<StyledTrainingPage>
			<StyledSingleNewsGrid>
				<NewsCard articleId={articleId} isChosen={true} />
			</StyledSingleNewsGrid>
		</StyledTrainingPage>
	);
};

export default TrainingPage;
