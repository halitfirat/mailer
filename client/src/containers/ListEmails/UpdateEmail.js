import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

import { updateEmail } from './ListEmails.slice';

const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UpdateEmail = ({ email, onClose }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const updateEmailInProgress = useSelector(
    (state) => state.listEmails.updateEmailInProgress
  );

  const sentFormatted = format(new Date(email.sent), 'yyyy-MM-dd');

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) =>
          dispatch(updateEmail(email._id, data, onClose))
        )}
      >
        <input
          name="sent"
          type="date"
          defaultValue={sentFormatted}
          ref={register({ required: true })}
        />
        <input
          name="replyTo"
          defaultValue={email.replyTo}
          ref={register({ required: true, pattern })}
        />
        {errors.replyTo && <span>Email not valid</span>}
        <input
          name="to"
          defaultValue={email.to}
          ref={register({ required: true, pattern })}
        />
        {errors.to && <span>Email not valid</span>}
        <input
          name="subject"
          defaultValue={email.subject}
          ref={register({ required: true })}
        />
        {errors.subject && <span>Required</span>}
        <input
          name="text"
          defaultValue={email.text}
          ref={register({ required: true })}
        />
        {errors.text && <span>Required</span>}
        <button onClick={onClose}>Cancel</button>
        <button type="submit">
          Submit{' '}
          {updateEmailInProgress && (
            <div class="spinner-border spinner-border-sm" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateEmail;
