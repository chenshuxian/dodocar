import axios from 'axios';
import { CarState } from '../constants/models';
import { TRAINBOOK } from '../constants/exam';

import { 
 setDgData,
 setCarData
} from '../actions';

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

var getInit = (dispatch) => {
  axios.get('/api/car').then((response) => {
    //dispatch(workpage('examPage'));
    let formData = CarState.get('formData').toObject();
    let dgData = JSON.parse(response.data.data),
    dgDataNew = JSON.parse(dgData.dgData);
    dgDataNew.map(item => {
      item.born_date = dateFormat(item.born_date);
      item.ins_date = dateFormat(item.ins_date);
    });
    localStorage.setItem('dataStore', dgData.dgData);
    dispatch(setCarData(formData));
    dispatch(setDgData({dg:dgDataNew}));
  }).catch((error) => {
    console.log(error);
  });
}

export default {
  addUser: (dispatch) => {
    var files = document.getElementById('stuFile').files[0];
    var data = new FormData();
    data.append('data', files);
    if(data) {
      axios.post('/api/user',data,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
        })
      .then((response) => {
        if(response.data.success === false) {
          //dispatch(authError()); 
          alert(response.data.message);
        } else {
          //dispatch(modal());
          alert("上傳成功");
        }
      })
      .catch(function (error) {
        //dispatch(authError());
      });
    } else {
      alert('請選擇上傳檔案');
    }  
  },
  addSingleCar: (data,dispatch) => {
    if(data) {
      axios.post('/api/car',{data:data})
      .then((response) => {
        if(response.data.success === false) {
          //dispatch(authError()); 
          alert(response.data.message);
        } else {
          //dispatch(modal());
          getInit(dispatch);
          alert("新增成功");
        }
      })
      .catch(function (error) {
        //dispatch(authError());
      });
    } 
  },
  updateCar: (data, dispatch) => {
    if(data) {
      axios.put('/api/car',{data:data})
      .then((response) => {
        if(response.data.success === true){
          getInit(dispatch);
          alert('更新成功');
        }
      })
    }
  },
  getDataStore: (dispatch) => {
    getInit(dispatch);
  },
  deleteRow: (dispatch,rows) => {
    axios.delete('/api/car',{
      data: {rows: rows}
    }).then((response) => {
      getInit(dispatch);
      alert('刪除成功');
    })
  },
  delScore: (id) => {
    axios.delete(`/api/score/${id}`).then((response) => {
      alert('刪除成功');
    })
  },
  dateFormat: (date) => {
    return dateFormat(date);
  }
};