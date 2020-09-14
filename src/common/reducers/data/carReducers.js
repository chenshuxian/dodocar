import { handleActions } from 'redux-actions';
import { CarState } from '../../constants/models';
import { fromJS } from 'immutable';

const carReducers = handleActions(
  {
    SET_CAR_DATA: (state, { payload }) => {
      return state.set(payload.storeName, fromJS(payload.store));
    },
    SET_CAR_VALUE: (state, { payload }) => {
      let key = payload.key,
        value = payload.value,
        store = payload.store;
      console.log('car:' + value);
      return state.mergeIn([store, key], value);
    },
    SET_DG_DATA: (state, { payload }) => state.set('dgData', payload.dg),
    SET_CAR_NUM: (state, { payload }) => state.set('carNum', payload.carNum),
    SET_FIX_STORE: (state, { payload }) =>
      state.set('fixStore', payload.fixStore),
    SET_CAR_DETAIL_DATA: (state, { payload }) =>
      state.set('detailFormData', fromJS(payload)),
    SET_DG_DETAIL_DATA: (state, { payload }) =>
      state.set('dgDetailData', payload.dg),
  },
  CarState
);

export default carReducers;
