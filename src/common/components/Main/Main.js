import React from 'react';
import AppBarContainer from '../../containers/AppBarContainer';
import FooterContainer from '../../containers/FooterContainer';
import Modal from '../../containers/ModalContainer';

const Main = (props) => (
  <div>
    <AppBarContainer />
    {props.children}
    <FooterContainer />
    <Modal />
  </div>
);

export default Main;