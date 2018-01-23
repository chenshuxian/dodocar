import React from 'react';
import { connect } from 'react-redux';
import Score from '../../components/Score';

export default connect(
  (state) => ({
    score: state.getIn(['exam','score']),
    data: state.getIn(['exam','finishData'])
  }),
  (dispatch) => ({

  })
)(Score);