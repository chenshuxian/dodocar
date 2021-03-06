import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI';

import {
    CREATE_Q,
    ANSWER_Q,
    FINISH_EXAM,
    GET_EXAM,
    START_EXAM,
    SET_TIME,
    SCORE,
    MODAL,
    SET_MODALMSG,
    SET_MODALTIT,
    WORKPAGE,
    ADDEXAM,
    FINISHDATA,
    RESET_TIME,
    RESET_QID,
    RESTART_EXAM
} from '../constants/actionTypes';

export const createQ = createAction('CREATE_Q');
export const answerQ = createAction('ANSWER_Q');
export const finishExam = createAction('FINISH_EXAM');
export const getExam = createAction('GET_EXAM');
export const startExam = createAction('START_EXAM');
export const setTime = createAction('SET_TIME');
export const score = createAction('SCORE');
export const modal = createAction('MODAL');
export const setModalMsg = createAction('SET_MODALMSG');
export const setModalTit = createAction('SET_MODALTIT');
export const workpage = createAction('WORKPAGE');
export const addExam = createAction('ADDEXAM',WebAPI.addExam);
export const addSeason = createAction('ADDSEASON', WebAPI.addSeason);
export const finishData = createAction('FINISHDATA');
export const resetTime = createAction('RESET_TIME');
export const resetQId = createAction('RESET_QID');
export const restartExam = createAction('RESTART_EXAM');
