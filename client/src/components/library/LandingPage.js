import React from 'react';
import { Typography, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    textAlign: 'center'
  }
});

const LandingPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Box mt={12} mb={4}>
        <Typography variant={'h1'}>
          <Box fontWeight={500} letterSpacing={3}>
            MAILER
          </Box>
        </Typography>
      </Box>
      <Typography variant={'h4'}>
        {' '}
        <Box letterSpacing={1}>SEND EMAILS - ONLY LOGIN REQUIRED</Box>
      </Typography>
    </div>
  );
};

export default LandingPage;
