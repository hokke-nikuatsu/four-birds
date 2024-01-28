import styled from 'styled-components';

export const StyledHeader = styled.header`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 52px;
	padding: 8px 0;
	background: #fff;
	z-index: 1000;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	opacity: 0.95;
`;

export const LogoImage = styled.img`
	width: 180px;
	height: auto;
`;
