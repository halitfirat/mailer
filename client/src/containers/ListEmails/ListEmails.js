import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { format } from 'date-fns';

import styles from './ListEmails.module.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import {
  Typography,
  makeStyles,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Paper
} from '@material-ui/core';

import { listEmails, deleteEmail } from './ListEmails.slice';
import { Modal } from '../../components';
import { UpdateEmail } from '../../containers';

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const ListEmails = () => {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [deletingEmailId, setDeletingEmailId] = useState('');
  const [updatingEmailId, setUpdatingEmailId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

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

  const onUpdateClick = (emailId) => {
    setUpdatingEmailId(emailId);
    setModalOpen(true);
  };

  const getUpdatingEmail = () => {
    return emails.filter((email) => email._id === updatingEmailId)[0];
  };

  const onModalClose = () => {
    setModalOpen(false);
  };

  const renderEmails = () => {
    return (
      <Paper elevation={4}>
        {listEmailsInProgress ? (
          <CircularProgress />
        ) : (
          emails.map(({ sent, replyTo, to, subject, text, _id }, i, arr) => {
            return (
              <>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <EmailRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={format(new Date(sent), 'yyyy-MM-dd')}
                  />
                  <ListItemText primary={replyTo} />
                  <ListItemText primary={to} />
                  <ListItemText primary={subject} />
                  <ListItemText primary={text} />
                  <ListItemSecondaryAction>
                    {_id === deletingEmailId && deleteEmailInProgress ? (
                      <CircularProgress size={14} />
                    ) : (
                      <IconButton
                        onClick={() => onDeleteClick(_id)}
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() => onUpdateClick(_id)}
                      edge="end"
                      aria-label="delete"
                    >
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {arr.length - 1 !== i ? <hr /> : null}
              </>
            );
          })
        )}
        <Modal open={modalOpen} onClose={onModalClose}>
          <UpdateEmail email={getUpdatingEmail()} onClose={onModalClose} />
        </Modal>
      </Paper>
    );
  };

  return (
    <>
      {user ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <List dense={dense}>{renderEmails()}</List>
          </Grid>
        </Grid>
      ) : (
        <span>You must login!</span>
      )}
    </>
  );
};

export default ListEmails;
