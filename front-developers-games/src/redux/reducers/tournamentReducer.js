import actionTypes from '../actions/actionTypes';

export default function tournamentReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case actionTypes.LOAD_TOURNAMENT_SUCCESS:
      newState = { ...state, tournament: action.tournament };
      break;

    case actionTypes.LOAD_TOURNAMENT_ERROR:
      newState = { ...state, tournament: action.error };
      break;

    case actionTypes.UPLOAD_IS_ACTIVE_SUCESS_ERROR:
      newState = {
        ...state,
        tournament: {
          ...state.tournament,
          isActive: action.error,
        },
      };
      break;

    case actionTypes.UPLOAD_IS_ACTIVE_SUCESS:
      newState = {
        ...state,
        tournament: {
          ...state.tournament,
          isActive: action.boolValue,
        },
      };
      break;

    default:
      newState = state;
      break;
  }
  return newState;
}
