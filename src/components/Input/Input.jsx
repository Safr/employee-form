import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classes from './Input.scss';

import Calendar from '../Calendar/Calendar';
import Error from '../Error/Error';
import Suggestions from '../Suggestions/Suggestions';
import CustomSelect from '../CustomSelect/CustomSelect';

const SEARCH_PARAMS = {
  surname: 'SURNAME',
  name: 'NAME',
  patronymic: 'PATRONYMIC',
};

const URL_PARAMS = {
  fio: 'fio',
  address: 'address',
  party: 'party',
};

const API_KEY = 'f9858b862c047ef1b1cea8757eb94ea40cf58388';
const BASE_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/';

class Input extends Component {
  state = {
    value: '',
    suggestions: [],
    isOpen: false,
  };

  getValue = (value) => {
    this.setState({ value });
    this.props.sendValue(this.state.value, this.props.id);
  }


  makeRequest = (id) => {
    let url = `${BASE_URL}${URL_PARAMS.fio}`;
    if (id === 'party') {
      url = `${BASE_URL}${URL_PARAMS[id]}`;
    } else if (id === 'address') {
      url = `${BASE_URL}${URL_PARAMS[id]}`;
    }
    axios({
      method: 'post',
      url,
      headers: {
        Authorization: `Token ${API_KEY}`,
        Accept: 'application/json',
        'Content-type': 'application/json',
        charset: 'UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
      data: {
        query: this.state.value,
        count: 5,
        parts: [SEARCH_PARAMS[id]],
      },
    })
      .then((response) => {
        this.setState({ suggestions: response.data.suggestions });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  inputHandler = (evt, id) => {
    evt.preventDefault();
    console.log(id);
    this.setState({ value: evt.target.value, isOpen: true });
    this.makeRequest(id);
  }

  handleFocus = evt => {
    this.setState({ isOpen: true });
  }

  handleBlur = evt => {
    this.setState({ isOpen: false });
  }

  inputWithoutAjaxHandler = (evt) => {
    this.setState({ value: evt.target.value });
    this.props.sendValue(evt.target.value, this.props.id);
  }

  datePickerHandler = (value) => {
    this.setState({ value });
    this.props.sendValue(value, this.props.id);
  }

  sendValuetoSelect = (value, id) => {
    this.setState({ value });
    this.props.sendValue(value, id);
  }


  render() {
    const labelClasses = [classes.HalfWidth];
    let inputElement = null;
    let inputClasses = [classes.InputElement];

    switch (this.props.id) {
    case ('surname'): {
      inputClasses = !this.props.isValid.surname.isValid ? [classes.InputElement, classes.Invalid] : inputClasses;
      inputElement = (
        <div style={{ position: 'relative' }} className={this.props.elementConfig.halfwidth ? labelClasses.join(' ') : null}>
          <input
            className={inputClasses.join(' ')}
            {...this.props.elementConfig}
            value={this.state.value}
            onChange={evt => this.inputHandler(evt, this.props.id)}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          {this.state.isOpen ?
            <Suggestions getValue={this.getValue} suggestions={this.state.suggestions} />
            :
            null
          }
          {
            !this.props.isValid.surname.isValid ?
              <Error />
              :
              null
          }
        </div>
      );
      break;
    }
    case ('name'): {
      inputClasses = !this.props.isValid.name.isValid ? [classes.InputElement, classes.Invalid] : inputClasses;
      inputElement = (
        <div style={{ position: 'relative' }} className={this.props.elementConfig.halfwidth ? labelClasses.join(' ') : null}>
          <input
            className={inputClasses.join(' ')}
            {...this.props.elementConfig}
            value={this.state.value}
            onChange={evt => this.inputHandler(evt, this.props.id)}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          {this.state.isOpen ?
            <Suggestions getValue={this.getValue} suggestions={this.state.suggestions} />
            :
            null
          }
          {
            !this.props.isValid.name.isValid ?
              <Error />
              :
              null
          }
        </div>
      );
      break;
    }
    case ('patronymic'):
      inputElement = (
        <div style={{ position: 'relative' }} className={this.props.elementConfig.halfwidth ? labelClasses.join(' ') : null}>
          <input
            className={inputClasses.join(' ')}
            {...this.props.elementConfig}
            value={this.state.value}
            onChange={evt => this.inputHandler(evt, this.props.id)}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          {this.state.isOpen ?
            <Suggestions getValue={this.getValue} suggestions={this.state.suggestions} />
            :
            null
          }
        </div>
      );
      break;
    case ('birthday'): {
      inputElement = (
        <div style={{ position: 'relative' }} className={this.props.elementConfig.halfwidth ? labelClasses.join(' ') : null}>
          <Calendar
            sendOnChange={value => this.datePickerHandler(value)}
            invalid={!this.props.isValid.birthday.isValid}
          />
          {
            !this.props.isValid.birthday.isValid ?
              <Error />
              :
              null
          }
        </div>
      );
      break;
    }
    case ('phone'): {
      inputClasses = !this.props.isValid.phone.isValid ?
        [classes.InputElement, classes.Invalid] : inputClasses;
      inputElement = (
        <div style={{ position: 'relative' }} className={this.props.elementConfig.halfwidth ? labelClasses.join(' ') : null}>
          <input
            className={inputClasses.join(' ')}
            {...this.props.elementConfig}
            value={this.state.value}
            onChange={evt => this.inputWithoutAjaxHandler(evt)}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          {
            !this.props.isValid.phone.isValid ?
              <Error />
              :
              null
          }
        </div>
      );
      break;
    }
    case ('email'): {
      inputClasses = !this.props.isValid.email.isValid ?
        [classes.InputElement, classes.Invalid] : inputClasses;
      inputElement = (
        <div style={{ position: 'relative' }} className={this.props.elementConfig.halfwidth ? labelClasses.join(' ') : null}>
          <input
            className={inputClasses.join(' ')}
            {...this.props.elementConfig}
            value={this.state.value}
            onChange={evt => this.inputWithoutAjaxHandler(evt)}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          {
            !this.props.isValid.email.isValid ?
              <Error />
              :
              null
          }
        </div>
      );
      break;
    }
    case ('address'):
      inputElement = (
        <div style={{ position: 'relative' }} className={this.props.elementConfig.halfwidth ? labelClasses.join(' ') : null}>
          <input
            className={inputClasses.join(' ')}
            {...this.props.elementConfig}
            value={this.state.value}
            onChange={evt => this.inputHandler(evt, this.props.id)}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          {this.state.isOpen ?
            <Suggestions getValue={this.getValue} suggestions={this.state.suggestions} />
            :
            null
          }
        </div>
      );
      break;
    case ('party'):
      inputElement = (
        <div style={{ position: 'relative' }} className={this.props.elementConfig.halfwidth ? labelClasses.join(' ') : null}>
          <input
            className={inputClasses.join(' ')}
            {...this.props.elementConfig}
            value={this.state.value}
            onChange={evt => this.inputHandler(evt, this.props.id)}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          {this.state.isOpen ?
            <Suggestions getValue={this.getValue} suggestions={this.state.suggestions} />
            :
            null
          }
        </div>
      );
      break;
    case ('gender'):
      inputElement = (
        <div style={{ position: 'relative' }} className={this.props.elementConfig.halfwidth ? labelClasses.join(' ') : null}>
          <CustomSelect
            sendValue={this.sendValuetoSelect}
            inputClasses={inputClasses}
            {...this.props}
          />
        </div>
      );
      break;
    default:
      inputElement = <input className={inputClasses.join(' ')} {...this.props.elementConfig} value={this.props.value} />;
    }
    return (
      inputElement
    );
  }
}

Input.propTypes = {
  sendValue: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isValid: PropTypes.object.isRequired,
  elementConfig: PropTypes.object.isRequired,
};


export default Input;
