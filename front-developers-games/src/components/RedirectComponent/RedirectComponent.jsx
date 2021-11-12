import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
        history.replace('/stc/challenges');
      }
    } else {
      history.replace('/login');
    }
  });
  return (<></>);
}

export default RedirectComponent;
