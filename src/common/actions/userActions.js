import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI';

import {
  AUTH_START,
  AUTH_COMPLETE,
  AUTH_ERROR,
  START_LOGOUT,
  CHECK_AUTH,
  SET_USER,
  ADD_USER,
  ADDSINGLEUSER,
  GETDGDATA,
  GETTEACHER,
  GET_TRAIN_TIME,
  GET_CLASS_TYPE,
  CHANGE_CLASS_TYPE,
  CHANGE_TEACHER_INDEX
} from '../constants/actionTypes';

export const authStart = createAction('AUTH_START', WebAPI.login);
export const authComplete = createAction('AUTH_COMPLETE');
export const authError = createAction('AUTH_ERROR');
export const startLogout = createAction('START_LOGOUT', WebAPI.logout);
export const checkAuth = createAction('CHECK_AUTH');
export const setUser = createAction('SET_USER');
export const addUser = createAction('ADD_USER', WebAPI.addUser);
export const addSingleUser = createAction('ADDSINGLEUSER', WebAPI.addSingleUser);
export const getDgData = createAction('GETDGDATA');
export const getTeacher = createAction('GETTEACHER');
export const getTrainTime = createAction('GET_TRAIN_TIME');
export const getClassType = createAction('GET_CLASS_TYPE');
export const changeClassType = createAction('CHANGE_CLASS_TYPE');
export const changeTeacherIndex = createAction('CHANGE_TEACHER_INDEX');
