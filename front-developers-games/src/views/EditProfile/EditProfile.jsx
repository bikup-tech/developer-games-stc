import React from 'react';
import { useSelector } from 'react-redux';

import './EditProfile.scss';

// Constants
import userRoles from '../../constants/userRoles';

// Components
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import ParticipantProfile from './components/ParticipantProfile/ParticipantProfile';
import TeamProfile from './components/TeamProfile/TeamProfile';
import MentorProfile from './components/MentorProfile/MentorProfile';
import AdminProfile from './components/AdminProfile/AdminProfile';

function EditProfile() {
  const { role, name } = useSelector(({ authReducer }) => authReducer.user.userLogged);
  return (
    <AppWrapper title={`Hi ${name}`}>
      {role === userRoles.SUPER_ADMIN && (
        <AdminProfile />
      )}

      {role === userRoles.CAPTAIN && (
        <TeamProfile />
      )}

      {role === userRoles.MENTOR && (
        <MentorProfile />
      )}

      {role === userRoles.PARTICIPANT && (
        <ParticipantProfile />
      )}
    </AppWrapper>
  );
}

export default EditProfile;
