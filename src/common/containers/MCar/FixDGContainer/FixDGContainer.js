import { connect } from 'react-redux';
import FixDG from '../../../components/MCar/FixDG';
import CarAPI from '../../../utils/CarAPI';

import {
  getDgData,
  workpage,
  changeMCarState,
  setCarData,
  setCarDetailData,
} from '../../../actions';

export default connect(
  (state) => ({
    columns: state.getIn(['car', 'dgDetailData']),
  }),
  (dispatch) => ({
    // getDetailData: () => {
    //   CarAPI.getDetailStore(dispatch);
    // },
    onChangePage: () => {
      dispatch(workpage('admin'));
    },
    onRowClick: (row) => {
      for (const [key, value] of Object.entries(row)) {
        console.log(`${key} : ${value}`); // "a 5", "b 7", "c 9"
        if (value == null) {
          row[key] = '';
        }
        //document.getElementById[key].value = value;
      }
      //row.detialId = row.id;
      document.querySelector('#detailId').value = row.id;
      dispatch(changeMCarState('update'));
      let data = { store: row, storeName: 'detailFormData' };
      dispatch(setCarData(data));
    },
    onDeleteRow: (rows) => {
      CarAPI.deleteDetailRow(dispatch, rows);
    },
    onSearchChange: (searchText, colInfos, multiColumnSearch) => {
      const text = searchText.trim();
      const initDG = JSON.parse(localStorage.getItem('dataStore'));
      if (text === '') {
        dispatch(getDgData({ dg: initDG }));
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
            const {
              format,
              filterFormatted,
              formatExtraData,
              searchable,
              hidden,
            } = colInfos[key];
            let targetVal = product[key];
            if (!hidden && searchable) {
              if (filterFormatted && format) {
                targetVal = format(targetVal, product, formatExtraData);
              }
              for (
                let j = 0, textLength = searchTextArray.length;
                j < textLength;
                j++
              ) {
                const filterVal = searchTextArray[j].toLowerCase();
                if (
                  targetVal.toString().toLowerCase().indexOf(filterVal) !== -1
                ) {
                  valid = true;
                  break;
                }
              }
            }
          }
        }
        return valid;
      });
      dispatch(getDgData({ dg: data }));
    },
  })
)(FixDG);
