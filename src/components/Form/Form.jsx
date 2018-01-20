import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setFormData, clearFormData } from '../../actions';
import classes from './Form.scss';

import Modal from '../Modal/Modal';
import Input from '../Input/Input';
import Button from '../Button/Button';

class Form extends Component {
  state = {
    applyForm: {
      surname: { value: '', isValid: true, message: '' },
      name: { value: '', isValid: true, message: '' },
      patronymic: { value: '', isValid: true, message: '' },
      gender: { value: 'мужской', isValid: true, message: '' },
      birthday: { value: '', isValid: true, message: '' },
      phone: { value: '', isValid: true, message: '' },
      email: { value: '', isValid: true, message: '' },
      address: { value: '', isValid: true, message: '' },
      party: { value: '', isValid: true, message: '' },
    },
    dataSent: false,
  };

  getValue = (value, id) => {
    const updatedApplyForm = { ...this.state.applyForm };
    updatedApplyForm[id].value = value;
    this.setState({ applyForm: updatedApplyForm });
  }

  closeModal = () => {
    const state = { ...this.state.applyForm };
    Object.keys(state).map(key => {
      state[key].value = '';
      state[key].isValid = true;
      state[key].message = '';
    });
    this.setState({ applyForm: state, dataSent: false });
    this.props.clearInputFields();
  }

  validate = (applyForm) => {
    const surname = applyForm.surname.value;
    const name = applyForm.name.value;
    const birthday = applyForm.birthday.value;
    const phone = applyForm.phone.value;
    const email = applyForm.email.value;
    const form = { ...applyForm };

    const patternEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const patternPhone = /^\+7[-. ]?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}|\d{4}$/;
    if (surname.length === 0 || !surname.match(/[a-zA-Zа-яА-Я]/gi)) {
      form.surname.isValid = false;
      form.surname.message = 'Поле является обязательным';
    }

    if (name.length === 0 || !name.match(/[a-zA-Zа-яА-Я]/gi)) {
      form.name.isValid = false;
      form.name.message = 'Поле является обязательным';
    }

    if (!birthday) {
      form.birthday.isValid = false;
      form.birthday.message = 'Поле является обязательным';
    }

    if (!phone.match(patternPhone)) {
      form.phone.isValid = false;
      form.phone.message = 'Номер введен неверно';
    }

    if (!patternEmail.test(email)) {
      form.surname.isValid = false;
      form.surname.message = 'Введен некорректный адрес почты';
    }
    return form;
  }
  resetValidationStates = () => {
    const state = this.state.applyForm;

    Object.keys(state).map(key => {
      if (state[key].hasOwnProperty('isValid')) {
        state[key].isValid = true;
        state[key].message = '';
      }
    });
    this.setState({ applyForm: state });
  }

  handleSubmit = evt => {
    evt.preventDefault();
    this.resetValidationStates();
    const updatedApplyForm = this.validate(this.state.applyForm);
    this.setState({ applyForm: updatedApplyForm });
    const FormInvalidValues = Object.keys(updatedApplyForm)
      .filter(formElement => !updatedApplyForm[formElement].isValid);

    if (FormInvalidValues.length > 0) {
      return;
    }
    this.props.sendFormData(this.state.applyForm);
    this.setState({ dataSent: true });
  }

  render() {
    const formElementsArray = [];
    for (const key in this.props.applyForm) {
      formElementsArray.push({
        id: key,
        config: this.props.applyForm[key],
      });
    }
    const form = (
      <form className={classes.Form} onSubmit={this.handleSubmit}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            id={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            halfwidth={formElement.config.halfwidth}
            sendValue={this.getValue}
            isValid={this.state.applyForm}
          />
        ))}
        <Button btnType="submit" className={classes.FormButton}>СОХРАНИТЬ</Button>
      </form>
    );
    return (
      <div className={classes.FormWrapper}>
        <h2>Информация о сотруднике</h2>
        {form}
        <Modal
          show={this.state.dataSent}
          modalClosed={this.closeModal}
        >
           Форма валидна, отправляется запрос
        </Modal>
      </div>
    );
  }
}

Form.propTypes = {
  clearInputFields: PropTypes.func.isRequired,
  sendFormData: PropTypes.func.isRequired,
  applyForm: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  applyForm: state.applyForm,
});

const mapDispatchToProps = dispatch => ({
  sendFormData: formData => dispatch(setFormData(formData)),
  clearInputFields: () => dispatch(clearFormData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

