import React from 'react';
import { connect } from 'react-redux';
import DataGrid from '../../../components/Admin/DataGrid';
import serialize from 'form-serialize';
import WebAPI from '../../../utils/WebAPI';


import {
    addExam,
    addUser,
    addSingleUser,
    getDgData
} from '../../../actions';

export default connect(
  (state) => ({
      columns: state.getIn(['user', 'dgData'])
    //isAuthorized: state.getIn(['user', 'isAuthorized']),
  }),
  (dispatch) => ({
    getUserData: () => {
      WebAPI.getDataStore(dispatch);
    }
  })
)(DataGrid);