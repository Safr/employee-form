import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.scss';

const Button = ({ btnType, className, children }) => {
  const ButtonClasses = [className, classes.Button];
  return (
    <button
      type={btnType}
      className={ButtonClasses.join(' ')}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string.isRequired,
  btnType: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Button;
