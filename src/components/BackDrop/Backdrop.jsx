import React from 'react';
import PropTypes from 'prop-types';
import classes from './Backdrop.scss';

const Backdrop = ({ show, clicked }) => (
  show ?
    <div
      className={classes.Backdrop}
      onClick={clicked}
    /> : null
);

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default Backdrop;
