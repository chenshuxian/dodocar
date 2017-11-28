import react from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import uuid from 'uuid';
import { Alert } from 'reactstrap';
import EXAMTOTAL from '../constants/exam';

import { 
  authComplete,
  authError,
  hideSpinner,
  completeLogout,
  getExam,
  score,
  workpage
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

export default {
  login: (dispatch, userNum, password) => {
    //alert('login' + email);
    axios.post('/api/login', {
      userNum: userNum,
      exPwd: password
    })
    .then((response) => {
      if(response.data.success === false) {
        //dispatch(authError()); 
        //dispatch(hideSpinner());  
        //alert('登入錯誤請重新登入!!');
        window.location.reload();        
      } else {
        if (!document.cookie.token) {
          let d = new Date();
          d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
          const expires = 'expires=' + d.toUTCString();
          document.cookie = 'token=' + response.data.token + '; ' + expires;
          localStorage.setItem('userId',response.data.userId);
          dispatch(workpage('notice'));
          browserHistory.push('/notice');
          window.scroll(0,0);
        }
      }
    })
    .catch(function (error) {
      //dispatch(authError());
      alert(error);
    });
  },
  logout: (dispatch) => {
    document.cookie = 'token=; ' + 'expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    //dispatch(hideSpinner());  
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
  getExam: (dispatch) => {
    axios.get('/api/exams')
    .then((response) => {
      if(response.data) {
        //將檔案存入store
        console.log(response.data.exam);
        var exam = JSON.parse(response.data.exam),
            answer = new Array(40).fill(0);
        localStorage.setItem('Exam', response.data.exam);
        localStorage.setItem('answer', answer);
        localStorage.setItem('examId', exam[0].examId)
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
      browserHistory.push('/score'); 
    })
    .catch((error) => {
      console.log(error);
    })
  }
};