/*
  時間計算
  時間結束結算成績
  使用者按完成考試時，結算成績
  /api/finishExam
*/
import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

class Timer extends React.Component {
    constructor(props) {
      super(props);
      this.time = props.time;
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.props.countTime(this.timerID),
        1000
      );
      localStorage.setItem('timerID', this.timerID);
    }
  
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    timeEx(time) {
        let min = Math.floor(time / 60),
            sec = time % 60
        return min + " : " + sec;
    }

    render() {
        let time = this.props.time;
        this.time = this.timeEx(time);
        console.log('time:' + time);
        if(time == 0) {
          console.log('2time:' + time);
          this.props.onScore();
        }

      return (
        <div>
          <p>時間: {this.time}</p>
        </div>
      );
    }
  }
export default Timer;