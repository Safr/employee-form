import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Suggestions.scss';

const Suggestions = ({ suggestions, getValue }) => (
  <ul className={classes.SuggestionList}>
    {suggestions.map((suggestion, index) => (
      <li
        key={suggestion.value + index}
        onMouseEnter={() => getValue(suggestion.value)}
      >
        {suggestion.value}
      </li>
    ))}
  </ul>
);

Suggestions.propTypes = {
  getValue: PropTypes.func.isRequired,
  suggestions: PropTypes.array.isRequired,
};

export default Suggestions;
