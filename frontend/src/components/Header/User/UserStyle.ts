import styled from 'styled-components';

export const StyledUser = styled.div`
	position: absolute;
	right: 20px;
	display: flex;
	align-items: center;
`;

export const StyledUserLogin = styled.button`
	background-color: #1976d2;
	color: white;
	padding: 8px 16px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition:
		background-color 0.3s ease,
		box-shadow 0.3s;

	&:hover {
		background-color: #1565c0;
	}

	&:active {
		background-color: #1548c0;
	}
`;

export const StyledUserLogout = styled(StyledUserLogin)`
	background-color: #d3502f;

	&:hover {
		background-color: #d32f2f;
	}

	&:active {
		background-color: #c62828;
	}
`;

export const StyledUserIcon = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	margin-right: 10px;
`;

export const StyledUserName = styled.div`
	display: inline;
	margin-right: 20px;
	vertical-align: middle;
`;
