import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import Landing from './containers/Landing';
import AppContainer from './layout/AppContainer';
import theme from './theme';
import AppWrapper from './layout/AppWrapper';
import store from './store';
import { Provider } from 'react-redux';
import { setAuthToken } from './utils/setAuthToken';
import { loadUser } from './store/userSlice';

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

// set axios headers before app is loaded, if token is present
// occurs when refreshing page
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // load user data if token has been filled
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
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
      </Provider>
    </ThemeProvider>
  );
};

export default App;
