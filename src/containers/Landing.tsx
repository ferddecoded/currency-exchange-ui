import React from 'react';
import styled from 'styled-components';
import { H1 } from '../components/typography/Heading';
import { Button } from '../components/button/Button';
import { Grid } from '../components/grid/Grid';
import { Box } from '../components/box/Box';

const Container = styled.div`
  box-shadow: ${({ theme }) => theme.heavyBS};
  background-color: ${({ theme }) => theme.darkPurple};
  height: 100%;
  border-radius: 5px;
  padding: 48px 0px;
`;

const HeadingContainer = styled.div`
  width: calc(100% - 32px);
  margin: 16px;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 5px;
`;

const StyledBox = styled(Box)`
  width: 66.66%;
  margin: 96px auto 0px;
`;

const StyledGrid = styled(Grid)`
  justify-content: space-between;
`;

const Landing: React.FC<Props> = (): JSX.Element => {
  fetch('http://localhost:5000/api/currencyData', {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => data);
  return (
    <Container>
      <HeadingContainer>
        <H1>Exchanges</H1>
      </HeadingContainer>
      <StyledBox>
        <StyledGrid>
          <Button>Log In</Button>
          <Button>Sign In As Guest</Button>
        </StyledGrid>
      </StyledBox>
    </Container>
  );
};

interface Props {}

export default Landing;
