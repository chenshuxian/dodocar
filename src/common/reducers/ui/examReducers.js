import { handleActions } from 'redux-actions';
import { ExamState } from '../../constants/models';

import {
    CREATE_Q,
    GET_EXAM,
    SET_TIME,
    ANSWER_Q,
    MODAL,
    SET_MODALMSG,
    SET_MODALTIT
} from '../../constants/actionTypes';

const examReducers = handleActions({
  CREATE_Q: (state, { payload }) => (
    state.set('questionID', payload.qID)
  ),
  GET_EXAM: (state) => {
    let exam = JSON.parse(localStorage.Exam);
    return state.set('exam', exam) 
  },
  START_EXAM: (state) => {
    let exam = JSON.parse(localStorage.Exam),
        len = exam.length,
        answer = new Array(len).fill('0');
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
}, ExamState);

export default examReducers;