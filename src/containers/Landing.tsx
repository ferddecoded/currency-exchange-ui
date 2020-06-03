import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { H1 } from '../components/typography/Heading';
import { Button } from '../components/button/Button';
import { Grid } from '../components/grid/Grid';
import { Box } from '../components/box/Box';
import { Image } from '../components/image/Image';
import request from '../api/request';
import { TextInput } from '../components/form/TextInput';
import { loginUser } from '../store/userSlice';

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
  width: 66.66%;
  margin: 0 auto;
`;

const StyledImage = styled(Image)`
  border-radius: 5px;
`;

const Landing: React.FC<Props> = (): JSX.Element => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard" />;
  // }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  const fetchData = async () => {
    const res = await request({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/todos/1',
    });
    console.log(res);

    const currRes = await request({
      method: 'GET',
      url: '/api/currencyData',
    });

    console.log(currRes);
  };

  fetchData();

  const { email, password } = formData;
  return (
    <Container>
      <StyledBox>
        <StyledGrid>
          <HeadingContainer>
            <H1>Exchanges</H1>
          </HeadingContainer>
          <Grid>
            <Button onClick={onSubmit}>Log In</Button>
            <TextInput
              type="text"
              id="email"
              label="email"
              onChange={onChange}
              value={email}
            />
            <TextInput
              type="password"
              id="password"
              label="password"
              onChange={onChange}
              value={password}
            />
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
