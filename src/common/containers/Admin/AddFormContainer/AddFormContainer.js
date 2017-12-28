import React from 'react';
import { connect } from 'react-redux';
import AddForm from '../../../components/Admin/AddForm';

import {
    addExam,
    addUser
} from '../../../actions';

export default connect(
  (state) => ({
      today: new Date().toISOString(),
      teacher: ['t1','t2'],
      trainTime: ['tt1','tt2']
    //isAuthorized: state.getIn(['user', 'isAuthorized']),
  }),
  (dispatch) => ({
    addUser: () => {
      //var file = document.getElementById('examFile').files[0];
      dispatch(addUser(dispatch))
    },
    teacherTime: () => {
        alter('get teacher time');
    }
  })
)(AddForm);