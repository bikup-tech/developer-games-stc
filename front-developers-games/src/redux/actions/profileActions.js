import axios from 'axios';

// Constants
import APIConstants from '../../constants/APIConstants';
import alertConstants from '../../constants/alertConstants';
import actionTypes from './actionTypes';
import userRoles from '../../constants/userRoles';

// Action Creators
import { setAlert } from './alertActions';
import { loadTeam, loginSuccess } from './loginActions';

export function setProfileInputValue(name, value) {
  return {
    type: actionTypes.SET_PROFILE_INPUT_VALUE,
    name,
    value,
  };
}

export function updateTeamProfile(credentials, body, profileName) {
  return async (dispatch) => {
    try {
      const checkEndpoint = `${APIConstants.HOSTNAME}${APIConstants.CHECK_PASSWORD}`;
      const editProfileEndpoint = `${APIConstants.HOSTNAME}${APIConstants.EDIT_TEAM_PROFILE}`;

      const { data: isAllowed } = await axios.post(checkEndpoint, credentials);

      if (isAllowed) {
        await axios.patch(editProfileEndpoint, body);
        dispatch(
          setAlert(alertConstants.types.SUCCESS, alertConstants.messages.MODIFY_PROFILE_SUCCESS),
        );

        // If team name is modified, reload team info
        if (profileName) {
          dispatch(loadTeam(credentials.userId));
        }
      } else {
        dispatch(setAlert(alertConstants.types.ERROR, alertConstants.messages.WRONG_PASSWORD));
      }
    } catch (error) {
      dispatch(setAlert(alertConstants.types.ERROR, alertConstants
        .messages.MODIFY_PROFILE_ERROR));
    }
  };
}

export function updateAdminProfile(credentials, body) {
  return async (dispatch) => {
    try {
      const checkEndpoint = `${APIConstants.HOSTNAME}${APIConstants.CHECK_PASSWORD}`;
      const editProfileEndpoint = `${APIConstants.HOSTNAME}${APIConstants.EDIT_ADMIN_PROFILE}`;

      const { data: isAllowed } = await axios.post(checkEndpoint, credentials);

      if (isAllowed) {
        const { data: updatedAdmin } = await axios.patch(editProfileEndpoint, body);
        dispatch(
          setAlert(alertConstants.types.SUCCESS, alertConstants.messages.MODIFY_PROFILE_SUCCESS),
        );
        dispatch(loginSuccess(updatedAdmin));
      } else {
        dispatch(setAlert(alertConstants.types.ERROR, alertConstants.messages.WRONG_PASSWORD));
      }
    } catch (error) {
      dispatch(setAlert(alertConstants.types.ERROR, alertConstants
        .messages.MODIFY_PROFILE_ERROR));
    }
  };
}

function deleteParticipantSuccess(participantId) {
  return {
    type: actionTypes.DELETE_PARTICIPANT,
    participantId,
  };
}

function deleteMentorSuccess(participantId) {
  return {
    type: actionTypes.DELETE_MENTOR,
    participantId,
  };
}

export function deleteParticipant(participant) {
  return async (dispatch) => {
    try {
      const deleteParticipantEndpoint = `${APIConstants.HOSTNAME}${APIConstants.DELETE_PARTICIPANT(participant._id)}`;
      await axios.delete(deleteParticipantEndpoint);
      dispatch(setAlert(
        alertConstants.types.SUCCESS, alertConstants.messages.DELETE_PARTICIPANT_SUCCESS,
      ));

      if (participant.role === userRoles.PARTICIPANT) {
        dispatch(deleteParticipantSuccess(participant._id));
      } else {
        dispatch(deleteMentorSuccess(participant._id));
      }
    } catch (error) {
      dispatch(setAlert(
        alertConstants.types.ERROR, alertConstants.messages.DELETE_PARTICIPANT_ERROR,
      ));
    }
  };
}

export function deleteTeam(teamId) {
  return async (dispatch) => {
    try {
      const deleteTeamEndpoint = `${APIConstants.HOSTNAME}${APIConstants.DELETE_TEAM(teamId)}`;
      await axios.delete(deleteTeamEndpoint);
      window.location.replace('/');
    } catch (error) {
      dispatch(setAlert(
        alertConstants.types.ERROR, alertConstants.messages.DELETE_TEAM_ERROR,
      ));
    }
  };
}

