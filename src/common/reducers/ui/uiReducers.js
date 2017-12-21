import { handleActions } from 'redux-actions';
import { UiState } from '../../constants/models';

import {
  SET_UI,
  BUTTON_USEFUL,
  WORKPAGE,
  LOGIN
} from '../../constants/actionTypes';

const uiReducers = handleActions({
  SET_UI: (state, { payload }) => (
    state.set(payload.key, payload.value)
  ),   
  BUTTON_USEFUL: (state, { payload }) => (
    state.set(
      'isEdit',
      payload.key
    )
  ),
  WORKPAGE: (state, {payload}) => (
    state.set('workpage',payload)
  ),
  LOGIN: (state) => (
    state.set('login', !state.get('login'))
  )
}, UiState);

export default uiReducers;
