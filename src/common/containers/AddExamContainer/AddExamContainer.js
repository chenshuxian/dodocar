import React from 'react';
import { connect } from 'react-redux';
import AddExam from '../../components/AddExam';

import {
    addExam
} from '../../actions';

export default connect(
  (state) => ({
    //isAuthorized: state.getIn(['user', 'isAuthorized']),
  }),
  (dispatch) => ({
    addExam: () => {
      var file = document.getElementById('examFile').files[0];
      dispatch(addExam(dispatch, file))
    }
  })
)(AddExam);