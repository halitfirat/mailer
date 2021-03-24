import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { Header } from './components';
import { EmailNew } from './containers';
import { Dashboard } from './containers';

import { fetchUser } from './slices/authSlice';

const LandingPage = () => <div>LandingPage</div>;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Route path="/" exact component={LandingPage} />
      <Route path="/emails" exact component={Dashboard} />
      <Route path="/emails/new" component={EmailNew} />
    </BrowserRouter>
  );
};

export default App;
