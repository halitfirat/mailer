import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ListEmails.module.css';

import { listEmails } from './ListEmail.slice';

const ListEmails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const listEmailsInProgress = useSelector(
    (state) => state.listEmails.listEmailsInProgress
  );
  const emails = useSelector((state) => state.listEmails.emails);

  useEffect(() => {
    dispatch(listEmails());
  }, []);

  const renderEmails = () => {
    return (
      <>
        {listEmailsInProgress ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          emails.map(({ sent, replyTo, to, subject }) => {
            return (
              <li>
                <div>{sent}</div>
                <div>{replyTo}</div>
                <div>{to}</div>
                <div>{subject}</div>
              </li>
            );
          })
        )}
      </>
    );
  };

  return <>{user ? <ul>{renderEmails()}</ul> : <span>You must login!</span>}</>;
};

export default ListEmails;
