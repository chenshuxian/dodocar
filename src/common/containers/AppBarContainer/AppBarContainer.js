import React from 'react';
import { connect } from 'react-redux';
import AppBar from '../../components/AppBar';
import { browserHistory } from 'react-router';

import {
  startLogout,
  setRecipe,
  setUi,
  login
} from '../../actions';
import WebAPI from '../../utils/WebAPI';

export default connect(
  (state) => ({
    isAuthorized: state.getIn(['user', 'isAuthorized']),
    workpage: state.getIn(['ui','workpage']),
    userName: state.getIn(['user', 'userName']),
    login: state.getIn(['ui','login'])
  }),
  (dispatch) => ({
    onLogout: () => (
      dispatch(startLogout(dispatch))
    ),
    onLogin: () => {
      dispatch(login())
    },
    goExam: (event) => {
      WebAPI.getExam(dispatch);
    }
  })
)(AppBar);

