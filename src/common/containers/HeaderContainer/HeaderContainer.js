import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';

import {
  startLogout,
  setRecipe,
  setUi,
} from '../../actions';

export default connect(
  (state) => ({
    //isAuthorized: state.getIn(['user', 'isAuthorized']),
  }),
  (dispatch) => ({
    onToShare: () => {
      //dispatch(setRecipe({ key: 'recipeId', value: '' }));
      //dispatch(setUi({ key: 'isEdit', value: false }));
      //window.location.reload();        
      //browserHistory.push('/share'); 
    },
    onLogout: () => (
      dispatch(startLogout(dispatch))
    ),
  })
)(Header);
