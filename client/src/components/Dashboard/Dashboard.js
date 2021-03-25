import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styles from './Dashboard.module.css';

import { Button } from '../../components';
import { ListEmails } from '../../containers';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();

  return (
    <>
      <ListEmails />
      {user ? (
        <Button label="Write" onClick={() => history.push('/emails/send')} />
      ) : null}
    </>
  );
};

export default Dashboard;
