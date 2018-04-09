import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import Main from '../components/Main';
//import CheckAuth from '../components/CheckAuth';
import HomePageContainer from '../containers/HomePageContainer';
import NoticePageContainer from '../containers/NoticePageContainer';
import ExamPageContainer from '../containers/ExamPageContainer';
import ScoreContainer from '../containers/ScoreContainer';
import AddExamContainer from '../containers/AddExamContainer';
import AddFormContainer from '../containers/Admin/AddFormContainer';
import auth from '../utils/auth';
import WebAPI from '../utils/WebAPI';

export default (
  <Route path='/' component={Main}>
    <IndexRoute component={HomePageContainer} />
    <Route path="/notice" component={NoticePageContainer}  />
    <Route path="/examPage" component={ExamPageContainer}  />
    <Route path="/score" component={ScoreContainer}  />
    <Route path="/addExam" component={AddExamContainer}/>
    <Route path="/ericAdmin" component={AddFormContainer} />
  </Route>
);
