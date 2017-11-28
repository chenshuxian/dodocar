import { handleActions } from 'redux-actions';
import { UserState } from '../../constants/models';

import {
  AUTH_START,
  AUTH_COMPLETE,
  AUTH_ERROR,
  LOGOUT_START,
  SET_USER,
  ADD_USER
} from '../../constants/actionTypes';

const userReducers = handleActions({
  AUTH_START: (state) => (
    state.merge({
      isAuthorized: false,      
    })
  ),  
  AUTH_COMPLETE: (state) => (
    state.merge({
      email: '',
      password: '',
      isAuthorized: true,
    })
  ),  
  AUTH_ERROR: (state) => (
    state.merge({
      username: '',
      userNum: '',
      password: '',
      isAuthorized: false,
    })
  ),  
  START_LOGOUT: (state) => (
    state.merge({
      isAuthorized: false,      
    })
  ), 
  CHECK_AUTH: (state) => (
    state.set('isAuthorized', true)
  ),
  SET_USER: (state, { payload }) => (
    state.set(payload.key, payload.value)
  ),
  ADD_USER: (state, { payload }) => (
    state.set(payload.userNum, payload.passwd)
  )
}, UserState);

export default userReducers;
