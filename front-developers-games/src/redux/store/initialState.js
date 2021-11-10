import userRoles from '../../constants/userRoles';

export default {
  mainReducer: {
    tournamentId: '60be036d5695a3805e903f91',
    participants: [],
    mentors: [],
    team: {
      name: '',
    },
    alert: { type: '', message: '' },
    toLoadUserDetail: localStorage.getItem('toLoadUserDetail') || '',
    toLoadChallengeDetail: localStorage.getItem('toLoadChallengeDetail') || '',
    toLoadTeamDetail: localStorage.getItem('toLoadTeamDetail') || '',
    isHeaderVisible: true,
  },

  registerReducer: {
    participants: [],
    teamName: '',
    participant1: {
      role: userRoles.CAPTAIN,
      name: '',
      surname: '',
      email: '',
      phone: '',
      teamNumber: 1,
    },
    registerTermsConditions: false,
    registerWrongValues: {
      teamName: false,
      participant1: {
        wrongname: false,
        wrongsurname: false,
        wrongemail: false,
        wrongphone: false,
      },
    },
    registerTeamError: null,
  },

  authReducer: {
    user: {
      isLogged: localStorage.getItem('isLogged') === 'true',
      userLogged: JSON.parse(localStorage.getItem('user')) || {},
    },
  },

  profileReducer: {
    teamName: '',
    password: '',
    newPassword: '',
  },

  tournamentReducer: {
    tournament: {
      name: localStorage.getItem('tournamentName') || '',
    },
  },
};
