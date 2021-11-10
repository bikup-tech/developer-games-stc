import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './Home.scss';

// images
import redhatLogo from '../../assets/images/redhat-logo-icon.svg';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'HIDE_HEADER' });

    return () => {
      dispatch({ type: 'SHOW_HEADER' });
    };
  }, []);

  return (
    <div className="home__container">
      <div className="home__header">
        <a href="https://www.redhat.com/en" target="_blank" rel="noreferrer">
          <img className="header__logo" src={redhatLogo} alt="banner" />
        </a>
      </div>
      <div className="home__banner" />
      <nav className="home__footer ">
        <p className="items__item">Copyright ©2021 Red Hat, Inc</p>
        <a className="items__item" href="mailto: games@developergames.net?Subject=Contacto%20desde%20página%20inicio%20developerGames" target="_blank" rel="noreferrer">games@developergames.net</a>
      </nav>
    </div>
  );
}

export default Home;
