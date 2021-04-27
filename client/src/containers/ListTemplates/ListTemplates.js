import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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

import { UpdateTemplate } from '../../containers';
import { listTemplates, deleteTemplate } from './ListTemplates.slice';
import { Modal, Message } from '../../components';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr) auto',
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

const ListTemplates = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [deletingTemplateId, setDeletingTemplateId] = useState('');
  const [updatingTemplateId, setUpdatingTemplateId] = useState('');
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

  const user = useSelector((state) => state.auth.user);
  const listTemplatesInProgress = useSelector(
    (state) => state.listTemplates.listTemplatesInProgress
  );
  const templates = useSelector((state) => state.listTemplates.templates);
  const deleteTemplateInProgress = useSelector(
    (state) => state.listTemplates.deleteTemplateInProgress
  );

  useEffect(() => {
    dispatch(listTemplates());
  }, []);

  const onDeleteClick = (templateId) => {
    setDeletingTemplateId(templateId);
    dispatch(deleteTemplate(templateId));
  };

  const onUpdateClick = (templateId) => {
    setUpdatingTemplateId(templateId);
    setUpdateModalOpen(true);
  };

  const getUpdatingTemplate = () => {
    return templates.filter(
      (template) => template._id === updatingTemplateId
    )[0];
  };

  const onModalClose = () => {
    setModalOpen(false);
  };

  const onUpdateModalClose = () => {
    setUpdateModalOpen(false);
  };

  const renderTemplates = () => {
    return (
      <>
        <Paper elevation={4}>
          {listTemplatesInProgress ? (
            <LinearProgress />
          ) : (
            templates.map(({ replyTo, to, subject, text, _id }, i, arr) => {
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
                          {_id === deletingTemplateId &&
                          deleteTemplateInProgress ? (
                            <CircularProgress size={24} />
                          ) : (
                            <DeleteIcon />
                          )}
                        </IconButton>

                        <IconButton
                          onClick={() => onUpdateClick(_id)}
                          edge="end"
                          aria-label="delete"
                          className={classes.buttonItem}
                        >
                          <EditIcon />
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
      </>
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
          TEMPLATES
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
            onClick={() => history.push('/emails')}
          >
            Sent
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <List>{renderTemplates()}</List>
            </Grid>
          </Grid>
        </>
      ) : (
        <Modal open={modalOpen} onClose={onModalClose}>
          <Message onClose={onModalClose} text="Login required!" />
        </Modal>
      )}

      <Modal open={updateModalOpen} onClose={onUpdateModalClose}>
        <UpdateTemplate
          template={getUpdatingTemplate()}
          onClose={onUpdateModalClose}
        />
      </Modal>
    </>
  );
};

export default ListTemplates;
