import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../BackDrop/Backdrop';
import classes from './Modal.scss';

const Modal = ({ show, modalClosed, children }) => (
  <Auxiliary>
    <div
      className={classes.Modal}
      style={{
        transform: show ? 'translateY(0)'
          : 'translateY(-100vh)',
        opacity: show ? '1' : '0',
      }}
    >
      {children}
    </div>
    <Backdrop
      show={show}
      clicked={modalClosed}
    />
  </Auxiliary>
);

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  modalClosed: PropTypes.func.isRequired,
};

export default Modal;

