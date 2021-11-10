/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './Register.scss';

// Constants
import warningMessages from '../../constants/warningMessages';
import userRoles from '../../constants/userRoles';

// utils
import checkArrayHasRepeatedItems from '../../utils/checkArrayHasRepeatedItems';
import isValidEmail from '../../utils/isValidEmail';

import {
  addTeamName, addParticipant, isCheckedRegisterTherms,
  setGeneralEntriesWrongValues, setParticipantWrongValues, registerTeam, clearisTeamRegistered,
} from '../../redux/actions/registerActions';

// import CameraIcon from '../../assets/images/camara-icon.svg';
import plusIcon from '../../assets/images/plus-icon.svg';

// Components
import Participant from './Participant/Participant';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import Input from '../../components/Input/Input';
import MainButton from '../../components/MainButton/MainButton';
import Checkbox from '../../components/Checkbox/Checkbox';

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();

  const registerReducer = useSelector(({ registerReducer }) => registerReducer);
  const { tournamentId } = useSelector(({ mainReducer }) => mainReducer);
  const {
    teamName, registerTermsConditions, registerWrongValues, isTeamRegistered,
  } = useSelector(({ registerReducer }) => registerReducer);
  const { user } = useSelector(({ authReducer }) => authReducer);

  const [participantsCounter, setParticipantsCounter] = useState(1);
  const [warningMessage, setWarningMessage] = useState('');

  function handleTextInputChange({ target: { value } }) {
    dispatch(addTeamName(value));
    dispatch(setGeneralEntriesWrongValues(false));
    setWarningMessage('');
  }

  function handleCheckboxChange({ target: { checked } }) {
    dispatch(isCheckedRegisterTherms(checked));
    if (checked) {
      setWarningMessage('');
    }
  }

  useEffect(() => {
    if (isTeamRegistered) {
      history.replace('/login');
      dispatch(clearisTeamRegistered());
    }
  }, [isTeamRegistered]);

  useEffect(() => {
    // Check if user is logged and redirect
    if (user?.isLogged) {
      if (user?.userLogged?.role >= userRoles.MENTOR) {
        history.replace('/profile');
      } else {
        history.replace('/santander/challenges');
      }
    }
  });

  function handleAddParticipantClick(e) {
    e.preventDefault();
    setParticipantsCounter(participantsCounter + 1);
    dispatch(addParticipant(participantsCounter + 1));
    const toRenderParticipants = [];

    for (let index = 0; index < participantsCounter; index += 1) {
      toRenderParticipants.push(
        <Participant participantNumber={participantsCounter} isCaptain={false} />,
      );
    }
  }

  function handleSendTeamClick(e) {
    e.preventDefault();
    let isFormValid = true;
    const participantsEmails = [];
    const developersParticipants = (({
      participants, teamName, registerTermsConditions, registerWrongValues,
      registerTeamError, isTeamRegistered, ...rest
    }) => rest)(registerReducer);

    Object.entries(developersParticipants).forEach(([participantName, participantValues]) => {
      Object.entries(participantValues).forEach(([participantKey, participantValue]) => {
        if (participantKey === 'email') {
          if (!isValidEmail(participantValue)) {
            dispatch(setParticipantWrongValues(true, participantName, participantKey));
            isFormValid = false;
            setWarningMessage(warningMessages.register.INVALID_EMAIL);
          }
          participantsEmails.push(participantValue);
        }
        if (participantValue === '') {
          dispatch(setParticipantWrongValues(true, participantName, participantKey));
          isFormValid = false;
          setWarningMessage(warningMessages.inputs.PARTICIPANT_REQUIRED_ENTRY);
        }
      });
    });

    if (checkArrayHasRepeatedItems(participantsEmails)) {
      isFormValid = false;
      dispatch(setGeneralEntriesWrongValues(true));
      setWarningMessage(warningMessages.register.PARTICIPANTS_HAVE_SAME_EMAIL);
    }

    if (teamName === '') {
      setWarningMessage(warningMessages.inputs.TEAM_NAME);
      dispatch(setGeneralEntriesWrongValues(true));
      isFormValid = false;
    }

    if (!registerTermsConditions) {
      setWarningMessage(warningMessages.inputs.TERMS_AND_CONDITIONS_NO_CHECKED);
      isFormValid = false;
    }

    if (participantsCounter < 3 || participantsCounter > 4) {
      setWarningMessage(warningMessages.inputs.MIN_TEAM_PARTICIPANTS);
      isFormValid = false;
    }

    if (isFormValid) {
      const participants = [];
      setWarningMessage('');

      Object.entries(developersParticipants).map((element) => (
        participants.push(element[1])
      ));
      setParticipantsCounter(1);
      dispatch(registerTeam(tournamentId, teamName, participants));
    }
  }

  return (
    <AppWrapper title="Register your team">
      <section className="register-container">
        <h3 className="app__title">Teams must have a minimum of 3 and a maximum of 4 participants.</h3>
        <form className="register__form">
          <div className="form__input">
            <Input
              type="text"
              name="teamName"
              placeholder="Team's name*"
              value={teamName}
              onChange={handleTextInputChange}
              isIncorrect={registerWrongValues.teamName}
              maxLength={18}
            />
          </div>
          {/* <div className="form__entry-photo">
            <img className="entry-photo__image" src={CameraIcon} alt="Insert photo" />
            <p className="entry-photo__text">Sube la foto de tu equipo</p>
          </div> */}
          <Participant participantNumber={1} isCaptain />
          {
            participantsCounter > 1 && (
              <Participant participantNumber={2} />
            )
          }
          {
            participantsCounter > 2 && (
              <Participant participantNumber={3} />
            )
          }
          {
            participantsCounter > 3 && (
              <Participant participantNumber={4} />
            )
          }
          {
            participantsCounter < 4
            && (
              <div className="form__button">
                <MainButton isSecondary color="blue" onClick={handleAddParticipantClick}>
                  <div className="button-children">
                    <img className="button-children__image" src={plusIcon} alt="Add member icon" />
                    <p className="button-children__text">Add another member to your team!</p>
                  </div>
                </MainButton>
              </div>
            )
          }
          <h3 className="app__title form__info">
            You will receive an email with login details to access
            the arena to start the challenges!
          </h3>
          <div className="form__checkbox">
            <Checkbox
              text="I read and understood the terms and conditions and accept the the data management of my information*"
              name="registerTermsConditions"
              isChecked={registerTermsConditions}
              onChange={handleCheckboxChange}
            />
          </div>
          <small className="form__warningMessage">{warningMessage}</small>
          <div className="form__button">
            <MainButton onClick={handleSendTeamClick}>Submit team application</MainButton>
          </div>
        </form>
      </section>
    </AppWrapper>
  );
}

export default Register;
