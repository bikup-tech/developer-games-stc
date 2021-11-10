import React from 'react';

import './MainButton.scss';
/*
    PROPS INFO:
    color
        - "red" (default)
        - "blue"
*/

function MainButton({
  children, onClick, isSecondary, color, isBig, isDisabled,
}) {
  return (
    <button
      type="button"
      className={`main-button ${color === 'blue' && 'main-button--blue'} ${isSecondary && 'main-button--secondary'} ${isBig && 'main-button--big'}`}
      style={{
        background: isDisabled && 'rgba(0,0,0,0.1)',
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default MainButton;
