import React from 'react';

// Action Creators
import { logOut } from '../../../../redux/actions/loginActions';

function LogoutButton({ children }) {
  function handleLogout() {
    logOut();
  }

  return (
    <button
      type="button"
      className="main-button main-button--secondary"
      onClick={handleLogout}
    >
      {children}
    </button>
  );
}

export default LogoutButton;
