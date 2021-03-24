import { useForm } from 'react-hook-form';
import axios from 'axios';

import styles from './EmailNew.module.css';

const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const EmailNew = () => {
  const { register, handleSubmit, errors } = useForm();

  // const sendMail = async (data) => {
  //   await axios.post('/api/emails', data);
  //   console.log(data);
  // };

  return (
    <form onSubmit={handleSubmit((data) => axios.post('/api/emails', data))}>
      <input name="replyTo" placeholder="Sender" ref={register({ pattern })} />
      {errors.sender && <span>Email is not valid</span>}

      <input name="to" placeholder="Receiver" ref={register({ pattern })} />
      {errors.receiver && <span>Email is not valid</span>}

      <input
        name="subject"
        placeholder="Subject"
        ref={register({ required: true })}
      />
      {errors.subject && <span>Subject is required</span>}

      <input
        name="text"
        placeholder="Your message..."
        ref={register({ required: true })}
      />
      {errors.text && <span>Message is required</span>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default EmailNew;
