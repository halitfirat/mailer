import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { Header } from './components';
import { ListEmails } from './containers';
import { ListTemplates } from './containers';
import { LandingPage } from './components';
import { SendEmail } from './containers';

import { fetchUser } from './slices/auth.slice';

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
        <Route path="/emails" exact component={ListEmails} />
        <Route path="/emails/send" component={SendEmail} />
        <Route path="/templates" component={ListTemplates} />
      </BrowserRouter>
    </Container>
  );
};

export default App;
