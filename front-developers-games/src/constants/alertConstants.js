import alertSuccessIcon from '../assets/images/alert-success-icon.png';
import alertErrorIcon from '../assets/images/alert-error-icon.png';
import alertWarningIcon from '../assets/images/alert-warning-icon.png';

export default {
  types: {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    WARNING: 'WARNING',
  },
  messages: {
    CREATE_TEAM_ERROR: 'There has been an error creating your team. Try again please.',
    ALREADY_EXISTING_TEAM: (teamName) => `There is already a team with the name ${teamName}`,
    CREATE_TEAM_SUCCESS: 'Your team has been created!',
    UPLOAD_FILE_SUCCESS: 'Your deliverable has been uploaded!',
    UPLOAD_FILE_ERROR: 'There has been an error uploading your deliverable.',
    SEND_CHALLENGE_SUCCESS: 'Challenge sent!',
    SEND_CHALLENGE_ERROR: 'There has been an error sending the challenge. Try again please.',
    LOGIN_TEAM: 'Logged in!',
    LOGIN_ERROR: 'There has been an error logging in. Please try again.',
    LOAD_TEAMS_ERROR: 'There has been an error loading the tournament teams. Please try again.',
    MODIFY_PROFILE_ERROR: 'There has been an error modifying your profile. Please try again.',
    MODIFY_PROFILE_SUCCESS: 'Profile modified!',
    WRONG_PASSWORD: 'The password is not correct.',
    TOO_SHORT_PASSWORD: 'The password must have at least 6 characters.',
    DELETE_PARTICIPANT_ERROR: 'There has been an error deleting this participant. Please try again.',
    DELETE_PARTICIPANT_SUCCESS: 'Participant deleted!',
    DELETE_TEAM_ERROR: 'There has been an error deleting the team. Please try again.',
    DELETE_TEAM_SUCCESS: 'Team deleted!',
    UPLOAD_AVATAR_ERROR: 'There has been an error uploading your avatar. Please try again.',
    UPLOAD_AVATAR_SUCCESS: 'Avatar uploaded successfully.',
    CREATE_PARTICIPANT_SUCCESS: (role) => `${role} has been created successfully.`,
    CREATE_PARTICIPANT_ERROR: 'There has been an error creating the user.',
    DOWNLOAD_COMPLETED_CHALLENGES_ERROR: 'There has been an error downloading the challenges. Please try again.',
    NO_COMPLETED_CHALLENGES: 'There are not any deliverables for this challenge yet.',
    GET_PARTICIPANTS: (role) => `There has been an error loading the ${role}.`,
    UPDATE_TOURNAMENT_SUCCESS: 'Tournament has been updated successfully.',
    UPDATE_TOURNAMENT_ERROR: 'There has been an error updating the tournament.',
    RESTORE_PASSWORD: 'We have sent an email with the new credentials',
    RESTORE_PASSWORD_ERROR: 'There has been an error sending the email with the credentials.',
    RESTORE_PASSWORD_EMIAl_INVALID: 'There is no user with this email.',
  },
  icons: {
    SUCCESS: alertSuccessIcon,
    ERROR: alertErrorIcon,
    WARNING: alertWarningIcon,
  },
};
