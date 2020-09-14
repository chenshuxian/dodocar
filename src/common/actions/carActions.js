import { createAction } from 'redux-actions';
import { CarAPI } from '../utils/CarAPI';

export const addCar = createAction('ADD_CAR');
export const delCar = createAction('DEL_CAR');
export const updCar = createAction('UPD_CAR');
export const setCarValue = createAction('SET_CAR_VALUE');
export const setCarData = createAction('SET_CAR_DATA');
export const setDgData = createAction('SET_DG_DATA');
export const setCarDetailValue = createAction('SET_CAR_DETAIL_VALUE');
export const setCarDetailData = createAction('SET_CAR_DETAIL_DATA');
export const setDgDetailData = createAction('SET_DG_DETAIL_DATA');
export const setCarNum = createAction('SET_CAR_NUM');
export const setFixStore = createAction('SET_FIX_STORE');
