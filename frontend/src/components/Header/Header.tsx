import { Link } from 'react-router-dom';
import { StyledHeader, LogoImage } from './HeaderStyle';

const Header = () => (
	<StyledHeader>
		<Link to="/">
			<LogoImage src="/images/logo.png" alt="Logo" />
		</Link>
	</StyledHeader>
);

export default Header;
