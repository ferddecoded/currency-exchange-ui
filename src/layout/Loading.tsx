import React from 'react';
import styled from 'styled-components';
import { Box } from '../components/box/Box';
import { Grid } from '../components/grid/Grid';
import { Image } from '../components/image/Image';

const Row = styled(Grid)``;

const LoadingContainer = styled(Box)`
  max-width: 100px;
  margin: 50px auto;
`;

const Loading = () => (
  <Row>
    <LoadingContainer>
      <Image src="/assets/loading.gif" alt="Loading gif" />
    </LoadingContainer>
  </Row>
);

export default Loading;
