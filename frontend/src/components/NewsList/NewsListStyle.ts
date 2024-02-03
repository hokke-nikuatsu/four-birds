import styled from 'styled-components';

export const StyledNewsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, 300px);
	justify-content: center;
	gap: 20px;
	margin: 0 auto;
	max-width: calc(1200px + 480px);

	@media (max-width: 1680px) {
		padding: 20px;
	}
`;
