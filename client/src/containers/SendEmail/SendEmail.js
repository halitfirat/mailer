import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  Input,
  FormHelperText,
  Container,
  Paper,
  Button,
  Typography,
  Grid,
  Box,
  Checkbox,
  MenuItem,
  Select,
  makeStyles
} from '@material-ui/core/';

import { Modal, Message } from '../../components';
import { sendEmail, saveTemplate } from './SendEmail.slice';
import { listTemplates } from '../ListTemplates/ListTemplates.slice';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  container: {
    marginTop: '30px'
  },
  paper: {
    padding: '20px'
  }
}));

const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const NewEmail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [template, setTemplate] = useState('');
  const [modalOpen, setModalOpen] = useState(true);
  const sendEmailInProgress = useSelector(
    (state) => state.sendEmail.sendEmailInProgress
  );
  const user = useSelector((state) => state.auth.user);
  const templates = useSelector((state) => state.listTemplates.templates);
  const history = useHistory();
  const { handleSubmit, errors, control, setValue } = useForm();

  useEffect(() => {
    dispatch(listTemplates());
  }, []);

  const setValues = (replyTo, to, subject, text) => {
    setValue('replyTo', replyTo);
    setValue('to', to);
    setValue('subject', subject);
    setValue('text', text);
  };

  const onTemplateChange = (e) => {
    setTemplate(e.target.value);

    if (!e.target.value) {
      setValues('', '', '', '');
    } else if (templates.length) {
      const myTemplate = templates.find((t) => t._id === e.target.value);

      const { replyTo, to, subject, text } = myTemplate;

      setValues(replyTo, to, subject, text);
    }
  };

  const onModalClose = () => {
    setModalOpen(false);
  };

  const onSubmit = (data) => {
    dispatch(sendEmail(data, history));

    if (data.createTemplate) {
      dispatch(saveTemplate(data));
    }
  };

  return (
    <Container className={classes.container} maxWidth="sm">
      {user ? (
        <Paper className={classes.paper} elevation={4}>
          <Typography variant="h6">New Email</Typography>

          <Grid container justify="flex-end">
            <Controller
              render={(props) => {
                return (
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="template-label">Template</InputLabel>

                    <Select
                      {...props}
                      labelId="template-label"
                      label="Template"
                      value={template}
                      onChange={onTemplateChange}
                    >
                      <MenuItem value="">None</MenuItem>
                      {templates.map((t) => {
                        return (
                          <MenuItem key={t._id} value={t._id}>
                            {t.subject}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                );
              }}
              name="template"
              control={control}
            />
          </Grid>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              render={(props) => {
                return (
                  <FormControl margin={'dense'} fullWidth>
                    <InputLabel htmlFor="my-input">Sender</InputLabel>

                    <Input
                      id="my-input"
                      {...props}
                      error={errors.replyTo ? true : false}
                      aria-describedby="my-helper-text"
                    />

                    <FormHelperText id="my-helper-text" error>
                      {errors.replyTo ? 'Email is invalid' : null}
                    </FormHelperText>
                  </FormControl>
                );
              }}
              name="replyTo"
              defaultValue=""
              control={control}
              rules={{ required: true, pattern }}
            />

            <Controller
              render={(props) => {
                return (
                  <FormControl margin={'dense'} fullWidth>
                    <InputLabel htmlFor="my-input">Receiver</InputLabel>

                    <Input
                      id="my-input"
                      {...props}
                      error={errors.to ? true : false}
                      aria-describedby="my-helper-text"
                    />

                    <FormHelperText id="my-helper-text" error>
                      {errors.to ? 'Email is invalid' : null}
                    </FormHelperText>
                  </FormControl>
                );
              }}
              name="to"
              defaultValue=""
              control={control}
              rules={{ required: true, pattern }}
            />

            <Controller
              render={(props) => {
                return (
                  <FormControl margin={'dense'} fullWidth>
                    <InputLabel htmlFor="my-input">Subject</InputLabel>

                    <Input
                      id="my-input"
                      {...props}
                      error={errors.subject ? true : false}
                      aria-describedby="my-helper-text"
                    />

                    <FormHelperText id="my-helper-text" error>
                      {errors.subject ? 'Required' : null}
                    </FormHelperText>
                  </FormControl>
                );
              }}
              name="subject"
              defaultValue=""
              control={control}
              rules={{ required: true }}
            />

            <Controller
              render={(props) => {
                return (
                  <FormControl margin={'dense'} fullWidth>
                    <InputLabel htmlFor="my-input">Message</InputLabel>

                    <Input
                      id="my-input"
                      {...props}
                      error={errors.text ? true : false}
                      aria-describedby="my-helper-text"
                    />

                    <FormHelperText id="my-helper-text" error>
                      {errors.text ? 'Required' : null}
                    </FormHelperText>
                  </FormControl>
                );
              }}
              name="text"
              defaultValue=""
              control={control}
              rules={{ required: true }}
            />

            <Box component={Grid} container justify="space-between" mt={4}>
              <FormControlLabel
                control={
                  <Controller
                    render={(props) => {
                      return (
                        <Checkbox
                          {...props}
                          onChange={(e) => props.onChange(e.target.checked)}
                          color="primary"
                        />
                      );
                    }}
                    name="createTemplate"
                    defaultValue={false}
                    control={control}
                  />
                }
                label="Create Template"
              />

              <Box pt={0.6}>
                <Button onClick={() => history.goBack()} color="primary">
                  Cancel
                </Button>

                <Button type="submit" color="primary">
                  {!sendEmailInProgress ? (
                    'Send'
                  ) : (
                    <CircularProgress size={14} />
                  )}
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      ) : (
        <Modal open={modalOpen} onClose={onModalClose}>
          <Message onClose={onModalClose} text="Login required!" />
        </Modal>
      )}
    </Container>
  );
};

export default NewEmail;
