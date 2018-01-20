import React from 'react';
import PropTypes from 'prop-types';
import classes from './CustomSelect.scss';

const Label = props => {
  const {
    htmlFor,
    ...otherProps
  } = props;

  return (
    <label htmlFor={htmlFor} {...otherProps} />
  );
};

class CustomSelect extends React.Component {
  state = {
    gender: 'Мужской',
    toggle: false,
  };
  openList = () => {
    this.setState(prevState => ({
      toggle: !prevState.toggle,
    }));
  }

  chooseGender = (evt) => {
    this.setState({
      gender: evt.target.textContent,
    });
    this.props.sendValue(evt.target.textContent, this.props.id);
  }
  render() {
    let { inputClasses } = this.props;
    const { elementConfig } = this.props;
    inputClasses = this.state.toggle ? inputClasses.concat(classes.activeSelect).join(' ') : inputClasses.join(' ');
    return (
      <div style={{ padding: '0.81rem' }}onClick={this.openList} className={inputClasses}>
        <span className={classes.Gender}>Пол</span>
        <span className={classes.GenderValue}>{this.state.gender}</span>
        {this.state.toggle ?
          <ul
            className={classes.SelectUl}
          >
            {elementConfig.options.map(option => (
              <li onClick={this.chooseGender} key={option.value} value={option.value}>{option.displayValue}</li>
            ))}
          </ul>
          :
          null
        }
        <div className={classes.ChooseOption}>
          <p>
            <input onChange={this.chooseGender} type="checkbox" id="test1" />
            <Label htmlFor="test1" />
          </p>
          <p>
            <input onChange={this.chooseGender} type="checkbox" id="test2" checked="checked" />
            <Label htmlFor="test2" />
          </p>
        </div>
      </div>
    );
  }
}

CustomSelect.propTypes = {
  sendValue: PropTypes.func.isRequired,
  elementConfig: PropTypes.object.isRequired,
  inputClasses: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
};

export default CustomSelect;
