import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './ChallengeCard.scss';

// utils
import selectChallengeIcon from '../../../../utils/selectChallengeIcon';
import renderChallengeNumber from '../../../../utils/renderChallengeNumber';

// Action-Creators
import {
  setToLoadChallengeDetail,
  clearChallengeDetail,
} from '../../../../redux/actions/mainActions';

// Components
import MainButton from '../../../../components/MainButton/MainButton';

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
              <Link to={`/santander/challenges/${challenge._id}`}>
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
