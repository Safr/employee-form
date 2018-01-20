export default {
  applyForm: {
    surname: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Фамилия',
      },
      value: '',
    },
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Имя',
      },
      value: '',
    },
    patronymic: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Отчество',
      },
      value: '',
    },
    gender: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'мужской', displayValue: 'Мужской' },
          { value: 'женский', displayValue: 'Женский' },
        ],
        halfwidth: 'true',
      },
      value: 'мужской',
    },
    birthday: {
      elementType: 'input',
      elementConfig: {
        type: 'date',
        placeholder: 'Дата рождения',
        halfwidth: 'true',
      },
      value: '',
    },
    phone: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Мобильный телефон',
        halfwidth: 'true',
      },
      value: '',
      valid: false,
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email (необязательно)',
        halfwidth: 'true',
      },
      value: '',
    },
    address: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Адрес постоянной регистрации',
      },
      value: '',
    },
    party: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Название работодателя',
      },
      value: '',
    },
  },
};
