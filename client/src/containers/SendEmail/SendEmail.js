import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  CircularProgress,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Container,
  Paper,
  Button
} from '@material-ui/core/';

import styles from './SendEmail.module.css';
import { sendEmail } from './SendEmail.slice';

const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const NewEmail = () => {
  const dispatch = useDispatch();
  const sendEmailInProgress = useSelector(
    (state) => state.sendEmail.sendEmailInProgress
  );
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();
  const { handleSubmit, errors, control } = useForm();

  return (
    <Container className={styles.container} maxWidth="sm">
      <Paper className={styles.paper} elevation={4}>
        <h3>Send Email</h3>
        {user ? (
          <form
            onSubmit={handleSubmit((data) =>
              dispatch(sendEmail(data, history))
            )}
          >
            <Controller
              render={(props) => {
                return (
                  <FormControl fullWidth>
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
              control={control}
              rules={{ required: true, pattern }}
            />

            <Controller
              render={(props) => {
                return (
                  <FormControl fullWidth>
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
              control={control}
              rules={{ required: true, pattern }}
            />

            <Controller
              render={(props) => {
                return (
                  <FormControl fullWidth>
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
              control={control}
              rules={{ required: true }}
            />

            <Controller
              render={(props) => {
                return (
                  <FormControl fullWidth>
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
              control={control}
              rules={{ required: true }}
            />

            <div className={styles.buttonContainer}>
              <Button type="submit">
                {!sendEmailInProgress ? 'Send' : <CircularProgress size={14} />}
              </Button>
            </div>
          </form>
        ) : (
          <span>You must login!</span>
        )}
      </Paper>
    </Container>
  );
};

export default NewEmail;
