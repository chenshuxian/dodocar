import React from 'react';
import { connect } from 'react-redux';
import AddForm from '../../../components/MCar/AddForm';
import serialize from 'form-serialize';
import CarAPI from '../../../utils/CarAPI';
import { UserState, CarState } from '../../../constants/models';

import {
  setCarValue,
  setCarDetailValue,
  setCarData,
  changeFormState,
} from '../../../actions';

const years = [
  { id: '1', name: '全部' },
];

let startYear = 2020;
let nowYear = new Date().getFullYear();
let sumYear = nowYear - startYear;

for(let i = 0; i <= sumYear; i++) {
  years.push({id : startYear + i, name: startYear + i});
}

// console.log(years);


export default connect(
  (state) => ({
    carType: [
      { id: '1', name: '手排' },
      { id: '2', name: '自排' },
    ],
    color: [
      { id: '1', name: '白色' },
      { id: '2', name: '銀色' },
    ],
    rc: [
      { id: '1', name: '是' },
      { id: '2', name: '否' },
    ],
    lic: [
      { id: '1', name: '本區新領' },
      { id: '2', name: '停駛轉繳銷' },
      ,
      { id: '3', name: '外區移入-過戶' },
    ],
    year: years,
    month: [
      { id: '0', name: '全部' },
      { id: '01', name: '01' },
      { id: '02', name: '02' },
      { id: '03', name: '03' },
      { id: '04', name: '04' },
      { id: '05', name: '05' },
      { id: '06', name: '06' },
      { id: '07', name: '07' },
      { id: '08', name: '08' },
      { id: '09', name: '09' },
      { id: '10', name: '10' },
      { id: '11', name: '11' },
      { id: '12', name: '12' },
    ],
    formData: state.getIn(['car', 'formData']).toObject(),
    detailFormData: state.getIn(['car', 'detailFormData']).toObject(),
    formState: state.getIn(['ui', 'formState']),
    mCarState: state.getIn(['ui', 'mCarState']),
    store: 'detailFormData',
    teacher: state.getIn(['user', 'teacher']),
    car: state.getIn(['car', 'carNum']),
    fixStore: state.getIn(['car', 'fixStore']),
    //car: JSON.parse(localStorage.getItem('car')),
  }),
  (dispatch) => ({
    fieldChangeFn: (store) => () => {
      console.log(event.target.name + '' + event.target.value);
      let key = event.target.name,
        value = event.target.value;

      // 改變車號時取得對映的數據
      if (key == 'car_id' || key == 'year' || key == 'month') {
        CarAPI.getDetailStore(dispatch);
      }
      let data = {
        key,
        value,
        store: store || 'formData',
      };
      dispatch(setCarValue(data));
      // 小計計算
      if (key == 'num' || key == 'salary' || key == 'price') {
        let num = Number(document.querySelector('#num').value),
          salary = Number(document.querySelector('#salary').value),
          price = Number(document.querySelector('#price').value),
          count = num * price + salary;
        let totalPrice = {
          key: 'totalPrice',
          value: count,
          store: store || 'formData',
        };
        dispatch(setCarValue(totalPrice));
        document.querySelector('#totalPrice').value = count;
      }
    },
    handleSubmit: (e) => {
      e.preventDefault();
      var form = document.querySelector('#addcar'),
        data = serialize(form, { hash: true });
      console.log(`AddFormCon_addCar : ${data}`);
      CarAPI.addSingleCar(data, dispatch);
    },
    handleUpdate: (e) => {
      e.preventDefault();
      var form = document.querySelector('#addcar'),
        data = serialize(form, { hash: true });
      console.log(data);
      CarAPI.updateCar(data, dispatch);
      //dispatch(addSingleUser(data, dispatch));
    },
    detailSubmit: (e) => {
      e.preventDefault();
      var form = document.querySelector('#detail'),
        data = serialize(form, { hash: true });
      console.log(`detaildata: ${data}`);
      CarAPI.addDetailCar(data, dispatch);
    },
    detailUpdate: (e) => {
      e.preventDefault();
      var form = document.querySelector('#detail'),
        data = serialize(form, { hash: true });
      console.log(`detaildata: ${data}`);
      CarAPI.updateDetail(data, dispatch);
      //dispatch(addSingleUser(data, dispatch));
    },
    newAdd: () => {
      CarAPI.getDataStore(dispatch);
      dispatch(changeFormState('insert'));
    },
    excel: () => {
      CarAPI.getReport();
    },
    report: () => {
      let filename = localStorage.getItem('excelName');
      window.open(
        `http://localhost:3000/static/download/${filename}/${filename}.xlsx`
      );
    },
  })
)(AddForm);
