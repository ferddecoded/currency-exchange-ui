import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Landing from './containers/Landing';
import AppContainer from './layout/AppContainer';
import theme from './theme';
import AppWrapper from './layout/AppWrapper';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Raleway', sans-serif;
    font-size: 1.5rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.lightgrey};
  }
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
  }

  img {
    width: 100%;
  }

  svg {
    height: 100%;
    width: 100%;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <AppWrapper>
            <Switch>
              <Route exact path="/" component={Landing} />
            </Switch>
          </AppWrapper>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
};

export default App;
