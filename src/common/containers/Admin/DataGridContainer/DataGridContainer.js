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
    setSelected,
    workpage
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
      selected: state.getIn(['user', 'selected']),
      seasonType: state.getIn(['user', 'seasonType']),
      teacher: state.getIn(['user','teacher'])
    //isAuthorized: state.getIn(['user', 'isAuthorized']),
  }),
  (dispatch) => ({
    getUserData: () => {
      WebAPI.getDataStore(dispatch);
    },
    onChangePage: () => {
      dispatch(workpage('admin'));
    },
    onRowClick: (row) => {
      // 取得老師的預約時間
      row.born = dateFormat(row.born);
      row.payDate = dateFormat(row.payDate);
      for (const [key, value] of Object.entries(row)) {
        //console.log(`${key} : ${value}`); // "a 5", "b 7", "c 9"
        if(value == null) {
          row[key] = "";
        }
        //document.getElementById[key].value = value;
      }
      //dispatch(setSelected(row.id))
      WebAPI.getTeacherTime(dispatch, row);
      
    },
    onDeleteRow: (rows) => {
      WebAPI.deleteRow(dispatch,rows);
    },
    onExportToCSV: (row) => {
      let data = [
        { id:1, name:'test'}
      ];
      return data;
    }, 
    delScore: (id) => () =>{
      WebAPI.delScore(id);
    },
    onSearchChange: (searchText, colInfos, multiColumnSearch) => {
      const text = searchText.trim();
      const initDG = JSON.parse(localStorage.getItem('dataStore'));
      if (text === '') {
        dispatch(getDgData({dg:initDG}));
        return;
      }
  
      let searchTextArray = [];
      if (multiColumnSearch) {
        searchTextArray = text.split(' ');
      } else {
        searchTextArray.push(text);
      }
  
      const data = initDG.filter((product) => {
        const keys = Object.keys(product);
        let valid = false;
        for (let i = 0, keysLength = keys.length; i < keysLength; i++) {
          const key = keys[i];
          if (colInfos[key] && product[key]) {
            const { format, filterFormatted, formatExtraData, searchable, hidden } = colInfos[key];
            let targetVal = product[key];
            if (!hidden && searchable) {
              if (filterFormatted && format) {
                targetVal = format(targetVal, product, formatExtraData);
              }
              for (let j = 0, textLength = searchTextArray.length; j < textLength; j++) {
                const filterVal = searchTextArray[j].toLowerCase();
                if (targetVal.toString().toLowerCase().indexOf(filterVal) !== -1) {
                  valid = true;
                  break;
                }
              }
            }
          }
        }
        return valid;
      });
      dispatch(getDgData({dg:data}));
    }
  })
)(DataGrid);