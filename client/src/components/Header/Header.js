import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Paper } from '@material-ui/core';

import styles from './Header.module.css';

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  const renderAuth = () => {
    switch (user) {
      case null:
        return;
      case false:
        return (
          <a className={styles.link} variant="contained" href="/auth/google">
            <Button variant="contained" color="secondary">
              Sign in with Google
            </Button>
          </a>
        );
      default:
        return (
          <a className={styles.link} href="/api/logout">
            <Button variant="contained" color="secondary">
              Logout
            </Button>
          </a>
        );
    }
  };

  return (
    <Paper elevation={1} className={styles.header}>
      {renderAuth()}
    </Paper>
  );
};

export default Header;
