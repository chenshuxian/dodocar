import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI';

import {
  SET_UI,
  BUTTON_USEFUL,
  LOGIN,
  CHANGE_FORM_STATE,
} from '../constants/actionTypes';

export const setUi = createAction('SET_UI');
export const buttonUseful = createAction('BUTTON_USEFUL');
export const login = createAction('LOGIN');
export const changeFormState = createAction('CHANGE_FORM_STATE');
export const changeMCarState = createAction('CHANGE_MCAR_STATE');
