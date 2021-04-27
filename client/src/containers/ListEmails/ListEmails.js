import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import {
  makeStyles,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Paper,
  LinearProgress,
  CircularProgress,
  Typography,
  Box,
  Button
} from '@material-ui/core';

import { Modal, Message } from '../../components';
import { listEmails, deleteEmail } from './ListEmails.slice';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr) auto',
    gridGap: theme.spacing(4),
    width: '100%'
  },
  buttonItem: {
    padding: 0,
    marginRight: '6px',
    marginLeft: '6px'
  },
  buttonNavigation: {
    float: 'right'
  }
}));

const ListEmails = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [deletingEmailId, setDeletingEmailId] = useState('');
  const [modalOpen, setModalOpen] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const listEmailsInProgress = useSelector(
    (state) => state.listEmails.listEmailsInProgress
  );
  const emails = useSelector((state) => state.listEmails.emails);
  const deleteEmailInProgress = useSelector(
    (state) => state.listEmails.deleteEmailInProgress
  );

  useEffect(() => {
    dispatch(listEmails());
  }, []);

  const onDeleteClick = (emailId) => {
    setDeletingEmailId(emailId);
    dispatch(deleteEmail(emailId));
  };

  const onModalClose = () => {
    setModalOpen(false);
  };

  const renderEmails = () => {
    return (
      <Paper elevation={4}>
        {listEmailsInProgress ? (
          <LinearProgress />
        ) : (
          emails.map(({ sent, replyTo, to, subject, text, _id }, i, arr) => {
            return (
              <React.Fragment key={_id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <EmailRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>

                  <div className={classes.container}>
                    <Typography noWrap>
                      <ListItemText
                        primary={format(new Date(sent), 'yyyy-MM-dd')}
                      />
                    </Typography>

                    <Typography noWrap>
                      <ListItemText primary={replyTo} />
                    </Typography>

                    <Typography noWrap>
                      <ListItemText primary={to} />
                    </Typography>

                    <Typography noWrap>
                      <ListItemText primary={subject} />
                    </Typography>

                    <Typography noWrap>
                      <ListItemText primary={text} />
                    </Typography>

                    <ListItemText>
                      <IconButton
                        onClick={() => onDeleteClick(_id)}
                        edge="end"
                        aria-label="delete"
                        className={classes.buttonItem}
                      >
                        {_id === deletingEmailId && deleteEmailInProgress ? (
                          <CircularProgress size={24} />
                        ) : (
                          <DeleteIcon />
                        )}
                      </IconButton>
                    </ListItemText>
                  </div>
                </ListItem>

                {arr.length - 1 !== i ? <hr /> : null}
              </React.Fragment>
            );
          })
        )}
      </Paper>
    );
  };

  return (
    <>
      <Typography variant={'h3'}>
        <Box
          component={Grid}
          container
          justify="center"
          letterSpacing={2}
          fontWeight="fontWeightMedium"
          mt={3}
          mb={2.5}
        >
          SENT
        </Box>
      </Typography>

      {user ? (
        <>
          <Button
            className={classes.buttonNavigation}
            variant="contained"
            color="primary"
            onClick={() => history.push('/emails/send')}
          >
            Send Email
          </Button>

          <Box
            component={Button}
            className={classes.buttonNavigation}
            mr={1}
            variant="contained"
            color="default"
            onClick={() => history.push('/templates')}
          >
            Templates
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <List>{renderEmails()}</List>
            </Grid>
          </Grid>
        </>
      ) : (
        <Modal open={modalOpen} onClose={onModalClose}>
          <Message onClose={onModalClose} text="Login required!" />
        </Modal>
      )}
    </>
  );
};

export default ListEmails;
