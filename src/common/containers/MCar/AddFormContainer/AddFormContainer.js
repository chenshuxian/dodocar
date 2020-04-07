import React from 'react';
import { connect } from 'react-redux';
import AddForm from '../../../components/MCar/AddForm';
import serialize from 'form-serialize';
import CarAPI from '../../../utils/CarAPI';
import { UserState } from '../../../constants/models';


import {
  setCarValue,
  setCarData,
  changeFormState
} from '../../../actions';

export default connect(
  (state) => ({
      carType: [{id:'1',name:'手排'},{id:'2',name:'自排'}],
      color: [{id:'1',name:'白色'},{id:'2',name:'銀色'}],
      rc: [{id:'1',name:'是'},{id:'2',name:'否'}],
      lic: [{id:'1',name:'本區新領'},{id:'2',name:'停駛轉繳銷'},,{id:'3',name:'外區移入-過戶'}],
      formData: state.getIn(['car', 'formData']).toObject(),
      formState: state.getIn(['ui','formState']),
  }),
  (dispatch) => ({
    fieldChangeFn: (e) => {
      console.log(e.target.name + '' + e.target.value);
      let data = { key: e.target.name, value: e.target.value};
      dispatch(setCarValue(data));
    },
    handleSubmit: (e) => {
      e.preventDefault();
      var form = document.querySelector('#addcar'),
          data = serialize(form, { hash: true });
      console.log(data);
      CarAPI.addSingleCar(data, dispatch);
    },
    handleUpdate: (e) => {
      e.preventDefault();
      var form = document.querySelector('#addcar'),
          data = serialize(form, { hash: true });
      console.log(data);
      CarAPI.updateCar(data,dispatch);
      //dispatch(addSingleUser(data, dispatch));
    },
    newAdd: () => {
      CarAPI.getDataStore(dispatch);
      dispatch(changeFormState('insert'))
    },
  })
)(AddForm);