/* eslint-disable no-param-reassign */
import actionTypes from '../actions/actionTypes';

export default function mainReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    // ALERT
    case actionTypes.SET_ALERT_DATA:
      newState = {
        ...state,
        alert: { type: action.payload.type, message: action.payload.message },
      };
      break;

    case actionTypes.RESET_ALERT_DATA:
      newState = {
        ...state,
        alert: { type: '', message: '' },
      };
      break;

    case actionTypes.ADD_PARTICIPANT:
      newState = {
        ...state,
        participants: [...state.participants, action.participant],
      };
      break;

    // TEAM CHALLENGES
    case actionTypes.CLEAR_TEAM_CHALLENGES:
      newState = {
        ...state,
        teamChallenges: [],
      };
      break;
    case actionTypes.SET_TEAM_CHALLENGES_LOADING:
      newState = {
        ...state, teamChallengesLoading: true,
      };
      break;
    case actionTypes.LOAD_TEAM_CHALLENGES_ERROR:
      newState = {
        ...state, teamChallengesLoading: false, teamChallengesError: action.error,
      };
      break;
    case actionTypes.LOAD_TEAM_CHALLENGES_SUCCESS:
      newState = {
        ...state,
        teamChallengesError: null,
        teamChallengesLoading: false,
        teamChallenges: action.teamChallenges,
      };
      break;

    // CHALLENGE DETAIL
    case actionTypes.SET_TO_LOAD_CHALLENGE_DETAIL:
      newState = { ...state, toLoadChallengeDetail: action.challengeId };
      break;
    case actionTypes.CLEAR_CHALLENGE_DETAIL:
      newState = {
        ...state, challengeDetail: {}, challengeDetailLoading: true,
      };
      break;
    case actionTypes.SET_CHALLENGE_LOADING:
      newState = {
        ...state, challengeDetailLoading: true,
      };
      break;
    case actionTypes.LOAD_CHALLENGE_ERROR:
      newState = {
        ...state, challengeDetailLoading: false, challengeDetailError: action.error,
      };
      break;
    case actionTypes.LOAD_CHALLENGE_SUCCESS:
      newState = {
        ...state,
        challengeDetailLoading: false,
        challengeDetailError: null,
        challengeDetail: action.challengeDetail,
      };
      break;
    case actionTypes.SEND_CHALLENGE_ERROR:
      newState = {
        ...state,
        sendChallengeError: action.error,
      };
      break;
    case actionTypes.SEND_CHALLENGE_SUCCESS:
      newState = {
        ...state,
        sendChallengeError: null,
        challengeDetail: {
          ...state.challengeDetail,
          isCompleted: true,
        },
      };
      break;

    // DELIVERABLE UPLOADING
    case actionTypes.UPLOAD_DELIVERABLE_SUCCESS:
      newState = {
        ...state,
        challengeDetail: {
          ...state.challengeDetail,
          filename: action.payload.filename,
          gcloudName: action.payload.gcloudName,
        },
      };
      break;

    // TEAM
    case actionTypes.LOAD_TEAM_LOADING:
      newState = { ...state, teamLoading: true };
      break;
    case actionTypes.LOAD_TEAM_ERROR:
      newState = { ...state, teamLoading: false, teamError: action.error };
      break;
    case actionTypes.LOAD_TEAM_SUCCESS:
      newState = {
        ...state, teamLoading: false, teamError: null, team: action.team,
      };

      break;
    case actionTypes.INCREMENT_SOLVED_CHALLENGES_ERROR:
      newState = {
        ...state,
        teamError: action.error,
      };
      break;
    case actionTypes.INCREMENT_SOLVED_CHALLENGES_SUCCESS:
      newState = {
        ...state,
        teamError: null,
        team: action.updatedTeam,
      };
      break;

    case actionTypes.DELETE_PARTICIPANT:
      newState = {
        ...state,
        team: {
          ...state.team,
          participants: state.team.participants.filter(
            (participant) => participant._id !== action.participantId,
          ),
        },
      };
      break;

    case actionTypes.DELETE_MENTOR:
      newState = {
        ...state,
        mentors: state.mentors.filter(
          (participant) => participant._id !== action.participantId,
        ),
      };
      break;

    // TEAMS
    case actionTypes.TEAMS_LOADING:
      newState = {
        ...state,
        teamsLoading: true,
      };
      break;
    case actionTypes.LOAD_TEAMS_ERROR:
      newState = {
        ...state,
        teamsLoading: false,
        loadTeamsError: action.error,
      };
      break;
    case actionTypes.LOAD_TEAMS_SUCCESS:
      newState = {
        ...state,
        teamsLoading: false,
        loadTeamsError: null,
        tournamentTeams: action.teams,
      };
      break;

    case actionTypes.DELETE_TEAM:
      newState = {
        ...state,
        tournamentTeams: state.tournamentTeams.filter(
          (team) => team._id !== action.teamId,
        ),
      };
      break;

    case actionTypes.ADMIN_DELETE_PARTICIPANT:
      newState = {
        ...state,
        tournamentTeams: state.tournamentTeams.map((team) => {
          if (team._id === action.payload.teamId) {
            team.participants = team.participants.filter((participant) => (
              participant._id !== action.payload.participantId
            ));
          }
          return team;
        }),
      };
      break;

    case actionTypes.CREATE_MENTOR:
      newState = {
        ...state,
        mentors: [...state.mentors, action.participant],
      };
      break;

    case actionTypes.CREATE_PARTICIPANT:
      newState = {
        ...state,
        team: {
          ...state.team,
          participants: [...state.team.participants, action.participant],
        },
      };
      break;

    // TOURNAMENT CHALLENGES
    case actionTypes.LOAD_TOURNAMENT_CHALLENGES_ERROR:
      newState = {
        ...state,
        tournamentChallengesError: action.error,

      };
      break;

    case actionTypes.LOAD_TOURNAMENT_CHALLENGES:
      newState = {
        ...state,
        tournamentChallengesError: null,
        tournamentChallenges: action.tournamentChallenges,
      };
      break;

    case actionTypes.GET_MENTORS:
      newState = {
        ...state,
        mentors: action.mentors,
      };
      break;

    // HEADER
    case 'HIDE_HEADER':
      newState = {
        ...state,
        isHeaderVisible: false,
      };
      break;

    case 'SHOW_HEADER':
      newState = {
        ...state,
        isHeaderVisible: true,
      };
      break;

    default:
      newState = state;
      break;
  }

  return newState;
}
