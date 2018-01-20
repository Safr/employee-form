import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import classes from './Calendar.scss';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
    this.props.sendOnChange(date._d.toString());
  }

  render() {
    const calendarClasses = this.props.invalid ? [classes.CalendarElement, classes.Invalid] : [classes.CalendarElement];
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        locale="ru"
        placeholderText="Дата рождения"
        className={calendarClasses.join(' ')}
      />
    );
  }
}

Calendar.propTypes = {
  sendOnChange: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
};

