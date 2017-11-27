import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI';

import {
  SHOW_SPINNER,
  HIDE_SPINNER,
  SET_UI,
  BUTTON_USEFUL
} from '../constants/actionTypes';

export const showSpinner = createAction('SHOW_SPINNER');
export const hideSpinner = createAction('HIDE_SPINNER');
export const setUi = createAction('SET_UI');
export const buttonUseful = createAction('BUTTON_USEFUL');