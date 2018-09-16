import React from 'react';
import HeaderContainer from '../../containers/HeaderContainer';
import AboutContainer from '../../containers/AboutContainer';
import ExamContainer from '../../containers/ExamContainer';
import ContactContainer from '../../containers/ContactContainer';
import FooterContainer from '../../containers/FooterContainer';

const HomePage = ({
  recipes
}) => (
  <div>        
    <HeaderContainer />
    <ExamContainer />
    {/* <AboutContainer /> */}
    <ContactContainer />
  </div>
);

export default HomePage;