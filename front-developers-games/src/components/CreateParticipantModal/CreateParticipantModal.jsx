import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './CreateParticipantModal.scss';

// constants
import warningMessages from '../../constants/warningMessages';
import userRoles from '../../constants/userRoles';

// action creators
import { createParticipant } from '../../redux/actions/profileActions';

// components
import TextInput from '../Input/Input';
import MainButton from '../MainButton/MainButton';

const isIncorrectValues = {
  name: false,
  surname: false,
  email: false,
  phone: false,
};

function CreateParticipantModal({
  userRole, isFormVisible, setIsFormVisible, teamId, tournamentId,
}) {
  const dispatch = useDispatch();

  const initialStateValues = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    role: userRole,
  };

  const printedRol = userRole === userRoles.PARTICIPANT ? 'participant' : 'mentor';

  const [participant, setParticipant] = useState(initialStateValues);
  const [isInputIncorrect, setIsInputIncorrect] = useState(isIncorrectValues);
  const [warningMessage, setWarningMessage] = useState('');

  function handleInputChange({ target }) {
    setParticipant({ ...participant, [target.name]: target.value });
    setIsInputIncorrect({ ...isInputIncorrect, [target.name]: false });

    setWarningMessage('');
  }

  function handleAddParticipantClick() {
    let isFormValid = true;
    const wrongValues = {};

    Object.entries(participant).forEach(([key, value]) => {
      if (!value && key !== 'role') {
        wrongValues[key] = true;

        setWarningMessage(warningMessages.login.LOGIN_REQUIRED_ENTRY);
        isFormValid = false;
      }
      if (key === 'email') {
        if (!value.includes('@') || !value.includes('.')) {
          wrongValues[key] = true;

          setWarningMessage('Invalid email.');
          isFormValid = false;
        }
      }
    });

    setIsInputIncorrect(wrongValues);

    if (isFormValid) {
      if (userRole === userRoles.MENTOR) {
        dispatch(createParticipant(participant));
      } else {
        const body = { ...participant, teamId, tournamentId };
        dispatch(createParticipant(body));
      }
      setParticipant(initialStateValues);
      setWarningMessage('');
      setIsFormVisible(false);
    }
  }

  return (
    <div className="modal__add-participant">
      <div
        className={`'hidden' ${isFormVisible === true && 'add-participant__opacity'}`}
        onClick={() => { setIsFormVisible(false); }}
      />
      <form className={`add-participant__form ${isFormVisible === false && 'hide-bottom'}`}>
        <h3 className="participant__title app__title">
          {`Create new ${printedRol}`}
        </h3>
        <div className="form__input--modal">
          <TextInput
            type="text"
            name="name"
            placeholder={`${printedRol} name*`}
            value={participant.name}
            onChange={handleInputChange}
            isIncorrect={isInputIncorrect.name}
            maxLength={18}
          />
        </div>
        <div className="form__input--modal">
          <TextInput
            type="text"
            name="surname"
            placeholder={`${printedRol} surname*`}
            value={participant.surname}
            onChange={handleInputChange}
            isIncorrect={isInputIncorrect.surname}
          />
        </div>
        <div className="form__input--modal">
          <TextInput
            type="email"
            name="email"
            placeholder={`${printedRol} email*`}
            value={participant.email}
            onChange={handleInputChange}
            isIncorrect={isInputIncorrect.email}
          />
        </div>
        <div className="form__input--modal">
          <TextInput
            type="tel"
            name="phone"
            placeholder={`${printedRol} phone*`}
            value={participant.phone}
            onChange={handleInputChange}
            isIncorrect={isInputIncorrect.phone}
          />
        </div>
        <small className="form__warningMessage">{warningMessage}</small>
        <div className="form__buttons">
          <div className="profile-button-container mb-12--mobile">
            <MainButton isSecondary onClick={() => { setIsFormVisible(false); }}>
              Cancel
            </MainButton>
          </div>
          <div className="profile-button-container">
            <MainButton onClick={handleAddParticipantClick}>
              {`Save ${printedRol}`}
            </MainButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateParticipantModal;
