import React from 'react';
import { connect } from 'react-redux';
import QuestionArea from '../../components/QuestionArea';

import { 
  answerQ,
  createQ,
  finishExam
 } from '../../actions';

export default connect(
  (state) => ({
    qID: state.getIn(['exam','questionID']),
    exam: state.getIn(['exam','exam']),
    answer: state.getIn(['exam','answer'])
  }),
  (dispatch) => ({
    // 答案記錄fn 
    // qID 題號
    // choiceNum 選擇答案
    // 每次答題時的動作，會自動切到下一題及確認是否全部答題完成
    // 若 isFinish 為 -1，代表全部答題完成，顯示繳卷鈕
    answerFn: (qID, choiceNum) => () => {
      var ans = localStorage.getItem('answer'),
          ansArr = ans.split(','),
          len = ansArr.length;
      ansArr[qID] = choiceNum;
      var isFinish = ansArr.indexOf('0');
      localStorage.setItem('answer', ansArr);
      dispatch(answerQ(ansArr));
      // 作答完後自動切換下題答題
      if(qID != len -1){
        dispatch(createQ({qID: qID+2}))
      }
      // 如果完成全部的作答就顯示繳卷按鈕
      if (isFinish == -1) {
        dispatch(finishExam());
      } 
      //dispatch(answerQ({index,value}))
    }
  })
)(QuestionArea);