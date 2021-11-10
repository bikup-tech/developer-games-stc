import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Footer.scss';

const participantFooter = [
  { name: 'Terms & conditions', route: '/terms' },
  { name: 'Prizes', route: '/prizes' },
];
const adminFooter = [
  { name: 'Terms & conditions', route: '/terms' },
];

function Footer() {
  const [footerNavigation, setFooterNavigation] = useState(participantFooter);
  const { role } = useSelector(({ authReducer }) => authReducer.user.userLogged);

  useEffect(() => {
    role >= 2
      ? setFooterNavigation(adminFooter)
      : setFooterNavigation(participantFooter);
  }, [role]);

  const renderedFooter = footerNavigation.map((element) => (element.name !== 'Privacy statement'
    ? (
      <Link
        to={element.route}
        key={element.name}
        className="items__item"
      >
        {element.name}
      </Link>
    )
    : (
      <a
        href="https://www.redhat.com/en/about/privacy-policy"
        target="_blank"
        rel="noreferrer"
        className="items__item"
        key={element.name}
      >
        {element.name}
      </a>
    )));
  return (
    <footer className="footer-container">
      <div className="footer__items">
        <nav className="items__navigation">
          <p className="items__item">Copyright ©2021 S&amp;D</p>
          <p className="items__item">Sponsored by Red Hat</p>
          {
            renderedFooter
          }
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
