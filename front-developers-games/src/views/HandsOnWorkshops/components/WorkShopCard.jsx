import React from 'react';

import './WorkShopCard.scss';

// components
import MainButton from '../../../components/MainButton/MainButton';

// TODO: html siguiendo el modelo
function WorkShopCard({ workShop }) {
  return (
    <div className="workShop-card">
      <h3 className="challenge__subtitle--workshop">{workShop.name}</h3>
      <p className="challenge__author">{workShop.authors}</p>
      <p className="challenge__date">{workShop.date}</p>
      <p className="challenge__author">{workShop.seats}</p>
      <div className="challenge__regiter-button">
        <MainButton>
          <a href={workShop.link} target="_blank" rel="noreferrer">Register</a>
        </MainButton>
      </div>
      <div className="challenge__separator" />
    </div>
  );
}

export default WorkShopCard;
