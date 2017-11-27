import React from 'react';
import { connect } from 'react-redux';
import Timer from '../../components/Timer';
import WebAPI from '../../utils/WebAPI';

import { 
    setTime
   } from '../../actions';

export default connect(
  (state) => ({
    time: state.getIn(['exam','time'])
  }),
  (dispatch) => ({
      countTime: (timeId) => {
          dispatch(setTime({timeId: timeId}))
      },
      onScore: () => {
        WebAPI.score(dispatch);
      }
  })
)(Timer);