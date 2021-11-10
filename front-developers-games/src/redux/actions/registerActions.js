import axios from 'axios';

// constants
import actionTypes from './actionTypes';
import APIConstants from '../../constants/APIConstants';
import initialState from '../store/initialState';
import alertConstants from '../../constants/alertConstants';

// actionCreators
import { setAlert } from './alertActions';

export function addTeamName(teamName) {
  return {
    type: actionTypes.ADD_TEAM_NAME,
    teamName,
  };
}

export function setRegisterFormValue(name, value, participantNumber) {
  return {
    type: actionTypes.SET_REGISTER_INPUT_VALUE,
    payload: {
      name,
      value,
      participantNumber,
    },
  };
}

export function addParticipant(participantNumber) {
  const participantInitialState = {
    isCaptain: false,
    name: '',
    surname: '',
    email: '',
    phone: '',
    teamNumber: participantNumber,
  };
  const participantWrongValues = {
    wrongname: false,
    wrongsurname: false,
    wrongemail: false,
    wrongphone: false,
  };

  return {
    type: actionTypes.ADD_PARTICIPANT,
    payload: {
      participantNumber,
      participantInitialState,
      participantWrongValues,
    },
  };
}

export function isCheckedRegisterTherms(isChecked) {
  return {
    type: actionTypes.IS_CHECKED_REGISTER_CONDITIONS,
    isChecked,
  };
}

export function setGeneralEntriesWrongValues(wrongValue) {
  return {
    type: actionTypes.SET_GENERAL_ENTRIES_WRONG_VALUES,
    wrongValue,
  };
}

export function setParticipantCorrectValues(
  wrongValue,
  participantNumber,
  nameProperty,
) {
  return {
    type: actionTypes.SET_PARTICIPANT_CORRECT_VALUES,
    payload: {
      wrongValue,
      participantNumber,
      nameProperty,
    },
  };
}

export function setParticipantWrongValues(
  wrongValue,
  participantName,
  nameProperty,
) {
  return {
    type: actionTypes.SET_PARTICIPANT_WRONG_VALUES,
    payload: {
      wrongValue,
      participantName,
      nameProperty,
    },
  };
}

export function registerTeamError(error) {
  return {
    type: actionTypes.REGISTER_TEAM_ERROR,
    error,
  };
}

export function cleanRegisterForm() {
  const cleanState = initialState.registerReducer;
  return {
    type: actionTypes.CLEAN_REGISTER_FORM,
    cleanState,
  };
}

export function registerTeamSuccess() {
  return {
    type: actionTypes.REGISTER_TEAM_SUCCESS,
  };
}

export function registerTeam(tournamentId, name, participants) {
  return async (dispatch) => {
    try {
      const body = { tournamentId, name, participants };
      const registerTeamEndpoint = `${APIConstants.HOSTNAME}${APIConstants.REGISTER_TEAM}`;
      await axios.post(registerTeamEndpoint, body);

      dispatch(
        setAlert(
          alertConstants.types.SUCCESS,
          alertConstants.messages.CREATE_TEAM_SUCCESS,
        ),
      );
      dispatch(cleanRegisterForm());
      dispatch(registerTeamSuccess());
    } catch (registerError) {
      if (registerError?.response?.status === 409) {
        dispatch(
          setAlert(
            alertConstants.types.ERROR,
            registerError.response.data.message,
          ),
        );
      } else {
        dispatch(
          setAlert(
            alertConstants.types.ERROR,
            alertConstants.messages.CREATE_TEAM_ERROR,
          ),
        );
      }
      dispatch(registerTeamError(registerError));
    }
  };
}

export function clearisTeamRegistered() {
  return {
    type: actionTypes.CLEAR_IS_TEAM_REGISTERED,
  };
}
