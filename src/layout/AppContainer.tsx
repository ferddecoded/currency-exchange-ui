import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.backgroundColor};
  z-index: 9;
`;

export default AppContainer;
