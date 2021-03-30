import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText,
  FormControl,
  InputLabel,
  Input,
  CircularProgress
} from '@material-ui/core/';

import styles from './UpdateEmail.module.css';

import { updateEmail } from './ListEmails.slice';

const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UpdateEmail = ({ email, onClose }) => {
  const dispatch = useDispatch();
  const { handleSubmit, errors, control } = useForm();

  const updateEmailInProgress = useSelector(
    (state) => state.listEmails.updateEmailInProgress
  );

  const sentFormatted = format(new Date(email.sent), 'yyyy-MM-dd');

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit((data) =>
          dispatch(updateEmail(email._id, data, onClose))
        )}
      >
        <DialogTitle id="form-dialog-title">Update Email</DialogTitle>

        <DialogContent>
          <Controller
            render={(props) => (
              <FormControl margin="dense" fullWidth>
                <InputLabel htmlFor="my-input">Sent</InputLabel>
                <Input
                  id="my-input"
                  {...props}
                  type="date"
                  aria-describedby="my-helper-text"
                  // error={errors.sent ? true : false}
                />
                {/* <FormHelperText id="my-helper-text" error>
                  {errors.replyTo ? 'Email is invalid' : null}
                </FormHelperText> */}
              </FormControl>
            )}
            name="sent"
            isError={errors.replyTo ? true : false}
            defaultValue={sentFormatted}
            control={control}
            // rules={{ required: true, pattern }}
          />

          <Controller
            render={(props) => (
              <FormControl margin="dense" fullWidth>
                <InputLabel htmlFor="my-input">Sender</InputLabel>
                <Input
                  id="my-input"
                  {...props}
                  aria-describedby="my-helper-text"
                  error={errors.replyTo ? true : false}
                />
                <FormHelperText id="my-helper-text" error>
                  {errors.replyTo ? 'Email is invalid' : null}
                </FormHelperText>
              </FormControl>
            )}
            name="replyTo"
            isError={errors.replyTo ? true : false}
            defaultValue={email.replyTo}
            control={control}
            rules={{ required: true, pattern }}
          />

          <Controller
            render={(props) => (
              <FormControl margin="dense" fullWidth>
                <InputLabel htmlFor="my-input">Receiver</InputLabel>
                <Input
                  id="my-input"
                  {...props}
                  aria-describedby="my-helper-text"
                  error={errors.to ? true : false}
                />
                <FormHelperText id="my-helper-text" error>
                  {errors.to ? 'Email is invalid' : null}
                </FormHelperText>
              </FormControl>
            )}
            name="to"
            defaultValue={email.to}
            control={control}
            rules={{ required: true, pattern }}
            fullWidth
          />

          <Controller
            render={(props) => (
              <FormControl margin="dense" fullWidth>
                <InputLabel htmlFor="my-input">Subject</InputLabel>
                <Input
                  id="my-input"
                  {...props}
                  aria-describedby="my-helper-text"
                  error={errors.subject ? true : false}
                />
                <FormHelperText id="my-helper-text" error>
                  {errors.subject ? 'Required' : null}
                </FormHelperText>
              </FormControl>
            )}
            name="subject"
            defaultValue={email.subject}
            control={control}
            rules={{ required: true }}
          />

          <Controller
            render={(props) => (
              <FormControl margin="dense" fullWidth>
                <InputLabel htmlFor="my-input">Message</InputLabel>
                <Input
                  id="my-input"
                  {...props}
                  aria-describedby="my-helper-text"
                  error={errors.text ? true : false}
                  multiline
                />
                <FormHelperText id="my-helper-text" error>
                  {errors.text ? 'Required' : null}
                </FormHelperText>
              </FormControl>
            )}
            name="text"
            defaultValue={email.text}
            control={control}
            rules={{ required: true }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            {!updateEmailInProgress ? 'Update' : <CircularProgress size={14} />}
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default UpdateEmail;
