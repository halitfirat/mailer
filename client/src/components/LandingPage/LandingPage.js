import React from 'react';

import styles from './LandingPage.module.css';
import { Typography } from '@material-ui/core';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <Typography variant={'h1'} className={styles.title}>
        Send Emails
      </Typography>
      <Typography variant={'h4'}>
        Start sending Emails for free! Only Login required!
      </Typography>
    </div>
  );
};

export default LandingPage;
