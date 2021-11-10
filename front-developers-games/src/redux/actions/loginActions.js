import axios from 'axios';

// constants
import actionTypes from './actionTypes';
import APIConstants from '../../constants/APIConstants';
import alertConstants from '../../constants/alertConstants';

// actions
import { setAlert } from './alertActions';
import { loadTournament } from './tournamentActions';

export function loginSuccess(user) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    user,
  };
}

export function loginError(error) {
  return {
    type: actionTypes.LOGIN_ERROR,
    error,
  };
}

export function login(email, password) {
  return async (dispatch) => {
    try {
      const body = { email, password };
      const loginEndpoint = `${APIConstants.HOSTNAME}${APIConstants.LOGIN}`;
      const { data } = await axios.post(loginEndpoint, body);

      localStorage.setItem('isLogged', true);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('toLoadUserDetail', data._id);
      data.teamId && localStorage.setItem('toLoadTeamDetail', data.teamId);

      dispatch(loginSuccess(data));
      dispatch(loadTournament('santander'));
    } catch (logError) {
      dispatch(
        setAlert(
          alertConstants.types.ERROR,
          alertConstants.messages.LOGIN_ERROR,
        ),
      );
      dispatch(loginError(logError.message));
    }
  };
}

export function clearLoginError() {
  return {
    type: actionTypes.CLEAR_LOGIN_ERROR,
  };
}

export function setLoadTeamLoading() {
  return {
    type: actionTypes.LOAD_TEAM_LOADING,
  };
}

export function loadTeamError(error) {
  return {
    type: actionTypes.LOAD_TEAM_ERROR,
    error,
  };
}

export function loadTeamSuccess(team) {
  return {
    type: actionTypes.LOAD_TEAM_SUCCESS,
    team,
  };
}

export function loadTeam(teamId) {
  return async (dispatch) => {
    try {
      const endpoint = `${APIConstants.HOSTNAME}${APIConstants.LOAD_TEAM(teamId)}`;

      dispatch(setLoadTeamLoading());
      const { data } = await axios.get(endpoint);
      dispatch(loadTeamSuccess(data));
    } catch (error) {
      dispatch(loadTeamError(error.message));
    }
  };
}

export function logOut() {
  localStorage.removeItem('isLogged');
  window.location.replace('/login');
}

export function restorePasswordAction(userEmail) {
  return async (dispatch) => {
    try {
      const endpoint = `${APIConstants.HOSTNAME}${APIConstants.RESTORE_PASSWORD(userEmail)}`;
      const { data } = await axios.post(endpoint);
      if (data) {
        dispatch(
          setAlert(
            alertConstants.types.SUCCESS,
            alertConstants.messages.RESTORE_PASSWORD,
          ),
        );
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        dispatch(setAlert(
          alertConstants.types.ERROR,
          alertConstants.messages.RESTORE_PASSWORD_EMIAl_INVALID,
        ));
      } else {
        dispatch(setAlert(
          alertConstants.types.ERROR,
          alertConstants.messages.RESTORE_PASSWORD_ERROR,
        ));
      }
    }
  };
}
