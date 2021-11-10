import actionTypes from '../actions/actionTypes';

export default function registerReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case actionTypes.ADD_TEAM_NAME:
      newState = { ...state, teamName: action.teamName };
      break;

    case actionTypes.SET_REGISTER_INPUT_VALUE:
      newState = {
        ...state,
        [`participant${action.payload.participantNumber}`]: {
          ...state[`participant${action.payload.participantNumber}`],
          [action.payload.name]: action.payload.value,
        },
      };
      break;

    case actionTypes.ADD_PARTICIPANT:
      newState = {
        ...state,
        [`participant${action.payload.participantNumber}`]:
          action.payload.participantInitialState,
        registerWrongValues: {
          ...state.registerWrongValues,
          [`participant${action.payload.participantNumber}`]:
            action.payload.participantWrongValues,
        },
      };
      break;

    case actionTypes.SET_GENERAL_ENTRIES_WRONG_VALUES:
      newState = {
        ...state,
        registerWrongValues: {
          ...state.registerWrongValues,
          teamName: action.wrongValue,
        },
      };
      break;

    case actionTypes.SET_PARTICIPANT_CORRECT_VALUES:
      newState = {
        ...state,
        registerWrongValues: {
          ...state.registerWrongValues,
          [`participant${action.payload.participantNumber}`]: {
            ...state.registerWrongValues[`participant${action.payload.participantNumber}`],
            [`wrong${action.payload.nameProperty}`]: action.payload.wrongValue,
          },
        },
      };
      break;

    case actionTypes.SET_PARTICIPANT_WRONG_VALUES:
      newState = {
        ...state,
        registerWrongValues: {
          ...state.registerWrongValues,
          [action.payload.participantName]: {
            ...state.registerWrongValues[action.payload.participantName],
            [`wrong${action.payload.nameProperty}`]: action.payload.wrongValue,
          },
        },
      };
      break;

    case actionTypes.IS_CHECKED_REGISTER_CONDITIONS:
      newState = {
        ...state,
        registerTermsConditions: action.isChecked,
      };
      break;

    case actionTypes.CLEAN_REGISTER_FORM:
      newState = action.cleanState;
      break;

    case actionTypes.REGISTER_TEAM_ERROR:
      newState = {
        ...state,
        registerTeamError: action.error,
      };
      break;

    case actionTypes.REGISTER_TEAM_SUCCESS:
      newState = { ...state, isTeamRegistered: true };
      break;

    case actionTypes.CLEAR_IS_TEAM_REGISTERED:
      newState = { ...state, isTeamRegistered: false };
      break;

    default:
      newState = state;
      break;
  }
  return newState;
}
