import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './TeamProfile.scss';

// Constants
import alertConstants from '../../../../constants/alertConstants';

// Images
import cameraIcon from '../../../../assets/images/camera-icon.svg';
import addIcon from '../../../../assets/images/add-icon.svg';

// Action-creators
import {
  setProfileInputValue, updateTeamProfile, uploadAvatar,
} from '../../../../redux/actions/profileActions';
import { setAlert } from '../../../../redux/actions/alertActions';
import { loadTeam } from '../../../../redux/actions/loginActions';

// Utils
import getGcloudBucketFileUrl from '../../../../utils/getGcloudBucketFileUrl';

// Components
import Input from '../../../../components/Input/Input';
import MainButton from '../../../../components/MainButton/MainButton';
import TeamProfileParticipant from '../TeamProfileParticipant/TeamProfileParticipant';
import CreateParticipantModal from '../../../../components/CreateParticipantModal/CreateParticipantModal';
import userRoles from '../../../../constants/userRoles';
import LogoutButton from '../LogoutButton/LogoutButton';

function TeamProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector(({ authReducer }) => authReducer);
  const { team, toLoadTeamDetail, tournamentId } = useSelector(({ mainReducer }) => mainReducer);
  const { password, newPassword, teamName } = useSelector(({ profileReducer }) => profileReducer);

  const [isNameModified, setIsNameModified] = useState(false);
  const [isNewPasswordLengthInvalid, setIsNewPasswordLengthInvalid] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const avatarInput = useRef(null);

  useEffect(() => {
    if (team) {
      dispatch(setProfileInputValue('teamName', team?.name));
    }
  }, [team?.name]);

  useEffect(() => {
    if (!team?._id && tournamentId) {
      dispatch(loadTeam(toLoadTeamDetail));
    }
  }, [team]);

  function handleCameraClick() {
    avatarInput.current.click();
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];

    dispatch(uploadAvatar(selectedFile, user.userLogged._id));
  }

  function handleInputChange({ target: { name, value } }) {
    dispatch(setProfileInputValue(name, value));

    name === 'teamName' && setIsNameModified(true);
    name === 'newPassword' && value.length >= 6 && setIsNewPasswordLengthInvalid(false);
  }

  function handleSaveClick() {
    let isFormValid = password && teamName;

    if (newPassword && newPassword.length < 6) {
      isFormValid = false;
    }

    if (isFormValid) {
      const updateProfile = {};

      if (newPassword) {
        updateProfile.participantId = user.userLogged._id;
        updateProfile.newPassword = newPassword;
      }

      if (isNameModified) {
        updateProfile.teamId = team._id;
        updateProfile.teamName = teamName;
      }

      const credentials = {
        userId: user.userLogged._id,
        password,
      };

      dispatch(updateTeamProfile(credentials, updateProfile, updateProfile.teamName));
      dispatch(setProfileInputValue('newPassword', ''));
      dispatch(setProfileInputValue('password', ''));
    } else if (newPassword && newPassword.length < 6) {
      setIsNewPasswordLengthInvalid(true);
      dispatch(setAlert(alertConstants.types.WARNING, alertConstants.messages.TOO_SHORT_PASSWORD));
    }
  }

  // FUNCIO QUE ELIMINA EL TEAM (ens va demanar que no existis aquest boto)
  // function handleDeleteTeam() {
  //  if (window.confirm("Are your sure you want to delete your team and all it's participants?")) {
  //     dispatch(deleteTeam(team._id));
  //   }
  // }

  return (
    <div className="view-profile">
      <div className="view-profile__top">
        <span className="top__text">Edit your profile</span>
        <div className="top__actions">

          {/* <div className="profile-button-container profile-button-container--margin">
            <MainButton onClick={handleDeleteTeam} isSecondary>Delete team</MainButton>
          </div> */}
          <div className="button-actions-profile__container">
            <div className="profile-button-container profile-button-container--logout">
              <LogoutButton>Log Out</LogoutButton>
            </div>
            <div className="profile-button-container">
              <MainButton onClick={handleSaveClick}>Save Changes</MainButton>
            </div>
          </div>
        </div>
      </div>
      <form className="team-profile__login-info">
        <div className="login-info__avatar">
          <img src={getGcloudBucketFileUrl(user.userLogged.avatar)} alt="team avatar" className="avatar__image" />
          <div className="avatar__photo-container">
            <img src={cameraIcon} alt="change avatar" className="photo-container__img" onClick={handleCameraClick} />
          </div>
          <input type="file" className="info__avatar-file" ref={avatarInput} onChange={handleFileChange} accept="image/png, image/gif, image/jpeg" />

        </div>
        <div className="login-separator" />
        <div className="login-info__data">
          <div className="data__teamname profile-input-container">
            <Input type="text" name="teamName" placeholder="Team Name" value={teamName} blueText onChange={handleInputChange} isIncorrect={!teamName} maxLength={18} />
          </div>
          <div className="data__password">
            <div className="password-input profile-input-container profile-input-container--small ">
              <label className="profile-input__label" htmlFor="password">Password</label>
              <Input type="password" name="password" placeholder="Enter your password" autocomplete value={password} onChange={handleInputChange} isIncorrect={!password} />
            </div>
            <div className="password__repeat-input profile-input-container profile-input-container--small">
              <label className="profile-input__label" htmlFor="repeat-password">New Password</label>
              <Input type="password" name="newPassword" placeholder="New password" autocomplete value={newPassword} onChange={handleInputChange} isIncorrect={isNewPasswordLengthInvalid} />
            </div>
          </div>
        </div>
      </form>
      <div className="team-profile__members">
        {team?.participants?.map((participant, index) => (
          <TeamProfileParticipant participantNumber={index + 1} participant={participant} />
        ))}
      </div>
      <div className="team-profile__actions">
        {team?.participants?.length < 4 && (
        <div className="actions__add-participant">
          <MainButton isSecondary onClick={() => { setIsFormVisible(!isFormVisible); }}>
            <img src={addIcon} alt="add icon" className="add-participant__icon" />
            Add another member
          </MainButton>
        </div>
        )}
      </div>
      <CreateParticipantModal
        userRole={userRoles.PARTICIPANT}
        isFormVisible={isFormVisible}
        setIsFormVisible={setIsFormVisible}
        teamId={team?._id}
        tournamentId={tournamentId}
      />
    </div>
  );
}

export default TeamProfile;
