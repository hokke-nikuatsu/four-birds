import CircularProgress from '@mui/material/CircularProgress';
import { LoadingArea } from './LoadingStyle';
import { type Loading as LoadingType } from '../../types/components';

const Loading: React.FC<LoadingType> = ({ isLoading }) => (
	<LoadingArea>{isLoading && <CircularProgress />}</LoadingArea>
);

export default Loading;
