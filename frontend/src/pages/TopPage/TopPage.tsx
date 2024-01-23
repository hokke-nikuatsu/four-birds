import React from 'react';
import { StyledTopPage } from './TopPageStyle';
import NewsList from '../../components/NewsList/NewsList';

const TopPage: React.FC = () => (
	<StyledTopPage>
		<NewsList />
	</StyledTopPage>
);

export default TopPage;
