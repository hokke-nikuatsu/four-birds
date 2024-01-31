import { Link } from 'react-router-dom';
import { StyledHeader, LogoImage } from './HeaderStyle';

const Header = () => (
	<StyledHeader>
		<Link to="/">
			<LogoImage src={PATH_TO_LOGO_IMAGE} alt="Logo" />
		</Link>
	</StyledHeader>
);

export default Header;
