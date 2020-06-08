import React from 'react';
import styled from 'styled-components';

const WrapperContainer = styled.div`
  padding: 48px 12px;
  max-width: 800px;
  height: 100%;
  margin: 0 auto;
  text-align: center;
  z-index: 99;
`;

interface Props {
  children: JSX.Element | JSX.Element[];
}

const AppWrapper: React.FC<Props> = ({ children }) => (
  <WrapperContainer>{children}</WrapperContainer>
);

export default AppWrapper;
