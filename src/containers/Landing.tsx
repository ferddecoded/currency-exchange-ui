import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { H1 } from '../components/typography/Heading';
import { Button } from '../components/button/Button';
import { Grid } from '../components/grid/Grid';
import { Box } from '../components/box/Box';
import { Image } from '../components/image/Image';
import { TextInput } from '../components/form/TextInput';
import { loginUser } from '../store/userSlice';
import { Divider } from '../layout/Divider';

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

const InputContainer = styled.div`
  margin: 24px 0px;

  div {
    margin-bottom: 12px;
  }
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
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    registerEmail: '',
    registerPassword: '',
    password2: '',
  });

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const loginOnChange = ({ target }) => {
    setLoginData({
      ...loginData,
      [target.name]: target.value,
    });
  };

  const registerOnChange = ({ target }) => {
    setRegisterData({
      ...registerData,
      [target.name]: target.value,
    });
  };

  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard" />;
  // }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
  };

  const { email, password } = loginData;
  const { registerEmail, registerPassword, password2 } = registerData;
  return (
    <Container>
      <StyledBox>
        <StyledGrid>
          <HeadingContainer>
            <H1>Exchanges</H1>
          </HeadingContainer>
          <Grid>
            <Button
              onClick={() => {
                if (registerOpen) {
                  setRegisterOpen(false);
                }
                setLoginOpen(!loginOpen);
              }}
              primary
            >
              Log In
            </Button>
            {loginOpen && (
              <InputContainer>
                <TextInput
                  type="text"
                  id="email"
                  label="email"
                  onChange={loginOnChange}
                  value={email}
                />
                <TextInput
                  type="password"
                  id="password"
                  label="password"
                  onChange={loginOnChange}
                  value={password}
                />
                <Box>
                  <Button onClick={onSubmit}>Enter</Button>
                </Box>
              </InputContainer>
            )}
            <Button
              onClick={() => {
                if (loginOpen) {
                  setLoginOpen(false);
                }
                setRegisterOpen(!registerOpen);
              }}
              primary
            >
              Register
            </Button>
            {registerOpen && (
              <InputContainer>
                <TextInput
                  type="text"
                  id="registerEmail"
                  label="Register your email"
                  onChange={registerOnChange}
                  value={registerEmail}
                />
                <TextInput
                  type="password"
                  id="registerPassword"
                  label="Create a password"
                  onChange={registerOnChange}
                  value={registerPassword}
                />
                <TextInput
                  type="password"
                  id="password2"
                  label="enter password again"
                  onChange={registerOnChange}
                  value={password2}
                />
                <Box>
                  <Button onClick={onSubmit}>Sign Up</Button>
                </Box>
              </InputContainer>
            )}
            <Divider color="#505562" />
            <Button primary>Sign In As Guest</Button>
          </Grid>
          <ImageContainer>
            <StyledImage src="/assets/currency.png" alt="text" />
          </ImageContainer>
        </StyledGrid>
      </StyledBox>
    </Container>
  );
};

interface Props {}

export default Landing;
