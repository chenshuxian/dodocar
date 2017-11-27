import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import BtnAreaContainer from '../../containers/BtnAreaContainer';
import QuestionAreaContainer from '../../containers/QuestionAreaContainer';
import TimerContainer from '../../containers/TimerContainer';

const Student = (props) => (
    <Row>
      <Col xs="6">學號 : {props.stuNum}</Col>
      <Col className="text-right" xs="6"><TimerContainer /></Col>
    </Row>
);

const ExamPage = ({
  exam,
  examTotal,
  email
}) => (
  <section className='examPage' id='exam'>
    <Container>
      <Student stuNum={email} />
      {/* <Question examList={examList}/> */}
      <QuestionAreaContainer />
      <BtnAreaContainer  />
    </Container>
  </section>
);

export default ExamPage;