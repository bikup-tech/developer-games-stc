import React from 'react';

import './AppWrapper.scss';

import Alert from '../Alert/Alert';

function AppWrapper({ title, children }) {
  return (
    <div className="app-wrapper">
      <Alert />
      <div className="app-wrapper__title">
        <h2 className="wrapper-title__text">{title}</h2>
      </div>
      <div className="app-wrapper__children-container">
        <div className="app-wrapper__children">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AppWrapper;
