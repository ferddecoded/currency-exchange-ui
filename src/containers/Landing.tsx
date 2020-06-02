import React from 'react';
import styled from 'styled-components';
import { H1 } from '../components/typography/Heading';
import { Button } from '../components/button/Button';
import { Grid } from '../components/grid/Grid';
import { Box } from '../components/box/Box';
import { Image } from '../components/image/Image';

const Container = styled.div`
  box-shadow: ${({ theme }) => theme.heavyBS};
  background-color: ${({ theme }) => theme.darkPurple};
  height: 100%;
  border-radius: 5px;
  padding: 24px 0px;
`;

const HeadingContainer = styled.div`
  width: calc(100% - 32px);
  margin: 16px;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 5px;
  padding: 16px 0px;
  box-shadow: ${({ theme }) => theme.lightBS};
  margin-bottom: 48px;
`;

const StyledBox = styled(Box)`
  width: 66.66%;
  margin: 0px auto 0px;
  height: 100%;
`;

const StyledGrid = styled(Grid)`
  justify-content: space-between;
  height: 100%;
`;

const ImageContainer = styled(Box)`
  padding: 16px;
`;

const StyledImage = styled(Image)`
  border-radius: 5px;
`;

const Landing: React.FC<Props> = (): JSX.Element => {
  fetch('http://localhost:5000/api/currencyData', {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => data);
  return (
    <Container>
      <StyledBox>
        <StyledGrid>
          <HeadingContainer>
            <H1>Exchanges</H1>
          </HeadingContainer>
          <Grid>
            <Button>Log In</Button>
            <Button>Sign In As Guest</Button>
          </Grid>
          <ImageContainer>
            <StyledImage src="/assets/currency-graph.png" alt="text" />
          </ImageContainer>
        </StyledGrid>
      </StyledBox>
    </Container>
  );
};

interface Props {}

export default Landing;
