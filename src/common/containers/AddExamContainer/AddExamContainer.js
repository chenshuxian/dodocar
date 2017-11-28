import React from 'react';
import { connect } from 'react-redux';
import AddExam from '../../components/AddExam';

import {
    addExam,
    addUser
} from '../../actions';

export default connect(
  (state) => ({
    //isAuthorized: state.getIn(['user', 'isAuthorized']),
  }),
  (dispatch) => ({
    addExam: () => {
      //var file = document.getElementById('examFile').files[0];
      dispatch(addExam(dispatch))
    },
    addStu: () => {
      //var user = document.getElementById('stuFile').files[0];
      dispatch(addUser(dispatch))
    }
  })
)(AddExam);