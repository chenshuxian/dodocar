import { createAction } from 'redux-actions';
import { CarAPI } from '../utils/CarAPI';

export const addCar = createAction('ADD_CAR');
export const delCar = createAction('DEL_CAR');
export const updCar = createAction('UPD_CAR');
export const setCarValue = createAction('SET_CAR_VALUE');
export const setCarData = createAction('SET_CAR_DATA');
export const setDgData = createAction('SET_DG_DATA');


