import { handleActions } from 'redux-actions';
import { CarState } from '../../constants/models';
import { fromJS } from 'immutable';


const carReducers = handleActions({
 
  SET_CAR_DATA: (state, { payload }) => (
    state.set('formData', fromJS(payload) )
  ),
  SET_CAR_VALUE: (state, { payload }) => {
    let key = payload.key,
        value = payload.value;
        console.log("car:" + value);
    return state.mergeIn(['formData',key], value);
  },
  SET_DG_DATA: (state, { payload }) => (
    state.set('dgData', payload.dg)
  ),
}, CarState);

export default carReducers;
