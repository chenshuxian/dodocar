import React from 'react';
import { connect } from 'react-redux';
import NoticePage from '../../components/NoticePage';
import { browserHistory } from 'react-router';
import WebAPI from '../../utils/WebAPI';

import { 
 buttonUseful,
 getExam,
 startExam,
 workpage
} from '../../actions';

export default connect(
  (state) => ({
    isEdit: state.getIn(['ui','isEdit']),
  }),
  (dispatch) => ({
    onBtnUse: (event) => {
      let checked = event.target.checked;
      dispatch(buttonUseful({key: checked}));
    },
    goExam: (event) => {
      //dispatch(getExam(dispatch));
      WebAPI.getExam(dispatch);
    }
  })
)(NoticePage);