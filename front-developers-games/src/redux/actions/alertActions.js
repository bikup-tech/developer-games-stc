import actionTypes from './actionTypes';

export function setAlert(type, message) {
  return {
    type: actionTypes.SET_ALERT_DATA,
    payload: {
      type, message,
    },
  };
}

export function resetAlert() {
  return {
    type: actionTypes.RESET_ALERT_DATA,
  };
}
