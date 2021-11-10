import React from 'react';

// components
import AppWrapper from '../../components/AppWrapper/AppWrapper';

function FinishedTournament() {
  return (
    <AppWrapper title="The Tournament is finished">
      <section className="register-container">

        <h3 className="app__title normal__font-size">
          Winners will be announced in the closing ceremony on 14th of October at 16:30 pm CEST.
        </h3>
      </section>
    </AppWrapper>
  );
}

export default FinishedTournament;
