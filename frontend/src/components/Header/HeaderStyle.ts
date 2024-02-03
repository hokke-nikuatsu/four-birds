import styled from 'styled-components';

export const Spacer = styled.div`
	flex: 1;
`;

export const StyledHeader = styled.header`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 68px;
	padding: 0px 0;
	background: #fff;
	z-index: 100;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const LogoImage = styled.img`
	width: auto;
	height: 48px;
`;

export const MenuIcon = styled.img`
	width: 28px;
`;

export const MenuButton = styled.button`
	background-color: transparent;
	border: none;
	padding: 8px;
	margin-left: 16px;
	border-radius: 50%;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #1976d2;

	&:hover {
		background-color: rgba(0, 0, 0, 0.04);
	}

	&:focus {
		outline: none;
	}
`;
