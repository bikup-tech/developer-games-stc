import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TeamCard.scss';

// Constants
import userRoles from '../../../../constants/userRoles';

// Action Creators
import { adminDeleteTeam, adminDeleteParticipant } from '../../../../redux/actions/profileActions';

// Utils
import getGcloudBucketFileUrl from '../../../../utils/getGcloudBucketFileUrl';

// Images
import viewIcon from '../../../../assets/images/view-icon.svg';
import deleteIcon from '../../../../assets/images/delete-icon.svg';
import linkIcon from '../../../../assets/images/download-icon.svg';

function renderPendingChallenges(completedChallenges) {
  return 6 - completedChallenges;
}

function TeamCard({ team, number }) {
  const dispatch = useDispatch();

  const { userLogged } = useSelector(({ authReducer }) => authReducer.user);

  const [isExtraVisible, setIsExtraVisible] = useState(false);

  function handleShowExtraClick() {
    setIsExtraVisible(!isExtraVisible);
    const membersElement = document.querySelector(`.members-${team._id}`);
    const challengesElement = document.querySelector(`.challenges-${team._id}`);

    if (isExtraVisible) {
      setTimeout(() => {
        membersElement.classList.add('display-none');
        challengesElement.classList.add('display-none');
      }, 700);
    } else {
      membersElement.classList.remove('display-none');
      challengesElement.classList.remove('display-none');
    }
  }

  function handleDeleteTeam() {
    if (window.confirm("Are you sure you want to delete this team and all it's members?")) {
      dispatch(adminDeleteTeam(team._id));
    }
  }

  function handleDeleteParticipant(participantId) {
    if (window.confirm('Are you sure you want to delete this participant?')) {
      dispatch(adminDeleteParticipant(participantId, team._id));
    }
  }

  let printedChallenges = 0;

  return (
    <div className="team-card">
      <div className="team-card__info">
        <div className="info__avatar">
          <img src={getGcloudBucketFileUrl(team?.captainId?.avatar)} alt="team avatar" className="avatar__image" />
        </div>
        <div className="info__data">
          <div className="data__title">
            <h3 className="title__text">{`${number}. ${team.name}`}</h3>
            <div className="title__actions">
              <img src={viewIcon} alt="view team" className="title__view" onClick={handleShowExtraClick} />
              {userLogged.role === userRoles.SUPER_ADMIN && (
                <img src={deleteIcon} alt="delete team" className="title__delete" onClick={handleDeleteTeam} />
              )}
            </div>
          </div>
          <div className="data__completed">
            <div className="completed__item completed__item--success">
              <span className="completed__text">Completed challenges:</span>
              <span className="completed__number">{team.solvedChallenges}</span>
            </div>
            <div className="completed__separator desktop" />
            <div className="completed__item completed__item--pending">
              <span className="completed__text">Pending challenges:</span>
              <span className="completed__number">{renderPendingChallenges(team.solvedChallenges)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`team-card__extra ${isExtraVisible && 'team-card__extra--visible'} `}>
        <div className={`extra__members members-${team._id} display-none`}>
          <h3 className="members__title">Team members</h3>
          <div className="members__member-list">
            {team.participants.map((participant, index) => (
              <div className={`member-list__member ${index % 2 === 0 && 'dark-background'}`} key={`member-${participant._id}`}>
                <div className="member__info">
                  <span className="member__name">{`${participant.name} ${participant.role === userRoles.CAPTAIN ? '(captain)' : ''}`}</span>
                  <span className="member__email desktop">{participant.email}</span>
                  <span className="member__phone">{participant.phone}</span>
                </div>
                <div className="flex-separator" />
                <div className="member__actions">
                  { userLogged.role === userRoles.SUPER_ADMIN && (
                    <img src={deleteIcon} alt="delete team" className="title__delete" onClick={() => { handleDeleteParticipant(participant._id); }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`extra__challenges challenges-${team._id} display-none`}>
          <h3 className="members__title">Completed challenges</h3>
          <div className="members__member-list">
            {team.teamChallenges.sort((a, b) => a.challengeNumber - b.challengeNumber)
              .map((challenge) => {
                if (challenge.isCompleted) {
                  printedChallenges += 1;
                  return (
                    <div className={`member-list__member--challenge ${printedChallenges % 2 !== 0 && 'dark-background'}`} key={`challenge-${challenge._id}`}>
                      <div className="member__info">
                        <span className="completed-challenge__name">
                          #
                          {challenge.challengeNumber}
                          {' '}
                          {' '}
                          {challenge.challengeName}
                        </span>
                      </div>
                      <div className="member__actions">
                        <a href={getGcloudBucketFileUrl(challenge.gcloudName)} className="actions__link" target="_blank" rel="noreferrer">
                          <img src={linkIcon} alt="link" className="link__img" title="Go to Github" />
                        </a>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamCard;
