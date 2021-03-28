import React from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

const Modal = ({ open, children, onClose }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlays} onClick={onClose}></div>
      <div className={styles.modals}>{children}</div>
    </>,
    document.getElementById('portal')
  );
};

export default Modal;
