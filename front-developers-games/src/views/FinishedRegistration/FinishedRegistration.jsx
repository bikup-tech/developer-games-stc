import React from 'react';

// components
import AppWrapper from '../../components/AppWrapper/AppWrapper';

function FinishedRegistration() {
  return (
    <AppWrapper title="The Tournament is Full">
      <section className="register-container">
        <h3 className="app__title normal__font-size">
          Sorry but, we have reached maximum capacity for this edition.
        </h3>
        <h3 className="app__title normal__font-size">
          Stay tuned for upcoming events with Red Hat!
        </h3>
        <h3 className="app__title normal__font-size">
          Join us in our Red Hat developer site to get the latest news &nbsp;
          <a
            href="https://developers.redhat.com/"
            target="_blank"
            rel="noreferrer"
            className="app__title normal__font-size"
          >
            (https://developers.redhat.com/)
          </a>
          .
        </h3>
      </section>
    </AppWrapper>
  );
}

export default FinishedRegistration;
