import React from 'react';
import { HEADER } from '../../constants/pageTitle';

const Header = ({
  isAuthorized,
  onToShare,
  onLogout,
}) => (
    <header className="masthead">
      <div className="container">
        <img className="img-fluid" src="static/images/profile.png" alt="" />
        <div className="intro-text">
          <span className="name">{HEADER.TITLE}</span>
          <hr className="star-light" />
          <span className="skills">{HEADER.SUBTITLE}</span>
        </div>
      </div>
    </header>
);

export default Header;