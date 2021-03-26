import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ListEmails.module.css';

import { listEmails, deleteEmail } from './ListEmails.slice';

const ListEmails = () => {
  const dispatch = useDispatch();

  const [deletingEmailId, setDeletingEmailId] = useState('');

  const user = useSelector((state) => state.auth.user);
  const listEmailsInProgress = useSelector(
    (state) => state.listEmails.listEmailsInProgress
  );
  const emails = useSelector((state) => state.listEmails.emails);
  const deleteEmailInProgress = useSelector(
    (state) => state.listEmails.deleteEmailInProgress
  );

  useEffect(() => {
    dispatch(listEmails());
  }, []);

  const onDeleteClick = (emailId) => {
    setDeletingEmailId(emailId);
    dispatch(deleteEmail(emailId));
  };

  const renderEmails = () => {
    return (
      <>
        {listEmailsInProgress ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          emails.map(({ sent, replyTo, to, subject, _id }) => {
            return (
              <>
                <li key={_id}>
                  <div>{sent}</div>
                  <div>{replyTo}</div>
                  <div>{to}</div>
                  <div>{subject}</div>
                </li>
                <button onClick={() => onDeleteClick(_id)}>
                  delete{' '}
                  {_id === deletingEmailId && deleteEmailInProgress ? (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : null}
                </button>
              </>
            );
          })
        )}
      </>
    );
  };

  return <>{user ? <ul>{renderEmails()}</ul> : <span>You must login!</span>}</>;
};

export default ListEmails;
