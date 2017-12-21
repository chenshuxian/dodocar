import React from 'react';
import { connect } from 'react-redux';
import Login from '../../components/Login';

import { 
    login,
    setUser,
    authStart
} from '../../actions';

export default connect(
  (state) => ({
    isOpen: state.getIn(['ui','login']),
    userName: state.getIn(['user', 'userName']),
    password: state.getIn(['user', 'password']),
    modalTitle: '豆豆駕校'
  }),
  (dispatch) => ({
    onLogin: () => (
      dispatch(login())
    ),
    onChangeNumInput: (event) => (
      dispatch(setUser({ key: 'userName', value: event.target.value }))
    ),
    onChangePasswordInput: (event) => (
      dispatch(setUser({ key: 'password', value: event.target.value }))
    ),
    onLoginSubmit: (userName, password) => () => {
      console.log('loginModal' + userName + ' ' + password);
      dispatch(authStart(dispatch, userName, password));
    }
  }),
  (stateProps, dispatchProps, ownProps) => {
    const { userName, password } = stateProps;
    const { onLoginSubmit } = dispatchProps;
    return Object.assign({}, stateProps, dispatchProps, ownProps, {
      onLoginSubmit: onLoginSubmit(userName, password),
    });
  }
)(Login);