import { useParams } from 'react-router-dom';
import { StyledTrainingPage } from './TrainingPageStyle';
import Reading from '../../components/Reading/Reading';

const TrainingPage = () => {
	const { articleId } = useParams();

	// reduxにselectedArticleを保存

	if (!articleId) return;

	return (
		<StyledTrainingPage>
			<Reading articleId={articleId} />
		</StyledTrainingPage>
	);
};

export default TrainingPage;
