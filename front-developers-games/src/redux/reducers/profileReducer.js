import actionTypes from '../actions/actionTypes';

export default function profileReducer(state = {}, action) {
  let newState = {};

  switch (action.type) {
    case actionTypes.SET_PROFILE_INPUT_VALUE:
      newState = {
        ...state,
        [action.name]: action.value,
      };
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
