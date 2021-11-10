import React from 'react';
import './Loading.scss';

import loadingIcon from '../../assets/images/loading-icon-red.svg';

function Loading({ text = 'Cargando...' }) {
  return (
    <div className="loading">
      <img className="loading__img" src={loadingIcon} alt="loading" />
      <p className="loading__text">{text}</p>
    </div>
  );
}

export default Loading;
