import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

import styles from './Dashboard.module.css';

import { ListEmails } from '../../containers';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();

  return (
    <>
      <ListEmails />
      {user ? (
        <Button
          className={styles.button}
          variant="contained"
          color="primary"
          onClick={() => history.push('/emails/send')}
        >
          Send
        </Button>
      ) : null}
    </>
  );
};

export default Dashboard;
