import axios from 'axios';

// Constants
import actionTypes from './actionTypes';
import APIConstants from '../../constants/APIConstants';
import alertConstants from '../../constants/alertConstants';

// Action-Creators
import { setAlert } from './alertActions';

function loadTournamentError(error) {
  return {
    type: actionTypes.LOAD_TOURNAMENT_ERROR,
    error,
  };
}

function loadTournamentSuccess(tournament) {
  return {
    type: actionTypes.LOAD_TOURNAMENT_SUCCESS,
    tournament,
  };
}

export function loadTournament(tournamentName) {
  return async (dispatch) => {
    try {
      const loadTournamentEndpoint = `${
        APIConstants.HOSTNAME
      }${APIConstants.LOAD_TOURNAMENT(tournamentName)}`;
      const { data } = await axios.get(loadTournamentEndpoint);
      localStorage.setItem('tournamentName', data.name);
      dispatch(loadTournamentSuccess(data));
    } catch (error) {
      dispatch(loadTournamentError(error));
    }
  };
}

function setTournamentIsActiveSuccess(boolValue) {
  return {
    type: actionTypes.UPLOAD_IS_ACTIVE_SUCESS,
    boolValue,
  };
}

function setTournamentIsActiveError(error) {
  return {
    type: actionTypes.UPLOAD_IS_ACTIVE_SUCESS_ERROR,
    error,
  };
}

export function setTournamentIsActive(isActive, tournamentName) {
  return async (dispatch) => {
    try {
      const loadTournamentEndpoint = `${
        APIConstants.HOSTNAME
      }${APIConstants.ACTIVATE_TOURNAMENT(tournamentName)}`;

      await axios.patch(loadTournamentEndpoint);

      dispatch(setTournamentIsActiveSuccess(true));

      dispatch(
        setAlert(
          alertConstants.types.SUCCESS,
          alertConstants.messages.UPDATE_TOURNAMENT_SUCCESS,
        ),
      );
    } catch (error) {
      dispatch(setTournamentIsActiveError(error));
      dispatch(
        setAlert(
          alertConstants.types.ERROR,
          alertConstants.messages.UPDATE_TOURNAMENT_ERROR,
        ),
      );
    }
  };
}
