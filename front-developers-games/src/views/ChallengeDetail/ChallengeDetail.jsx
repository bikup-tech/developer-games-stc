/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './ChallengeDetail.scss';

// Assets
import uploadIcon from '../../assets/images/upload-icon.svg';

// Constants
import userRoles from '../../constants/userRoles';

// Utils
import renderChallengeNumber from '../../utils/renderChallengeNumber';

// Action-Creators
import {
  loadChallengeDetail, uploadChallengeDeliverable, sendChallenge, incrementTeamSolvedChallenges,
  clearTeamChallenges,
} from '../../redux/actions/mainActions';

// Components
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import Loading from '../../components/Loading/Loading';
import LoadingError from '../../components/LoadingError/LoadingError';
import MainButton from '../../components/MainButton/MainButton';
import { loadTeam } from '../../redux/actions/loginActions';

// function renderLevelBoxes(duration) {
//   const renderedBoxes = [];
//   for (let index = 0; index < 5; index += 1) {
//     const tempBoxElement = (
//       <div className={`boxes__box ${index < duration && 'boxes__box--full'}`}
//          key={`box-${index}`} />
//     );
//     renderedBoxes.push(tempBoxElement);
//   }

//   return renderedBoxes;
// }

function upperCaseFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function ChallengeDetail() {
  const dispatch = useDispatch();

  let left = [];
  let right = [];
  let printedProps = 0;

  const [hasRendered, setHasRendered] = useState(false);

  const [toRenderProps, setToRenderProps] = useState({ leftProps: [], rightProps: [] });

  const {
    challengeDetail, toLoadChallengeDetail, teamChallengesError,
    challengeDetailLoading, team, toLoadTeamDetail,
  } = useSelector(({ mainReducer }) => mainReducer);

  const { userLogged } = useSelector(({ authReducer }) => authReducer.user);

  useEffect(() => {
    dispatch(loadChallengeDetail(toLoadChallengeDetail));
    dispatch(clearTeamChallenges());
  }, [toLoadChallengeDetail]);

  useEffect(() => {
    if (!challengeDetail) {
      dispatch(loadChallengeDetail(toLoadChallengeDetail));
    }
  }, [challengeDetail, challengeDetail?.filename]);

  useEffect(() => {
    if (!team?._id) {
      dispatch(loadTeam(toLoadTeamDetail));
    }
  }, [toLoadTeamDetail, team]);

  function isIgnoredKey(key) {
    const ignoredKeys = ['number', 'name', 'title', 'subtitle', 'mentor', 'videoUrl', 'tournamentId', 'description', '_id', '__v'];

    if (ignoredKeys.includes(key)) {
      return true;
    }
    return false;
  }

  function createChallengeDefaultField(key, index) {
    if (challengeDetail.tournamentChallenge[key]) {
      const field = (
        <div className="challenge__info-group--leftalign">
          <p className="info-group__title">{upperCaseFirstLetter(key)}</p>
          <p className="info-group__description info-group__description--leftalign">{challengeDetail.tournamentChallenge[key]}</p>
        </div>
      );

      if (index % 2 === 0) {
        right.push(field);
      } else {
        left.push(field);
      }
      printedProps += 1;
    }
  }

  function createChallengeHtmlField(key, index) {
    if (challengeDetail.tournamentChallenge[key]) {
      const field = (
        <div className="challenge__info-group--leftalign" key={key}>
          <p className="info-group__title">{upperCaseFirstLetter(key)}</p>
          <p className="info-group__description info-group__description--leftalign" dangerouslySetInnerHTML={{ __html: challengeDetail.tournamentChallenge[key] }} />
        </div>
      );

      if (index % 2 === 0) {
        right.push(field);
      } else {
        left.push(field);
      }

      printedProps += 1;
    }
  }

  function createChallengeDurationField(key, index) {
    if (challengeDetail.tournamentChallenge[key].length) {
      const values = challengeDetail.tournamentChallenge[key];

      const field = (
        <div className="challenge__duration">
          <p className="info-group__title">Duration &#38; difficulty:</p>
          {
          values.map((level) => (
            <div className="duration__level custom-left-padding" key={level.level}>
              <p className="level__title">
                {level.level}
                {' '}
                level:
              </p>
              <div className="level__bottom">
                <p className="custom-left-padding--more">
                  {level.duration}
                  {' '}
                  hours
                </p>
              </div>
            </div>
          ))
        }
        </div>

      );

      if (index % 2 === 0) {
        right.push(field);
      } else {
        left.push(field);
      }

      printedProps += 1;
    }
  }

  function createChallengeUlField(key, index) {
    if (challengeDetail.tournamentChallenge[key].length) {
      const values = challengeDetail.tournamentChallenge[key];

      const field = (
        <div className="challenge__info-group--leftalign">
          <p className="info-group__title">
            {upperCaseFirstLetter(key)}
            :
          </p>

          <ul className="info-group__list">
            {values.map((value) => (
              <li className={`list__element ${key === 'technologies' && 'list__element--bold'}`} key={value}>{value}</li>
            ))}
          </ul>
        </div>
      );

      if (index % 2 === 0) {
        right.push(field);
      } else {
        left.push(field);
      }
      printedProps += 1;
    }
  }

  function prepareChallengeProps(challenge) {
    left = [];
    right = [];
    Object.keys(challenge.tournamentChallenge).forEach((key) => {
      if (!isIgnoredKey(key)) {
        switch (key) {
          case 'duration':
            createChallengeDurationField(key, printedProps);
            break;
          case 'deliverables':
          case 'technologies':
          case 'bonus':
            createChallengeUlField(key, printedProps);
            break;
          case 'hints':
          case 'references':
          case 'evaluationCriteria':
          case 'link':
            createChallengeHtmlField(key, printedProps);
            break;
          default:
            createChallengeDefaultField(key, printedProps);
        }
      }
    });

    setToRenderProps({ leftProps: left, rightProps: right });
  }

  useEffect(() => {
    if (challengeDetail && challengeDetail.tournamentChallenge && !hasRendered) {
      setHasRendered(() => true);
      prepareChallengeProps(challengeDetail);
    }
  }, [challengeDetail, challengeDetail?._id]);

  function handleUploadClick() {
    const fileInputElement = document.getElementById('deliverable__input');
    fileInputElement && fileInputElement.click();
  }

  function handleFileOnChange({ target: { files } }) {
    if (files.length) {
      dispatch(uploadChallengeDeliverable(
        challengeDetail._id, files[0], team.name, challengeDetail.challengeNumber,
      ));
    }
  }

  function handleSubmitClick() {
    if (!challengeDetail.isCompleted) {
      if (window.confirm('Are your sure you want to mark the challenge as completed?')) {
        dispatch(sendChallenge(challengeDetail._id));
        dispatch(incrementTeamSolvedChallenges(team._id));
      }
    }
  }

  return (
    challengeDetailLoading
      ? (
        <AppWrapper title="Challenge">
          <Loading text="Loading challenge information..." />
        </AppWrapper>
      )
      : (
        <AppWrapper title={`Challenge ${renderChallengeNumber(challengeDetail?.tournamentChallenge?.number)}`}>
          {teamChallengesError && (<LoadingError />)}
          {challengeDetail && (
            <div className="challenge-detail">
              <h2 className="challenge__name">{challengeDetail.tournamentChallenge.name}</h2>

              <div className="challenge__info-group">
                <p className="info-group__title">Mentor</p>
                <p className="info-group__description info-group__description--underlined">{challengeDetail.tournamentChallenge.mentor}</p>
              </div>
              <div className="challenge__info-group">
                <p className="info-group__title">Description</p>
                <p className="info-group__description" dangerouslySetInnerHTML={{ __html: challengeDetail.tournamentChallenge.description }} />
              </div>
              <div className="challenge__video">
                <div className="video__background" />
                <div className="video__player">
                  <iframe
                    src={challengeDetail.tournamentChallenge.videoUrl}
                    title="Video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="challenge__specific-info">
                <div className="specific-info__column">
                  {toRenderProps.leftProps}
                </div>

                <div className="specific-info__separator" />

                <div className="specific-info__column specific-info__column--spaced">
                  {toRenderProps.rightProps}
                </div>
              </div>
              {userLogged.role < userRoles.MENTOR && (
              <div className="challenge__actions">
                <div className="actions__upload-button">
                  <MainButton isSecondary onClick={handleUploadClick}>
                    <img src={uploadIcon} alt="upload" className="upload-button__icon" />
                    <span>Upload Deliverable</span>
                    <input type="file" id="deliverable__input" name="deliverable__input" accept="application/msword,text/plain,application/zip,application/vnd.rar,application/x-7z-compressed,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleFileOnChange} />
                  </MainButton>
                  <span className="upload-button__message"><i>* compatible files: txt, doc, docx, zip, rar.</i></span>
                </div>
                <div className="actions__submit-button">
                  <MainButton onClick={handleSubmitClick} color={challengeDetail.isCompleted ? 'blue' : 'red'}>
                    <p className="submit-button__text">
                      {challengeDetail.isCompleted ? 'Completed' : 'Send'}
                    </p>
                  </MainButton>
                </div>
              </div>
              )}
            </div>
          )}

        </AppWrapper>
      )
  );
}

export default ChallengeDetail;
