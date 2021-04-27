import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  modals: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    borderRadius: '4px',
    zIndex: 1000
  },
  overlays: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000
  }
});

const Modal = ({ open, children, onClose }) => {
  const classes = useStyles();
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className={classes.overlays} onClick={onClose}></div>
      <div className={classes.modals}>{children}</div>
    </>,
    document.getElementById('portal')
  );
};

export default Modal;
