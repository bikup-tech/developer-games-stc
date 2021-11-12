import './ChallengeCard.scss';

// Action-Creators
import {
  clearChallengeDetail,
  setToLoadChallengeDetail,
} from '../../../../redux/actions/mainActions';

import { Link } from 'react-router-dom';
// Components
import MainButton from '../../../../components/MainButton/MainButton';
import React from 'react';
import renderChallengeNumber from '../../../../utils/renderChallengeNumber';
// utils
import selectChallengeIcon from '../../../../utils/selectChallengeIcon';
import { useDispatch } from 'react-redux';

function ChallengeCard({ challenge }) {
  const dispatch = useDispatch();

  function renderChallengeImg() {
    return selectChallengeIcon(challenge.tournamentChallenge.number, challenge.isCompleted);
  }

  function handleButtonClick() {
    dispatch(clearChallengeDetail());
    dispatch(setToLoadChallengeDetail(challenge._id));
  }

  return (
    <>
      {challenge && (
        <div className="challenge-card">
          <h3 className={`challenge__number ${challenge.isCompleted && 'isCompleted'}`}>
            {renderChallengeNumber(challenge.tournamentChallenge.number)}
          </h3>
          <h4 className={`challenge__title ${challenge.isCompleted && 'isCompleted'}`}>{challenge.tournamentChallenge.title}</h4>
          <p className={`challenge__subtitle ${challenge.isCompleted && 'isCompleted'}`}>{challenge.tournamentChallenge.subtitle}</p>
          <img className="challenge__img" src={renderChallengeImg()} alt="" />
          <div className="flex-separator" />
          <div className="challenge__button">
            <MainButton color={challenge.isCompleted ? 'blue' : 'red'} onClick={handleButtonClick}>
              <Link to={`/stc/challenges/${challenge._id}`}>
                {
                  challenge.isCompleted
                    ? 'Completed challenge'
                    : 'Access challenge'
                  }
              </Link>
            </MainButton>
          </div>
        </div>
      )}
    </>
  );
}

export default ChallengeCard;
