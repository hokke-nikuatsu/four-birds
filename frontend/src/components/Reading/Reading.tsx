import { useEffect } from 'react';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import { StyledSingleArticleGrid } from '../../pages/TrainingPage/TrainingPageStyle';
import { type Article } from '../../types/components';

const Reading: React.FC<{ articleId: Article['articleId'] }> = ({
	articleId,
}) => {
	// redux stateからselectedArticleを取得
	// const selectedArticle = useSelector(
	// 	(state: AppState) => state.selectedArticle,
	// );

	useEffect(() => {
		if (!articleId) return;

		// redux stateのselectedArticleがあれば何もしない
		// redux stateのselectedArticleがなければサーバーからfetchしてstateに格納する
	}, [articleId]);

	return (
		<StyledSingleArticleGrid>
			{/* redux stateのselectedArticleが空の場合はローディングアイコンを表示 */}
			{/* redux stateのselectedArticleがあれば以下を表示 */}
			<ArticleCard articleId={articleId} isSelectedArticle={true} />
		</StyledSingleArticleGrid>
	);
};

export default Reading;
