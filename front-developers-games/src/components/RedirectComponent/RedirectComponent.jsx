import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Constants
import userRoles from '../../constants/userRoles';

function RedirectComponent() {
  const history = useHistory();

  const { user } = useSelector(({ authReducer }) => authReducer);

  useEffect(() => {
    if (user?.isLogged) {
      if (user?.userLogged?.role >= userRoles.MENTOR) {
        history.replace('/profile');
      } else {
        history.replace('/santander/challenges');
      }
    } else {
      history.replace('/login');
    }
  });
  return (<></>);
}

export default RedirectComponent;
