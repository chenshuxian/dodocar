import React from 'react';
import { Link } from 'react-router'
import { NAV, EXAM } from '../../constants/pageTitle';

const AppBar = ({
  isAuthorized,
  onToShare,
  onLogout,
  workpage
}) => (
  <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div className="container">
        <a className="navbar-brand js-scroll-trigger" href="#page-top">{NAV.TITLE}</a>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i className="fa fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
            { workpage == '/' ?
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#exam">{NAV.EXAM}</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#about">{NAV.ABOUT}</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#contact">{NAV.CONTACT}</a>
                </li>
                <li className="nav-item">
                  <Link to='/notice' className="nav-link js-scroll-trigger" >{EXAM.NOTICE}</Link>
                </li>
              </ul>
              :
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="/">返回首頁</a>
                </li>
              </ul> 
          }
        </div>
      </div>
    </nav>
);

export default AppBar;