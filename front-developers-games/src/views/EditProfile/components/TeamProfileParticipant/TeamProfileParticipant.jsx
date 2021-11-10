import React from 'react';
import { useDispatch } from 'react-redux';

import './TeamProfileParticipant.scss';

// Icons
import deleteIcon from '../../../../assets/images/delete-icon.svg';

// Constants
import userRoles from '../../../../constants/userRoles';

// Action Creators
import { deleteParticipant } from '../../../../redux/actions/profileActions';

// Components
import Input from '../../../../components/Input/Input';

function TeamProfileParticipant({ participantNumber, participant }) {
  const dispatch = useDispatch();

  function handleDelete() {
    if (window.confirm('Are your sure you want to delete this participant?')) {
      dispatch(deleteParticipant(participant));
    }
  }

  return (
    <div className="register__participant register__participant-border">
      <div className="participant__title-container">
        <h3 className="participant__title app__title app__title--noPadding">
          {participantNumber}
          {' - '}
          {participant.name}
          {' '}
          {participant.role === userRoles.CAPTAIN ? '(Captain)' : ''}
        </h3>
        <div className="flex-separator title__delete-participant">
          {participant.role !== userRoles.CAPTAIN && (
            <img
              src={deleteIcon}
              alt="delete participant"
              className="delete-participant__icon"
              onClick={handleDelete}
            />
          )}
        </div>
      </div>
      <div className="participant__inputs">
        <div className="inputs__entries">
          <div className="entries__name">
            <Input
              type="text"
              name="name"
              placeholder="Participant name*"
              value={participant.name}
              disabled
            />
          </div>
          <div className="entries__surname">
            <Input
              type="text"
              name="surname"
              placeholder="Participant surname*"
              value={participant.surname}
              disabled
            />
          </div>
        </div>

        <div className="inputs__entries">
          <div className="entries__mail">
            <Input
              type="email"
              name="email"
              placeholder="e-mail*"
              value={participant.email}
              disabled
            />
          </div>
          <div className="entries__number">
            <Input
              type="tel"
              name="phone"
              placeholder="Phone*"
              value={participant.phone}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamProfileParticipant;
