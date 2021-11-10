import actionTypes from '../actions/actionTypes';

export default function authReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      newState = { ...state, user: { isLogged: true, userLogged: action.user, loginError: null } };
      break;

    case actionTypes.LOGIN_ERROR:
      newState = { ...state, loginError: action.error };
      break;

    case actionTypes.CLEAR_LOGIN_ERROR:
      newState = { ...state, loginError: null };
      break;

    case actionTypes.LOGOUT:
      newState = { ...state, user: { isLogged: false, userLogged: {} } };
      break;

    // Avatar upload
    case actionTypes.UPLOAD_AVATAR:
      newState = {
        ...state,
        user: {
          ...state.user,
          userLogged: {
            ...state.user.userLogged,
            avatar: action.avatarUrl,
          },
        },
      };
      break;

    default:
      newState = state;
      break;
  }
  return newState;
}
