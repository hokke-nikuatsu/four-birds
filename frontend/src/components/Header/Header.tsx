import { Link } from 'react-router-dom';
import {
	StyledHeader,
	LogoImage,
	MenuButton,
	Spacer,
	MenuIcon,
} from './HeaderStyle';
import User from './User/User';
import { PATH_TO_LOGO_IMAGE, PATH_TO_MENU_ICON } from '../../utils/common';

const Header = () => (
	<StyledHeader>
		<MenuButton>
			<MenuIcon src={PATH_TO_MENU_ICON} alt={'Menu icon'} />
		</MenuButton>
		<Spacer />
		<Link to="/">
			<LogoImage src={PATH_TO_LOGO_IMAGE} alt="Logo" />
		</Link>
		<Spacer />
		<User />
	</StyledHeader>
);

export default Header;
