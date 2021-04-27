import React from 'react';
import { makeStyles, Typography, Button, Box } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    margin: '25px 50px'
  },
  containerButton: {
    textAlign: 'right'
  }
});

const Message = ({ text, onClose }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography variant="h5">{text}</Typography>
      <Box className={classes.containerButton} mt={4}>
        <Button onClick={onClose} variant="contained" color="primary">
          OK
        </Button>
      </Box>
    </Box>
  );
};

export default Message;
