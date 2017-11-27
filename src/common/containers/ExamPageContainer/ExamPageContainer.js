import React from 'react';
import { connect } from 'react-redux';
import ExamPage from '../../components/ExamPage';

import { 
    createQ
} from '../../actions';

export default connect(
  (state) => ({
    email: state.getIn(['user','userNum'])
  }),
  (dispatch) => ({
    
  })
)(ExamPage);