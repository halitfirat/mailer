import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import styles from './SendEmail.module.css';
import { sendEmail } from './SendEmail.slice';

const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const NewEmail = () => {
  const dispatch = useDispatch();
  const sendEmailInProgress = useSelector(
    (state) => state.sendEmail.sendEmailInProgress
  );
  const user = useSelector((state) => state.auth.user);
  const { register, handleSubmit, errors } = useForm();

  return (
    <>
      {user ? (
        <form onSubmit={handleSubmit((data) => dispatch(sendEmail(data)))}>
          <input
            name="replyTo"
            placeholder="Sender"
            ref={register({ required: true, pattern })}
          />
          {errors.replyTo && <span>valid email required</span>}

          <input
            name="to"
            placeholder="Receiver"
            ref={register({ required: true, pattern })}
          />
          {errors.to && <span>valid email required</span>}

          <input
            name="subject"
            placeholder="Subject"
            ref={register({ required: true })}
          />
          {errors.subject && <span>subject required</span>}

          <input
            name="text"
            placeholder="Your message..."
            ref={register({ required: true })}
          />
          {errors.text && <span>message required</span>}

          <button type="submit">
            Submit{' '}
            {sendEmailInProgress ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : null}
          </button>
        </form>
      ) : (
        <span>You must login!</span>
      )}
    </>
  );
};

export default NewEmail;
