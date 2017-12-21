import React from 'react';
import AppBarContainer from '../../containers/AppBarContainer';
import FooterContainer from '../../containers/FooterContainer';
import Modal from '../../containers/ModalContainer';
import Login from '../../containers/LoginContainer';

const Main = (props) => (
  <div>
    <AppBarContainer />
    {props.children}
    <FooterContainer />
    <Modal />
    <Login />
  </div>
);

export default Main;