export function adminDeleteTeamSuccess(teamId) {
  return {
    type: actionTypes.DELETE_TEAM,
    teamId,
  };
}

export function adminDeleteTeam(teamId) {
  return async (dispatch) => {
    try {
      const deleteTeamEndpoint = `${APIConstants.HOSTNAME}${APIConstants.DELETE_TEAM(teamId)}`;
      await axios.delete(deleteTeamEndpoint);
      dispatch(setAlert(
        alertConstants.types.SUCCESS, alertConstants.messages.DELETE_TEAM_SUCCESS,
      ));
      dispatch(adminDeleteTeamSuccess(teamId));
    } catch (error) {
      dispatch(setAlert(
        alertConstants.types.ERROR, alertConstants.messages.DELETE_TEAM_ERROR,
      ));
    }
  };
}

function adminDeleteParticipantSuccess(participantId, teamId) {
  return {
    type: actionTypes.ADMIN_DELETE_PARTICIPANT,
    payload: {
      participantId, teamId,
    },
  };
}

export function adminDeleteParticipant(participantId, teamId) {
  return async (dispatch) => {
    try {
      const deleteParticipantEndpoint = `${APIConstants.HOSTNAME}${APIConstants.DELETE_PARTICIPANT(participantId)}`;
      await axios.delete(deleteParticipantEndpoint);
      dispatch(setAlert(
        alertConstants.types.SUCCESS, alertConstants.messages.DELETE_PARTICIPANT_SUCCESS,
      ));
      dispatch(adminDeleteParticipantSuccess(participantId, teamId));
    } catch (error) {
      dispatch(setAlert(
        alertConstants.types.ERROR, alertConstants.messages.DELETE_TEAM_ERROR,
      ));
    }
  };
}

function uploadAvatarSuccess(avatarUrl) {
  return {
    type: actionTypes.UPLOAD_AVATAR,
    avatarUrl,
  };
}

export function uploadAvatar(file, participantId) {
  return async (dispatch) => {
    try {
      if (file) {
        const uploadAvatarEndpoint = `${APIConstants.HOSTNAME}${APIConstants.UPLOAD_AVATAR(participantId)}`;

        const formData = new FormData();
        formData.append('avatar', file);

        const { data } = await axios({
          method: 'patch',
          url: uploadAvatarEndpoint,
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        dispatch(uploadAvatarSuccess(data));
      }
    } catch (uploadError) {
      dispatch(setAlert(
        alertConstants.types.ERROR, alertConstants.messages.UPLOAD_AVATAR_ERROR,
      ));
    }
  };
}

export function createMentor(participant) {
  return {
    type: actionTypes.CREATE_MENTOR,
    participant,
  };
}

export function createParticipantSuccess(participant) {
  return {
    type: actionTypes.CREATE_PARTICIPANT,
    participant,
  };
}

export function createParticipant(participant) {
  return async (dispatch) => {
    try {
      const createParticipantEndpoint = `${APIConstants.HOSTNAME}${APIConstants.CREATE_PARTICIPANT}`;
      const { data: createdParticipant } = await axios.post(createParticipantEndpoint, participant);

      if (createdParticipant.role === userRoles.MENTOR) {
        dispatch(createMentor(createdParticipant));
        dispatch(setAlert(alertConstants.types.SUCCESS, alertConstants.messages.CREATE_PARTICIPANT_SUCCESS('Mentor')));
      } else {
        dispatch(createParticipantSuccess(createdParticipant));
        dispatch(
          setAlert(
            alertConstants.types.SUCCESS,
            alertConstants.messages.CREATE_PARTICIPANT_SUCCESS('Participant'),
          ),
        );
      }
    } catch (error) {
      dispatch(
        setAlert(alertConstants.types.ERROR, alertConstants.messages.CREATE_PARTICIPANT_ERROR),
      );
    }
  };
}

export function getMentorsSuccess(mentors) {
  return {
    type: actionTypes.GET_MENTORS,
    mentors,
  };
}

export function getMentors() {
  return async (dispatch) => {
    try {
      const getMentorsEndpoint = `${APIConstants.HOSTNAME}${APIConstants.CREATE_PARTICIPANT}`;
      const { data: mentors } = await axios.get(getMentorsEndpoint);

      dispatch(getMentorsSuccess(mentors));
    } catch (error) {
      dispatch(
        setAlert(alertConstants.types.ERROR, alertConstants.messages.GET_PARTICIPANTS('mentors')),
      );
    }
  };
}
