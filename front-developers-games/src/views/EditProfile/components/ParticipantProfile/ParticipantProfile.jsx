import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './ParticipantProfile.scss';

// constants
import warningMessages from '../../../../constants/warningMessages';

// Images
import cameraIcon from '../../../../assets/images/camera-icon.svg';

// action-creators
import { updateTeamProfile, uploadAvatar } from '../../../../redux/actions/profileActions';

// Utils
import getGcloudBucketFileUrl from '../../../../utils/getGcloudBucketFileUrl';

// components
import Input from '../../../../components/Input/Input';
import MainButton from '../../../../components/MainButton/MainButton';
import LogoutButton from '../LogoutButton/LogoutButton';

function ParticipantProfile() {
  const dispatch = useDispatch();
  const {
    name, email, phone, _id, avatar,
  } = useSelector(({ authReducer }) => authReducer.user.userLogged);

  const initialStateValues = {
    participantName: name,
    password: '',
    newPassword: '',
    email,
    phone,
  };
  const isIncorrectValues = {
    participantName: false,
    password: false,
    email: false,
    phone: false,
  };

  const [editParticipantProfile, setEditParticipantProfile] = useState(initialStateValues);
  const [isInputIncorrect, setIsInputIncorrect] = useState(isIncorrectValues);
  const [warningMessage, setWarningMessage] = useState('');

  const avatarInput = useRef(null);

  function handleInputChange({ target }) {
    setEditParticipantProfile({
      ...editParticipantProfile,
      [target.name]: target.value,
    });
    setIsInputIncorrect({ ...isInputIncorrect, [target.name]: false });

    setWarningMessage('');
  }

  function handleCameraClick() {
    avatarInput.current.click();
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];

    dispatch(uploadAvatar(selectedFile, _id));
  }

  function handleSaveChangesClick() {
    let isFormValid = true;
    const wrongValues = {};
    Object.entries(editParticipantProfile).forEach(([key, value]) => {
      if (!value && key !== 'newPassword') {
        wrongValues[key] = true;
        setWarningMessage(warningMessages.login.LOGIN_REQUIRED_ENTRY);
        isFormValid = false;
      }
    });
    setIsInputIncorrect(wrongValues);

    if (isFormValid) {
      const credentials = {
        userId: _id,
        password: editParticipantProfile.password,
      };

      const body = {
        participantId: _id,
        name: editParticipantProfile.participantName,
        newPassword: editParticipantProfile.newPassword || null,
        phone: editParticipantProfile.phone,
      };

      dispatch(
        updateTeamProfile(
          credentials,
          body,
          editParticipantProfile.participantName,
        ),
      );
      setEditParticipantProfile({
        ...editParticipantProfile,
        password: '',
        newPassword: '',
      });
      setWarningMessage('');
    }
  }

  return (
    <div className="view-profile">
      <div className="view-profile__top">
        <span className="top__text">Edit your profile</span>
        <div className="button-actions-profile__container">
          <div className="profile-button-container profile-button-container--logout">
            <LogoutButton>Log Out</LogoutButton>
          </div>
          <div className="profile-button-container">
            <MainButton onClick={handleSaveChangesClick}>Save Changes</MainButton>
          </div>
        </div>
      </div>
      <form className="team-profile__login-info--admin">
        <div className="login-info__general">
          <div className="login-info__avatar">
            <img src={getGcloudBucketFileUrl(avatar)} alt="team avatar" className="avatar__image" />
            <div className="avatar__photo-container">
              <img
                src={cameraIcon}
                alt="change avatar"
                className="photo-container__img"
                onClick={handleCameraClick}
              />
            </div>
            <input type="file" className="info__avatar-file" ref={avatarInput} onChange={handleFileChange} accept="image/png, image/gif, image/jpeg" />
          </div>
          <div className="login-separator" />
          <div className="login-info__data">
            <div className="data__teamname profile-input-container">
              <Input
                type="text"
                name="participantName"
                placeholder="Name"
                autocomplete
                value={editParticipantProfile.participantName}
                blueText
                onChange={handleInputChange}
                isIncorrect={isInputIncorrect.participantName}
                maxLength={18}
              />
            </div>
            <div className="data__password">
              <div className="password-input profile-input-container profile-input-container--small ">
                <label className="profile-input__label" htmlFor="password">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  autocomplete
                  value={editParticipantProfile.password}
                  onChange={handleInputChange}
                  isIncorrect={isInputIncorrect.password}
                />
              </div>
              <div className="password__repeat-input profile-input-container profile-input-container--small">
                <label
                  className="profile-input__label"
                  htmlFor="repeat-password"
                >
                  New password
                </label>
                <Input
                  type="password"
                  name="newPassword"
                  placeholder="New password"
                  autocomplete
                  value={editParticipantProfile.newPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="login-info__general profile">
          <div className="entries__mail mb-12--mobile">
            <Input
              type="email"
              name="email"
              placeholder="e-mail*"
              value={editParticipantProfile.email}
              onChange={handleInputChange}
              disabled
              isIncorrect={isInputIncorrect.email}
            />
          </div>
          <div className="entries__number last-entry">
            <Input
              type="tel"
              name="phone"
              placeholder="Phone*"
              value={editParticipantProfile.phone}
              onChange={handleInputChange}
              isIncorrect={isInputIncorrect.phone}
            />
          </div>
        </div>
      </form>
      <small className="form__warningMessage">{warningMessage}</small>
    </div>
  );
}

export default ParticipantProfile;
