/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import './Challenges.scss';

// Constants
import userRoles from '../../../../constants/userRoles';

// Images
import teamIcon from '../../../../assets/images/team-icon.svg';
import guidesIcon from '../../../../assets/images/guides-icon.svg';
import kitIcon from '../../../../assets/images/kit-icon.svg';

// Action-Creators
import { loadAdminTemplateChallenges, loadTeamChallenges } from '../../../../redux/actions/mainActions';
import { loadTeam } from '../../../../redux/actions/loginActions';

// Components
import AppWrapper from '../../../../components/AppWrapper/AppWrapper';
import Loading from '../../../../components/Loading/Loading';
import LoadingError from '../../../../components/LoadingError/LoadingError';
import ChallengeCard from '../ChallengeCard/ChallengeCard';
import MainButton from '../../../../components/MainButton/MainButton';

function Challenges() {
  const dispatch = useDispatch();
  const {
    teamChallengesLoading,
    teamChallengesError,
    teamChallenges,
    team,
    tournamentId,
  } = useSelector(({ mainReducer }) => mainReducer);
  const { user } = useSelector(({ authReducer }) => authReducer);

  useEffect(() => {
    if (!team || !team?._id) {
      if (user.userLogged.role < userRoles.MENTOR) {
        dispatch(loadTeam(user?.userLogged?.teamId));
      }
    }
  }, [team, team?._id]);

  useEffect(() => {
    if (!teamChallenges || !teamChallenges?.length) {
      if (user.userLogged.role < userRoles.MENTOR) {
        if (team?._id) {
          dispatch(loadTeamChallenges(team?._id));
        }
      } else {
        dispatch(loadAdminTemplateChallenges(tournamentId));
      }
    }
  }, [teamChallenges, team?._id]);

  const challengesRender = teamChallengesError
    ? (
      <div className="challenges__loading">
        <LoadingError />
      </div>
    )
    : (
      <div className="challenges__main">
        <div className="challenges__challenge-list">
          {
          teamChallenges && (
            teamChallenges.map((challenge) => {
              if (challenge.tournamentChallenge?.isActive) {
                return (
                  <ChallengeCard
                    challenge={challenge}
                    isCompleted={challenge.isCompleted}
                    key={challenge._id}
                  />
                );
              }
            })
          )
          }
        </div>
        <div className="challenges__actions">
          <div className="actions__welcome-kit">
            { user.userLogged.role < userRoles.MENTOR && (
            <MainButton isSecondary>
              <a href="https://events.redhat.com/profile/395144" target="_blank" className="welcome-kit__link" rel="noreferrer">
                <img src={kitIcon} alt="welcome kit" className="link__image" />
                <span className="link__text">Request your welcome kit</span>
              </a>
            </MainButton>
            )}
          </div>
          <div className="actions__welcome-kit">
            <MainButton isSecondary>
              <Link to="/profile" className="edit-team__link">
                <img src={teamIcon} alt="edit team" className="link__image" />
                <span className="link__text">Edit your profile</span>
              </Link>
            </MainButton>
          </div>
          {user.userLogged.role < userRoles.MENTOR && (
            <div className="actions__edit-team">
              <MainButton isSecondary>
                <NavLink to="/participantsGuide">
                  <img src={guidesIcon} alt="edit team" className="link__image" />
                  <span className="link__text">Participant guide</span>
                </NavLink>
              </MainButton>
            </div>
          )}
        </div>
      </div>
    );

  const renderName = user?.userLogged?.role < userRoles.MENTOR
    ? `${team?.name} Team`
    : user?.userLogged?.name;

  return (
    <AppWrapper title={`Hi ${renderName}`}>
      <div className="challenges">
        <p className="challenges__text">
          Enter each of the categories and complete the
          challenges proposed to ensure a place on the pole!
        </p>
        {
          teamChallengesLoading
            ? (
              <div className="challenges__loading">
                <Loading text="Loading challenges..." />
              </div>
            )
            : (challengesRender)
          }

      </div>

    </AppWrapper>
  );
}

export default Challenges;
