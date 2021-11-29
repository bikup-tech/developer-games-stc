import './Teams.scss';

import React, { useEffect } from 'react';
// Action Creators
import {
  getCompletedChallengeByChallengeId,
  loadTournamentChallenges,
  loadTournamentTeams,
} from '../../redux/actions/mainActions';
import { useDispatch, useSelector } from 'react-redux';

// Components
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import Loading from '../../components/Loading/Loading';
import LoadingError from '../../components/LoadingError/LoadingError';
import MainButton from '../../components/MainButton/MainButton';
import TeamCard from './components/TeamCard/TeamCard';

function Teams() {
  const dispatch = useDispatch();
  const {
    tournamentTeams, tournamentId, teamsLoading,
    loadTeamsError, tournamentChallenges, tournamentChallengesError,
  } = useSelector(({ mainReducer }) => mainReducer);

  useEffect(() => {
    if (!tournamentTeams) {
      dispatch(loadTournamentTeams(tournamentId));
    }
  }, [tournamentTeams]);

  useEffect(() => {
    if (!tournamentChallenges) {
      dispatch(loadTournamentChallenges(tournamentId));
    }
  }, [tournamentChallenges]);

  async function handleDownload(challengeNumber, challengeId) {
    dispatch(getCompletedChallengeByChallengeId(challengeId, challengeNumber));
  }

  return (
    <AppWrapper title="Tournament Teams">
      {
        teamsLoading
          ? (<Loading text="Loading tournament teams..." />)
          : (
            <div className="teams">
              {loadTeamsError && (<LoadingError />) }
              {tournamentTeams && (
                <>
                  <div className="downloads-container">
                    <p className="downloads__title">Download completed team challenges:</p>
                    {tournamentChallengesError && 'There has been an error loading all the tournament challenges, please reload the page.'}
                    <div className="downloads__buttons">
                      {tournamentChallenges && (
                        tournamentChallenges.map((challenge) => (
                          <div className="downloads__button">
                            <MainButton
                              isSecondary
                              onClick={() => { handleDownload(challenge.number, challenge._id); }}
                            >
                              {`Challenge ${challenge.number}`}
                            </MainButton>
                          </div>
                        ))

                      )}
                    </div>
                  </div>
                  <div className="teams__list">
                    {tournamentTeams.map((team, index) => (
                      <TeamCard team={team} number={index + 1} key={team._id} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )
      }
    </AppWrapper>
  );
}

export default Teams;
