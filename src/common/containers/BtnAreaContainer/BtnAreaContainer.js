import React from 'react';
import { connect } from 'react-redux';
import BtnArea from '../../components/BtnArea';
import WebAPI from '../../utils/WebAPI';

import {
  createQ,
  modal
} from '../../actions';

export default connect(
  (state) => ({
    //isAuthorized: state.getIn(['user', 'isAuthorized']),
    exam: state.getIn(['exam','exam']),
    answered: state.getIn(['exam', 'answer']),
    finishExam: state.getIn(['exam', 'finishExam']),
    focusBtn: state.getIn(['exam', 'questionID'])
  }),
  (dispatch) => ({
    onQuestion: (qID) => () => {
        dispatch(createQ({qID: qID}))
    },
    onScore: () => {
      //var timerID = localStorage.getItem('timerID');
      //clearInterval(timerID);
      //WebAPI.score(dispatch);
      dispatch(modal())
    },
    nextBtn: (focusBtn) => () => (
      dispatch(createQ({qID: focusBtn +1}))
    ),
    upBtn: (focusBtn) => () => (
      dispatch(createQ({qID: focusBtn -1}))
    )
  })
)(BtnArea);

