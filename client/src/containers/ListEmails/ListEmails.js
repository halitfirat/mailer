import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ListEmails.module.css';

import { listEmails, deleteEmail } from './ListEmails.slice';
import { Modal } from '../../components';
import { UpdateEmail } from '../../containers';

const ListEmails = () => {
  const dispatch = useDispatch();

  const [deletingEmailId, setDeletingEmailId] = useState('');
  const [updatingEmailId, setUpdatingEmailId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

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

  const onUpdateClick = (emailId) => {
    setUpdatingEmailId(emailId);
    setModalOpen(true);
  };

  const getUpdatingEmail = () => {
    return emails.filter((email) => email._id === updatingEmailId)[0];
  };

  const onModalClose = () => {
    setModalOpen(false);
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
              <React.Fragment key={_id}>
                <li>
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
                <button onClick={() => onUpdateClick(_id)}>update</button>
              </React.Fragment>
            );
          })
        )}
        <Modal open={modalOpen} onClose={onModalClose}>
          <UpdateEmail email={getUpdatingEmail()} onClose={onModalClose} />
        </Modal>
      </>
    );
  };

  return <>{user ? <ul>{renderEmails()}</ul> : <span>You must login!</span>}</>;
};

export default ListEmails;
