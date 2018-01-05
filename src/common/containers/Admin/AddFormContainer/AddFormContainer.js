import React from 'react';
import { connect } from 'react-redux';
import AddForm from '../../../components/Admin/AddForm';
import serialize from 'form-serialize';
import WebAPI from '../../../utils/WebAPI';


import {
    addExam,
    addUser,
    addSingleUser,
    getTrainTime,
    changeClassType,
    changeTeacherIndex
} from '../../../actions';

export default connect(
  (state) => ({
      today: new Date().toISOString(),
      trainTime: state.getIn(['user', 'trainTime']),
      gender:['男','女'],
      source: [{name:'網站',id:'2'},{name:'朋友', id:'2'}],
      carType: ['手排','自排'],
      teachers: state.getIn(['user','teacher']),
      classType: state.getIn(['user','classType']),
      season: state.getIn(['user','classType','season']),
      classTypeIndex: state.getIn(['user','classTypeIndex']),
      teacherIndex : state.getIn(['user','teacherIndex'])
    //isAuthorized: state.getIn(['user', 'isAuthorized']),
  }),
  (dispatch) => ({
    addUser: () => {
      //var file = document.getElementById('examFile').files[0];
      dispatch(addUser(dispatch))
    },
    teacherTime: () => {
        alter('get teacher time');
    },
    submit: values => {
      console.log(values);
    },
    handleSubmit: (e) => {
      e.preventDefault();
      var form = document.querySelector('#adduser'),
          data = serialize(form, { hash: true });
      console.log(data);
      dispatch(addSingleUser(data));
    },
    teacherFn: (classTypeId) => () => {
      //console.log(event.target.value);
      dispatch(changeTeacherIndex(event.target.selectedIndex));
      let teacherId = event.target.value,
          examId = classTypeId;
      WebAPI.getTrainTime(dispatch,teacherId, examId);
      //dispatch(getTrainTime(data));
    },
    classTypeFn: (teacherId) => () =>{
      //localStorage.setItem('classType', event.target.value);
      dispatch(changeClassType(event.target.selectedIndex));
      let tId = teacherId,
      examId = event.target.value;
      WebAPI.getTrainTime(dispatch,tId, examId);
      //console.log(event.target.selectedIndex);
    },
    rowGetter: (index) => {
      let rows = [];
      for (let i = 1; i < 1000; i++) {
        rows.push({
          id: i,
          title: 'Title ' + i,
          count: i * 1000,
          active: i % 2
        });
      }
      return rows[index];
    }
  })
)(AddForm);