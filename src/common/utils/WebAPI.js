import react from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import uuid from 'uuid';
import { Alert } from 'reactstrap';
import EXAMTOTAL from '../constants/exam';
import { UserState } from '../constants/models';
import { TRAINBOOK } from '../constants/exam';

import { 
  authComplete,
  authError,
  hideSpinner,
  completeLogout,
  getExam,
  score,
  workpage,
  startExam,
  login,
  getDgData,
  getTeacher,
  getTrainTime,
  getClassType,
  setFormData,
  changeClassType,
  changeFormState,
  finishData,
  setSeasonType
} from '../actions';

function getCookie(keyName) {
  var name = keyName + '=';
  const cookies = document.cookie.split(';');
  for(let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0)==' ') {
          cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
  }
  return "";
}

var getInit = (dispatch) => {
  axios.get('/api/init').then((response) => {
    //dispatch(workpage('examPage'));
    let formData = UserState.get('formData').toObject();
    formData.classType = TRAINBOOK.initExam;
    formData.teacher = TRAINBOOK.initTeacher;
    let dgData = JSON.parse(response.data.data),
    dgDataNew = JSON.parse(dgData.dgData),
    typeClass = JSON.parse(dgData.typeClass),
    teacher = JSON.parse(dgData.teacher),
    trainTime = JSON.parse(dgData.trainTime);
    localStorage.setItem('dataStore', dgData.dgData);
    dispatch(setFormData(formData));
    dispatch(getDgData({dg:dgDataNew}));
    dispatch(getTeacher({teacher:teacher}));
    dispatch(setSeasonType(typeClass));
    dispatch(getTrainTime(trainTime));
    
  }).catch((error) => {
    console.log(error);
  });
}

export default {
  login: (dispatch, userNum, password) => {
    //alert('login' + email);
    axios.post('/api/login', {
      userId: userNum,
      exPwd: password
    })
    .then((response) => {
      if(response.data.success == "false") {
        //dispatch(login());
        alert(response.data.message);
        //window.location.reload();        
      } else {
      
          var token = response.data.token,
              info;
          localStorage.setItem('userId',response.data.userId);
          localStorage.setItem('token',token);
          //info = JSON.parse(atob(token.split('.')[1]));
          //localStorage.setItem('user',info.user);
          //localStorage.setItem('admin',info.admin);
          dispatch(authComplete());
          dispatch(workpage('notice'));
          //dispatch(login());
          browserHistory.push('/notice');
          window.scroll(0,0);
        //}
      }
    })
    .catch(function (error) {
      //dispatch(authError());
      alert(error);
    });
  },
  logout: (dispatch) => {
    document.cookie = 'token=; ' + 'expires=Thu, 01 Jan 1970 00:00:01 GMT;'; 
    browserHistory.push('/'); 
  },
  addExam: (dispatch, file) => {
    //alert(file.name);
    var files = document.getElementById('examFile').files[0];
    var data = new FormData();
    data.append('data', files);
    //alert(data);
    if(data) {
      axios.post('/api/exams',data,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
        })
      .then((response) => {
        if(response.data.success === false) {
          //dispatch(authError()); 
        } else {
          //dispatch(modal());
          alert("上傳成功");
        }
      })
      .catch(function (error) {
        dispatch(authError());
      });
    } else {
      alert('請選擇上傳檔案');
    }  
  },
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
        dispatch(authError());
      });
    } else {
      alert('請選擇上傳檔案');
    }  
  },
  addSingleUser: (data,dispatch) => {
    if(data) {
      axios.post('/api/singleUser',{data:data})
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
  updateUser: (data, dispatch) => {
    if(data) {
      axios.put('/api/singleUser',{data:data})
      .then((response) => {
        if(response.data.success === true){
          getInit(dispatch);
          alert('更新成功');
        }
      })
    }
  },
  checkAuth: (dispatch, token) => {
    axios.post('/api/authenticate', {
      token: token,
    })
    .then((response) => {
      if(response.data.success === false) {
        dispatch(authError()); 
      } else {
        dispatch(authComplete());
      }
    })
    .catch(function (error) {
      dispatch(authError());
    });
  },
  getDataStore: (dispatch) => {
    getInit(dispatch);
  },
  getExam: (dispatch) => {
    axios.get('/api/exams',{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      params: {
        studId: localStorage.getItem('userId')
      }
      })
    .then((response) => {
      if(response.data) {
        //將檔案存入store
        //console.log(response.data.exam);
        var exam = JSON.parse(response.data.exam),
            answer = new Array(40).fill(0);
        localStorage.setItem('Exam', response.data.exam);
        localStorage.setItem('answer', answer);
        localStorage.setItem('examId', exam[0].examId);
        dispatch(getExam());
        dispatch(startExam());
        dispatch(workpage('examPage'));
        browserHistory.push('/examPage');
      }
    })
    .catch((error) => {
    });
  },
  score: (dispatch) => {
    var answer = localStorage.getItem('answer'),
        userId = localStorage.getItem('userId'),
        examId = localStorage.getItem('examId'),
        timerID = localStorage.getItem('timerID'),
        ansC = answer.split(',');
        
    clearInterval(timerID);
    axios.post('/api/score',{
      ansC: ansC,
      userId: userId,
      examId: examId
    }).then((response) => {
      console.log(response.data.score);
      dispatch(score(response.data.score));
      dispatch(finishData(response.data.wrong));
      browserHistory.push('/score'); 
    })
    .catch((error) => {
      console.log(error);
    })
  },
  getTrainTime: (dispatch,tId,eId) => {
    axios.get('/api/trainTime',{
      params: {
        tId: tId,
        eId: eId
      }
    }).then((response) => {
        dispatch(getTrainTime(JSON.parse(response.data.data)));
      })
  },
  getTeacherTime: (dispatch, row) => {
    // 取得學員對映期別所有可訓練時間
    axios.get('/api/trainTime',{
      params: {
        tId: row.teacher,
        eId: row.seasonType,
        sId: row.id
      }
    }).then((response) => {
        dispatch(getTrainTime(JSON.parse(response.data.data)));
        dispatch(changeFormState('update'));
        dispatch(setFormData(row));
        // 設定考期時間
        dispatch(changeClassType(row.classType.substr(-1) -1));
    })
  },
  deleteRow: (dispatch,rows) => {
    axios.delete('/api/user',{
      data: {rows: rows}
    }).then((response) => {
      getInit(dispatch);
      alert('刪除成功');
    })
  },
  delScore: () => {
    axios.delete('/api/score').then((response) => {
      alert('刪除成功');
    })
  }
};