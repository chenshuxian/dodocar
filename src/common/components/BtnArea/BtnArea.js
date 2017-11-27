/*
  考題案鈕區
  點擊案鈕時，改變store 中qID
  改變題目區題庫
*/
import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

// 已回答按鈕
const AnsBtn = (props) => (
  <Button color='info' onClick={props.fn(props.index)}> {props.index} </Button>
);
// 尚未回答
const NoAnsBtn = (props) => (
  <Button onClick={props.fn(props.index)}> {props.index} </Button>
);
// 繳卷按鈕
const ScoreBtn = (props) => (
  <Button color="success" onClick={props.onScore}>送卷</Button>
);
// 目前答題
const FocusBtn = (props) => (
  <Button color='danger' onClick={props.fn(props.index)}> {props.index} </Button>
)

function checkBtn (ans, index, fn, focusBtn) {
  console.log('btn:' + ans[index-1]);
  if(focusBtn == index) {
    return <FocusBtn key={index} fn={fn} index={index} />
  } else {

    if(ans[index -1] !== '0')
      return <AnsBtn key={index} fn={fn} index={index} />
    else
      return <NoAnsBtn key={index} fn={fn} index={index} />
  }
  
}
  
const BtnArea = ({
  onQuestion,
  exam,
  answered,
  finishExam,
  onScore,
  focusBtn,
  nextBtn,
  upBtn
}) => (
    <Row className="text-center">
      <Col className="upBtn" >
      {
        focusBtn !== 1
        ?
          <Button onClick={upBtn(focusBtn)}>Up</Button>
        :
        ""
      }
      </Col>
      <div className="btnArea" > 
        {
          exam.map(function(v,index){
            var index = index + 1;
            if (index == 20)
              return <span key={index}>{checkBtn(answered, index, onQuestion, focusBtn)}<br/></span>
            else 
              return checkBtn(answered, index, onQuestion, focusBtn)
          })
        }
      </div>
      <Col className="nextBtn" > 
        {
           focusBtn !== 40
           ?
            <Button onClick={nextBtn(focusBtn)}>Next</Button>
           :
           ""
        }
        
        {
        finishExam 
        ?
          <ScoreBtn onScore={onScore} />
        :
        ""
      }
      </Col>
    </Row>
  );

  export default BtnArea;