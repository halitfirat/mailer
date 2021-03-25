import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import styles from './SendEmail.module.css';
import { sendEmail } from './SendEmail.slice';

const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const NewEmail = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  // const sendMail = async (data) => {
  //   await axios.post('/api/emails', data);
  //   console.log(data);
  // };

  return (
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

      <button type="submit">Submit</button>
    </form>
  );
};

export default NewEmail;
