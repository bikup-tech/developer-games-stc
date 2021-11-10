import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Participant.scss';

import { setRegisterFormValue, setParticipantCorrectValues } from '../../../redux/actions/registerActions';

import Input from '../../../components/Input/Input';

function Participant({ participantNumber, isCaptain }) {
  const dispatch = useDispatch();

  const {
    wrongname, wrongsurname, wrongemail, wrongphone,
  } = useSelector(({ registerReducer }) => registerReducer.registerWrongValues[`participant${participantNumber}`]);
  const {
    email, name, surname, phone,
  } = useSelector(({ registerReducer }) => registerReducer[`participant${participantNumber}`]);

  function handleTextInputChange({ target }) {
    dispatch(setRegisterFormValue(target.name, target.value, participantNumber));
    dispatch(setParticipantCorrectValues(false, participantNumber, target.name));
  }

  return (
    <div className="register__participant">
      <h3 className="participant__title app__title">
        Participant
        {' '}
        {participantNumber}
        {' '}
        {isCaptain ? '- Captain' : ''}
      </h3>
      <div className="participant__inputs">
        <div className="inputs__entries">
          <div className="entries__name">
            <Input
              type="text"
              name="name"
              placeholder="Participant name*"
              value={name}
              onChange={handleTextInputChange}
              isIncorrect={wrongname}
              maxLength={18}
            />
          </div>
          <div className="entries__surname">
            <Input
              type="text"
              name="surname"
              placeholder="Participant surname*"
              value={surname}
              onChange={handleTextInputChange}
              isIncorrect={wrongsurname}
            />
          </div>
        </div>

        <div className="inputs__entries">
          <div className="entries__mail">
            <Input
              type="email"
              name="email"
              placeholder="e-mail*"
              value={email}
              onChange={handleTextInputChange}
              isIncorrect={wrongemail}
            />
          </div>
          <div className="entries__number">
            <Input
              type="tel"
              name="phone"
              placeholder="Phone*"
              value={phone}
              onChange={handleTextInputChange}
              isIncorrect={wrongphone}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Participant;
