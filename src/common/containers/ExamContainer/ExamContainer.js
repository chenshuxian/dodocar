import React from 'react';
import { connect } from 'react-redux';
import Exam from '../../components/Exam';

import { 
  authStart,
  showSpinner,
  setUser,
} from '../../actions';

export default connect(
  (state) => ({
    //isAuthorized: state.getIn(['user', 'isAuthorized']),
    userNum: state.getIn(['user', 'userNum']),
    password: state.getIn(['user', 'password']),
  }),
  (dispatch) => ({
    onChangeNumInput: (event) => (
      dispatch(setUser({ key: 'userNum', value: event.target.value }))
    ),
    onChangePasswordInput: (event) => (
      dispatch(setUser({ key: 'password', value: event.target.value }))
    ),
    onLoginSubmit: (userNum, password) => () => {
      //alert('authStart' + userNum + ',' + password);
      dispatch(authStart(dispatch, userNum, password));
      // dispatch(showSpinner());
    },
  }),
  (stateProps, dispatchProps, ownProps) => {
    const { userNum, password } = stateProps;
    const { onLoginSubmit } = dispatchProps;
    return Object.assign({}, stateProps, dispatchProps, ownProps, {
      onLoginSubmit: onLoginSubmit(userNum, password),
    });
  }
)(Exam);