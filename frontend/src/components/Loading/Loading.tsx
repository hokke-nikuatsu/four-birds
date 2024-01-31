import CircularProgress from '@mui/material/CircularProgress';
import { StyledLoading } from './LoadingStyle';
import { type Loading as LoadingType } from '../../types/components';

const Loading: React.FC<LoadingType> = ({ isLoading }) => (
	<StyledLoading>{isLoading && <CircularProgress />}</StyledLoading>
);

export default Loading;
