import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { Header } from './components';
import { Dashboard } from './components';
import { SendEmail } from './containers';

import { fetchUser } from './slices/auth.slice';

const LandingPage = () => <div>LandingPage</div>;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <Container>
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={LandingPage} />
        <Route path="/emails" exact component={Dashboard} />
        <Route path="/emails/send" component={SendEmail} />
      </BrowserRouter>
    </Container>
  );
};

export default App;
