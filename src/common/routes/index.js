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

function requireAuth () {
  if(!auth.isLoggedIn()) {
    browserHistory.push('/');
  }
}

export default (
  <Route path='/' component={Main}>
    <IndexRoute component={HomePageContainer} />
    <Route path="/notice" component={NoticePageContainer} onEnter={requireAuth} />
    <Route path="/examPage" component={ExamPageContainer} onEnter={requireAuth} />
    <Route path="/score" component={ScoreContainer} onEnter={requireAuth} />
    <Route path="/addExam" component={AddExamContainer} onEnter={requireAuth} />
    <Route path="/admin" component={AddFormContainer} />
  </Route>
);
