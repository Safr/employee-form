export const SET_DATA = 'SET_DATA';
export const CLEAR_DATA = 'CLEAR_DATA';

export const setFormData = (formData) => ({
  type: SET_DATA,
  formData,
});

export const clearFormData = () => ({
  type: CLEAR_DATA,
});

