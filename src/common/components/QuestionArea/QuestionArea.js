/*
  問題顯示區塊
  if 初始時取得題庫第一題
  else 依使用者點擊題目取得對映之題庫題目
*/
import React from 'react';
import { Container, Row, Col, Button, Media } from 'reactstrap';

function strToArr(str) {
    var arr;
    if (str !== "") {
        arr = str.split("。");
    } else {
        arr = ['1.O','2.X'];
    }

    return arr;
}

function ansBtn(str, qID, fn, ans) {
    var arr = strToArr(str);
    return (
    <span className='btnChoice'>
        <h3> 答題區: </h3>
        {arr.map((result, index) => {
            //console.log(ans[qID-1] + "=" + result);
            if (ans[qID-1] == result.substr(0,1))
            return (<Button color='success' key={index} onClick={fn(qID-1,index+1)}>{index+1}</Button>);
        else 
            return (<Button key={index} onClick={fn(qID-1,index+1)}>{index+1}</Button>);
        })}
    </span> 
    );  
}

function choiceList(str, qID, fn, ans) {
    var arr = strToArr(str);
    return (
        <div>
        <ul>
          {arr.map((result, index) => {
            return (<li key={index}>{result}</li>);
          })}
        </ul>
       </div> 
    );
}

const HaveImg = (props) => (
    <Media left href="#">
        <Media object src={props.src} alt="Generic placeholder image" />
    </Media>
);

const  QuestionArea = ({
qID,
exam,
answerFn,
answer
}) => (
    <div>
        <Media>
            {
                exam[qID -1].img !== '' 
                ?
                    <HaveImg src = {exam[qID-1].img} />
                :
                    ""
            }
            <Media body>
                <Media heading>
                    {exam[qID-1].question}
                </Media>
                {choiceList(exam[qID-1].choice,qID,answerFn,answer)}
            </Media>
        </Media>
        <div className="ansBtn">
            {ansBtn(exam[qID-1].choice,qID,answerFn,answer)}
        </div>
    </div>
);

export default QuestionArea;