/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// constant
import userRoles from '../../constants/userRoles';
//  components
import Challenges from './components/Challenges/Challenges';
import TournamentCountdown from '../TournamentCountdown/TournamentCountdown';
import FinishedTournament from '../FinishedTournament/FinishedTournament';
import { loadTournament } from '../../redux/actions/tournamentActions';

function ChallengesPageContainer() {
  const dispatch = useDispatch();

  const { userLogged } = useSelector(({ authReducer }) => authReducer.user);
  const { tournament } = useSelector(({ tournamentReducer }) => tournamentReducer);

  useEffect(() => {
    if (!tournament?._id) {
      dispatch(loadTournament(tournament.name));
    }
  });

  return (
    <>
      {/* {
          tournament && (
            userLogged.role < userRoles.MENTOR ? (
              tournament?.isActive ? (
                <Challenges />
              ) : (
                <TournamentCountdown date={tournament.startDate} />
              )
            ) : (
              <Challenges />
            )
          )

      } */}

      {
        tournament && (
          userLogged.role < userRoles.MENTOR ? (
            tournament?.isActive ? (<Challenges />) : (<FinishedTournament />)
          ) : (<Challenges />)
        )
      }

    </>
  );
}

export default ChallengesPageContainer;
