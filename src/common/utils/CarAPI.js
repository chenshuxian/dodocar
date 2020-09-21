import axios from 'axios';
import { CarState } from '../constants/models';
import { TRAINBOOK } from '../constants/exam';

import {
  setDgData,
  setCarData,
  getTeacher,
  setCarNum,
  changeMCarState,
  setDgDetailData,
  setFixStore,
} from '../actions';

function dateFormat(date) {
  let d = new Date(date),
    m = {
      0: '01',
      1: '02',
      2: '03',
      3: '04',
      4: '05',
      5: '06',
      6: '07',
      7: '08',
      8: '09',
      9: '10',
      10: '11',
      11: '12',
    },
    day =
      d.getDate().toString() < 10 ? 0 + d.getDate().toString() : d.getDate(),
    str = d.getFullYear() + '-' + m[d.getMonth()] + '-' + day;
  return str;
}

let detailFormData = CarState.get('detailFormData').toObject();
let data2 = { store: detailFormData, storeName: 'detailFormData' };

var getInit = (dispatch) => {
  axios
    .get('/api/car')
    .then((response) => {
      //dispatch(workpage('examPage'));
      let formData = CarState.get('formData').toObject();
      //let detailFormData = CarState.get('detailFormData').toObject();
      let dgData = JSON.parse(response.data.data),
        dgDataNew = JSON.parse(dgData.dgData);
      let teacher = JSON.parse(dgData.teacher);
      let carNum = JSON.parse(dgData.car);
      let fixStore = JSON.parse(dgData.fixStore);

      dgDataNew.map((item) => {
        item.born_date = dateFormat(item.born_date);
        item.ins_date = dateFormat(item.ins_date);
      });
      let data1 = { store: formData, storeName: 'formData' };

      localStorage.setItem('dataStore', dgData.dgData);
      localStorage.setItem('car', dgData.car);
      dispatch(setCarData(data1));
      dispatch(setCarData(data2));
      dispatch(getTeacher({ teacher: teacher }));
      dispatch(setCarNum({ carNum: carNum }));
      dispatch(setDgData({ dg: dgDataNew }));
      dispatch(setFixStore({ fixStore: fixStore }));

      //取得第一筆車號維修數據
      //let carId = { car_id: carNum[0].id };
      getDetail(dispatch);
    })
    .catch((error) => {
      console.log(error);
    });
};

var getDetail = (dispatch) => {
  //console.log(`getDetail: ${data.car_id}`);

  let data = { car_id: document.querySelector('#car_id').value };
  data.year = document.querySelector('#year').value;
  data.month = document.querySelector('#month').value;

  axios
    .get('/api/detail/', {
      params: { id: data.car_id, year: data.year, month: data.month },
    })
    .then((response) => {
      //console.log(response.data.data);
      let dgData = JSON.parse(response.data.data),
        dgDataNew = JSON.parse(dgData.dgData);

      dgDataNew.map((item) => {
        item.fix_date = dateFormat(item.fix_date);
      });
      dispatch(setDgDetailData({ dg: dgDataNew }));
    })
    .catch((error) => {
      console.log(error);
    });
};
export default {
  addUser: (dispatch) => {
    var files = document.getElementById('stuFile').files[0];
    var data = new FormData();
    data.append('data', files);
    if (data) {
      axios
        .post('/api/user', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.data.success === false) {
            //dispatch(authError());
            alert(response.data.message);
          } else {
            //dispatch(modal());
            alert('上傳成功');
          }
        })
        .catch(function (error) {
          //dispatch(authError());
        });
    } else {
      alert('請選擇上傳檔案');
    }
  },
  addSingleCar: (data, dispatch) => {
    if (data) {
      axios
        .post('/api/car', { data: data })
        .then((response) => {
          if (response.data.isFulfilled === false) {
            //dispatch(authError());
            alert(response.data.message);
          } else {
            //dispatch(modal());
            getInit(dispatch);
            alert('新增成功');
          }
        })
        .catch(function (error) {
          //dispatch(authError());
        });
    }
  },
  addDetailCar: (data, dispatch) => {
    if (data) {
      axios
        .post('/api/detail', { data: data })
        .then((response) => {
          console.log(`addDetail_response: ${response.data}`);
          if (response.data.success === false) {
            //dispatch(authError());
            alert(response.data.message);
          } else {
            //dispatch(modal());
            //取得當前car num
            //this.getDetailStore(dispatch);
            getDetail(dispatch);
            alert('新增成功');
          }
        })
        .catch(function (error) {
          //dispatch(authError());
        });
    }
  },
  updateCar: (data, dispatch) => {
    if (data) {
      axios.put('/api/car', { data: data }).then((response) => {
        if (response.data.success === true) {
          getInit(dispatch);
          alert('更新成功');
        }
      });
    }
  },
  updateDetail: (data, dispatch) => {
    if (data) {
      axios.put('/api/detail', { data: data }).then((response) => {
        if (response.data.success === true) {
          getDetail(dispatch);
          dispatch(changeMCarState('insert'));
          dispatch(setCarData(data2));
          alert('更新成功');
        }
      });
    }
  },
  getDataStore: (dispatch) => {
    getInit(dispatch);
  },
  getDetailStore: (dispatch) => {
    getDetail(dispatch);
  },
  deleteRow: (dispatch, rows) => {
    axios
      .delete('/api/car', {
        data: { rows: rows },
      })
      .then((response) => {
        getInit(dispatch);
        alert('刪除成功');
      });
  },
  deleteDetailRow: (dispatch, rows) => {
    let car = JSON.parse(localStorage.getItem('car'));
    let data = { car_id: car[0].id };
    axios
      .delete('/api/detail', {
        data: { rows: rows },
      })
      .then((response) => {
        getDetail(dispatch, data);
        alert('刪除成功');
      });
  },
  // delScore: (id) => {
  //   axios.delete(`/api/score/${id}`).then((response) => {
  //     alert('刪除成功');
  //   });
  // },
  dateFormat: (date) => {
    return dateFormat(date);
  },
  getReport: () => {
    let data = { car_id: document.querySelector('#car_id').value };
    data.year = document.querySelector('#year').value;
    data.month = document.querySelector('#month').value;

    axios
      .get('/api/xls', {
        params: { id: data.car_id, year: data.year, month: data.month },
      })
      .then((response) => {
        //alert('下載成功');
        let filename = response.data.fileName;
        console.log(`CarAPI: ${filename}`);
        if (filename) {
          localStorage.setItem('excelName', filename);
          window.setTimeout(() => {
            window.open(
              `http://www.fantasyball.tw:3000/static/download/${filename}/${filename}.xlsx`
            );
          }, 3000);
        }
      });
  },
};
