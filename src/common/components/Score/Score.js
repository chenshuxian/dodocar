import React from 'react';
import { Button , Form, FormGroup, Label, Input } from 'reactstrap';

const Fail = (props) => (
    <div>
        <h2> 您的成績: {props.score} </h2>
        <h1> 再接再勵 </h1>
    </div>
);

const Success = (props) => (
    <div>
        <h2> 您的成績: {props.score} </h2>
        <h1> 恭喜通過考試 </h1>
    </div>
);
      
const Score = ({
    score
}) => (
  <section className="examPage" id="score">
  <div className="container">
    <h2 className="text-center">成績</h2>
    <hr className="star-primary" />
    <div className="col-lg-8 mx-auto">
        {
            score > 85 ?
                <Success score={score} />
            :
                <Fail score={score}/>
        }
    </div>
  </div>
</section>
);

export default Score;