import React from 'react';
import { connect } from 'react-redux';
import Modal from '../../components/Modal';
import WebAPI from '../../utils/WebAPI';

import { 
    modal,
    onS
} from '../../actions';

export default connect(
  (state) => ({
    isOpen: state.getIn(['exam','modal']),
    modalMsg: state.getIn(['exam','modalMsg']),
    modalTitle: state.getIn(['exam','modalTitle'])
  }),
  (dispatch) => ({
    onModal: () => (
      dispatch(modal())
    ),
    onSubmit: () => {
      dispatch(modal())
      WebAPI.score(dispatch);
    }
  })
)(Modal);