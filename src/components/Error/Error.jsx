import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Error.scss';

const Error = (props) =>  (
  <span className={classes.error}>Поле является обязательным</span>
);

export default Error;
