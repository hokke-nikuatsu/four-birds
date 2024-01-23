import styled from 'styled-components';

export const NewsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 20px;
	padding: 20px 240px;
	margin-left: auto;
	margin-right: auto;
	max-width: 1200px;

	@media (max-width: 1200px) {
		padding: 20px;
	}
`;
