import React from 'react';
import { Link } from 'react-router'
import { NAV, EXAM } from '../../constants/pageTitle';

const DefautBar = () => (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <a className="nav-link js-scroll-trigger" href="#exam">{NAV.EXAM}</a>
    </li>
    {/* <li className="nav-item">
      <a className="nav-link js-scroll-trigger" href="#about">{NAV.ABOUT}</a>
    </li> */}
    <li className="nav-item">
      <a className="nav-link js-scroll-trigger" href="#contact">{NAV.CONTACT}</a>
    </li>
  </ul>
);

const HomeBar = (props) => (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <a className="nav-link js-scroll-trigger" onClick={props.goExam}>繼續考試</a>
      </li>
    </ul> 
);

const AdminBar = () => (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <a className="nav-link js-scroll-trigger" href="/teacher">教師管理</a>
    </li>
  </ul> 
);

function switchBar(page, goExam) {
  var focusBar = <HomeBar goExam={goExam}/>
  if (page == 'admin'){
    focusBar = ""
  }else if (page == '/'){
    focusBar = <DefautBar />
  }
  return focusBar;  
}

const AppBar = ({
  isAuthorized,
  userName,
  workpage,
  goExam
}) => (
  <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div className="container">
        <a className="navbar-brand js-scroll-trigger" href="#page-top">{NAV.TITLE}</a>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i className="fa fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
            { switchBar(workpage, goExam)}
        </div>
      </div>
    </nav>
);

export default AppBar;