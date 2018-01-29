import { handleActions } from 'redux-actions';
import { UserState } from '../../constants/models';
import { fromJS } from 'immutable';

import {
  AUTH_START,
  AUTH_COMPLETE,
  AUTH_ERROR,
  LOGOUT_START,
  SET_USER,
  ADD_USER,
  GETDGDATA,
  GETTEACHER,
  GET_TRAIN_TIME,
  SET_FORM_DATA,
  SET_FIELD_VALUE,
  FIX_TRAIN_TIME,
  SET_SEASON_TYPE
} from '../../constants/actionTypes';

const userReducers = handleActions({
  AUTH_START: (state) => (
    state.merge({
      isAuthorized: 0,      
    })
  ),  
  AUTH_COMPLETE: (state) => (
    state.merge({
      email: '',
      password: '',
      isAuthorized: 1,
    })
  ),  
  AUTH_ERROR: (state) => (
    state.merge({
      username: '',
      userNum: '',
      password: '',
      isAuthorized: 0,
    })
  ),  
  START_LOGOUT: (state) => (
    state.merge({
      isAuthorized: 0,      
    })
  ), 
  CHECK_AUTH: (state) => (
    state.set('isAuthorized', 1)
  ),
  SET_USER: (state, { payload }) => (
    state.set(payload.key, payload.value)
  ),
  ADD_USER: (state, { payload }) => (
    state.set(payload.userNum, payload.passwd)
  ),
  GETDGDATA: (state, { payload }) => (
    state.set('dgData', payload.dg)
  ),
  GETTEACHER: (state, { payload }) => (
    state.set('teacher', payload.teacher)
  ),
  GET_TRAIN_TIME: (state, { payload }) => {
    if(!Array.isArray(payload)){
      let tt = state.get('trainTime');
      tt.push(payload);
      return state.set('trainTime', tt);
    } else {
      return state.set('trainTime', payload );
    }
  },
  GET_CLASS_TYPE: (state, { payload }) => (
    state.set('classType', payload )
  ),
  SET_SEASON_TYPE: (state, { payload }) => (
    state.set('seasonType', payload )
  ),  
  CHANGE_CLASS_TYPE: (state, { payload }) => (
    state.set('classTypeIndex', payload )
  ),
  CHANGE_TEACHER_INDEX: (state, { payload }) => (
    state.set('teacherIndex', payload)
  ),
  SET_FORM_DATA: (state, { payload }) => (
    state.set('formData', fromJS(payload) )
  ),
  SET_FIELD_VALUE: (state, { payload }) => {
    let key = payload.key,
        value = payload.value;
        //console.log(state);
    return state.mergeIn(['formData',key], value);
  },
  FIX_TRAIN_TIME: (state, { payload }) => (
    state.merge({trainTime: payload })
  ),
  SET_SELECTED: (state, { payload }) => (
    state.set('selected', payload )
  )
}, UserState);

export default userReducers;
