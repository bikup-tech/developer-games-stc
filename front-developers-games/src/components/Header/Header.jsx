/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import './Header.scss';

// Constants
import userRoles from '../../constants/userRoles';

// utils
import getGcloudBucketFileUrl from '../../utils/getGcloudBucketFileUrl';

// Assets
import headerLogos from '../../assets/images/header-logos.svg';
import openMenuIcon from '../../assets/images/menu-icon.svg';
import closeMenuIcon from '../../assets/images/close-icon.svg';

const unloggedNavigation = [
  { name: 'Register', route: '/santander' },
  { name: 'Prizes', route: '/prizes' },
  { name: 'Terms & conditions', route: '/terms' },
  { name: 'Login', route: '/login' },
];

function Header() {
  const history = useHistory();
  const { isLogged, userLogged } = useSelector(
    ({ authReducer }) => authReducer.user,
  );
  const {
    name: userName,
    avatar,
  } = useSelector(({ authReducer }) => authReducer.user.userLogged);

  const { isHeaderVisible } = useSelector(({ mainReducer }) => mainReducer);

  const participantNavigation = [
    { name: 'Challenges', route: '/santander/challenges' },
    { name: 'Prizes', route: '/prizes' },
    { name: 'Participant Guide', route: '/participantsGuide' },
    { name: 'Request your welcome kit', route: '/' },
    { name: 'Hands-on Workshops', route: '/handsOnWorkshops' },
    { name: userName, route: '/profile' },
  ];
  const adminNavigation = [
    { name: 'See teams', route: '/santander/teams' },
    { name: 'Challenges', route: '/santander/challenges' },
    { name: userName, route: '/profile' },
  ];
  const mentorNavigation = [
    { name: 'See teams', route: '/santander/teams' },
    { name: 'Challenges', route: '/santander/challenges' },
    { name: userName, route: '/profile' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [renderedNavigation, setRenderedNavigation] = useState(unloggedNavigation);

  useEffect(() => {
    if (isLogged) {
      if (userLogged?.role <= userRoles.CAPTAIN) {
        setRenderedNavigation(participantNavigation);
      } else if (userLogged?.role <= userRoles.MENTOR) {
        setRenderedNavigation(mentorNavigation);
      } else {
        setRenderedNavigation(adminNavigation);
      }
    } else {
      setRenderedNavigation(unloggedNavigation);
    }
  }, [userLogged?.role, isLogged]);

  function handleHamburgerClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  const renderMenu = renderedNavigation.map((element) => (
    (element.name === userName ? (
      <div className="navigation__profile" key={element.name}>
        <NavLink
          to={element.route}
          key={element.name}
          className="navigation__item"
          activeClassName="navigation__item--active"
          onClick={handleHamburgerClick}
          exact
        >
          {element.name}
        </NavLink>
        <div className="login-info__avatar--small">
          <img
            src={getGcloudBucketFileUrl(avatar)}
            alt="team avatar"
            className="avatar__image"
            onClick={() => history.replace('/profile')}
          />
        </div>
      </div>

    ) : (
      (element.name === 'Request your welcome kit' ? (
        <a
          href="https://events.redhat.com/profile/395144"
          target="_blank"
          rel="noreferrer"
          className="navigation__item"
          onClick={handleHamburgerClick}
          key={element.name}
        >
          {element.name}
        </a>
      ) : (
        <NavLink
          to={element.route}
          key={element.name}
          className="navigation__item"
          activeClassName="navigation__item--active"
          onClick={handleHamburgerClick}
          exact
        >
          {element.name}
        </NavLink>
      )
      ))
    )));

  return (
    <>
      {isHeaderVisible && (
        <header className="header">
          <div className="header__menu">
            <NavLink to="/santander" className="menu__logo">
              <img
                className="logo__image"
                src={headerLogos}
                alt="Developers games Redhat and Santander logos"
              />
            </NavLink>
            <img
              src={openMenuIcon}
              alt="Open menu icon"
              onClick={handleHamburgerClick}
              className="menu__hamburger mobile"
            />
            <nav className="menu__navigation desktop">{renderMenu}</nav>
          </div>
          {/* Menu behind opacity */}
          <div
            onClick={handleHamburgerClick}
            className={`mobile-menu__behind mobile ${
              isMenuOpen && 'mobile-menu__behind--visible'
            }`}
          />
          <div
            className={`header__mobile-menu mobile ${
              isMenuOpen && 'header__mobile-menu--visible '
            }`}
          >
            <img
              src={closeMenuIcon}
              alt="Close menu icon"
              className="mobile-menu__close"
              onClick={handleHamburgerClick}
            />
            <nav className="menu__navigation">{renderMenu}</nav>
          </div>
          <div
            className={isLogged ? 'header__banner--small' : 'header__banner--big'}
          />
        </header>
      )}
    </>
  );
}

export default Header;
