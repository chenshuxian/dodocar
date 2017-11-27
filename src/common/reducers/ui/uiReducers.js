import { handleActions } from 'redux-actions';
import { UiState } from '../../constants/models';

import {
  SHOW_SPINNER,
  HIDE_SPINNER,
  SET_UI,
  BUTTON_USEFUL,
  WORKPAGE
} from '../../constants/actionTypes';

const uiReducers = handleActions({
  SHOW_SPINNER: (state) => (
    state.set(
      'spinnerVisible',
      true
    )
  ),
  HIDE_SPINNER: (state) => (
    state.set(
      'spinnerVisible',
      false
    )
  ),
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
  )
}, UiState);

export default uiReducers;
