import { SET_DATA, CLEAR_DATA } from '../actions';
import initialState from '../store/initialState';

function structurizeState(state, formData) {
  const { applyForm } = state;
  const stateValues = Object.keys(applyForm);
  stateValues.forEach(stateValue => {
    applyForm[stateValue].value = formData[stateValue].value;
  });

  const updatedState = {
    ...state,
    applyForm,
  };
  return updatedState;
}
const reducer = (state, action) => {
  switch (action.type) {
  case SET_DATA:
    return structurizeState(state, action.formData);
  case CLEAR_DATA:
    return {
      ...state,
      ...initialState,
    };
  default:
    return state;
  }
};

export default reducer;
