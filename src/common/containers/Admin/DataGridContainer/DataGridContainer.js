import React from 'react';
import { connect } from 'react-redux';
import DataGrid from '../../../components/Admin/DataGrid';
import serialize from 'form-serialize';
import WebAPI from '../../../utils/WebAPI';
import { TRIANTIME } from '../../../constants/exam';


import {
    addExam,
    addUser,
    addSingleUser,
    getDgData,
    setFormData,
    changeFormState,
    getTrainTime,
    setSelected
} from '../../../actions';

function dateFormat(date) {

  let d = new Date(date),
      m = {
        0: "01",
        1: "02",
        2: "03",
        3: "04",
        4: "05",
        5: "06",
        6: "07",
        7: "08",
        8: "09",
        9: "10",
        10: "11",
        11: "12"
      },
      day = d.getDate().toString() < 10 ? 0 + d.getDate().toString() : d.getDate(),
      str = d.getFullYear() + "-" + m[d.getMonth()] + "-" + day;
  return str; 
}

export default connect(
  (state) => ({
      columns: state.getIn(['user', 'dgData']),
      selected: state.getIn(['user', 'selected'])
    //isAuthorized: state.getIn(['user', 'isAuthorized']),
  }),
  (dispatch) => ({
    getUserData: () => {
      WebAPI.getDataStore(dispatch);
    },
    onRowClick: (row) => {
      // 取得老師的預約時間
      row.born = dateFormat(row.born);
      dispatch(setSelected(row.id))
      WebAPI.getTeacherTime(dispatch, row);
      // let ttId = row.trainTimeId;
      // row.born = dateFormat(row.born);
      // dispatch(changeFormState('update'));
      // dispatch(setFormData(row));
      //dispatch(getTrainTime({id:ttId,name:TRIANTIME[ttId]}));
   
      //console.log(row);
      for (const [key, value] of Object.entries(row)) {
        console.log(`${key} : ${value}`); // "a 5", "b 7", "c 9"
        
        //document.getElementById[key].value = value;
      }
    }
  })
)(DataGrid);