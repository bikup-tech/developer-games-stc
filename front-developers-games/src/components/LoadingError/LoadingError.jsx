import React from 'react';
import './LoadingError.scss';

import loadingErrorIcon from '../../assets/images/loading-error-icon.svg';

function LoadingError({ text = 'Ha habido un error. Intentalo de nuevo.' }) {
  return (
    <div className="loading-error">
      <img className="loading-error__img" src={loadingErrorIcon} alt="loading-error error" />
      <p className="loading-error__text">{text}</p>
    </div>
  );
}

export default LoadingError;
