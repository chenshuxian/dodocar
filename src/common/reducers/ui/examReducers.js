import { handleActions } from 'redux-actions';
import { ExamState } from '../../constants/models';
import { EXAMTOTAL } from '../../constants/exam';

import {
    CREATE_Q,
    GET_EXAM,
    SET_TIME,
    ANSWER_Q,
    MODAL,
    SET_MODALMSG,
    SET_MODALTIT,
    START_EXAM,
    FINISHDATA,
    RESET_TIME,
    RESET_QID,
    RESTART_EXAM
} from '../../constants/actionTypes';

const examReducers = handleActions({
  CREATE_Q: (state, { payload }) => (
    state.set('questionID', payload.qID)
  ),
  GET_EXAM: (state) => {
    let exam = '';
    if(localStorage.Exam){
      exam = JSON.parse(localStorage.Exam);
    }
    return state.set('exam', exam) 
  },
  START_EXAM: (state) => {
    var answer = new Array(EXAMTOTAL).fill('0');
    return state.set('answer', answer)
  },
  SET_TIME: (state, { payload }) => {
    if(state.get('time') == 1){
      clearInterval(payload.timeId);
    }
    return state.set('time', state.get('time')-1)
  },
  ANSWER_Q: (state, { payload }) => {
    console.log(payload);
    return state.set('answer',payload)
  },
  FINISH_EXAM: (state) => {
    return state.set('finishExam', true);
  },
  RESTART_EXAM: (state) => (
    state.set('finishExam', false)
  ),
  SCORE: (state, {payload}) => (
    state.set('score', payload)
  ),
  MODAL: (state) => (
    state.set('modal', !state.get('modal'))
  ),
  SET_MODALMSG: (state, { payload }) => (
    state.set('modalMsg', payload)
  ),
  SET_MODALTIT: (state, { payload }) => (
    state.set('modalTitle', payload)
  ),
  FINISHDATA: (state, { payload }) => (
    state.set('finishData' , payload)
  ),
  RESET_TIME: (state) => (
    state.set('time', 1800)
  ),
  RESET_QID: (state) => (
    state.set('questionID', 1)
  )
}, ExamState);

export default examReducers;