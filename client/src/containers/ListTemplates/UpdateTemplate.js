import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  CircularProgress,
  makeStyles
} from '@material-ui/core/';

import { updateTemplate } from '../ListTemplates/ListTemplates.slice';

const useStyles = makeStyles({
  container: {
    width: '400px'
  }
});

const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UpdateTemplate = ({ template, onClose }) => {
  const dispatch = useDispatch();
  const { handleSubmit, errors, control } = useForm();
  const classes = useStyles();

  const updateTemplateInProgress = useSelector(
    (state) => state.listTemplates.updateTemplateInProgress
  );

  return (
    <div className={classes.container}>
      <form
        onSubmit={handleSubmit((data) =>
          dispatch(updateTemplate(template._id, data, onClose))
        )}
      >
        <DialogTitle id="form-dialog-title">Update Template</DialogTitle>

        <DialogContent>
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
            defaultValue={template.replyTo}
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
            defaultValue={template.to}
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
            defaultValue={template.subject}
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
            defaultValue={template.text}
            control={control}
            rules={{ required: true }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>

          <Button type="submit" color="primary">
            {!updateTemplateInProgress ? (
              'Update'
            ) : (
              <CircularProgress size={14} />
            )}
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default UpdateTemplate;
