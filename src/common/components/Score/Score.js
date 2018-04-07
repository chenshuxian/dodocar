import React from 'react';
import { Button , Form, FormGroup, Label, Input } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

function strToArr(str) {
    var arr;
    if (str !== "") {
        arr = str.split(";");
    } else {
        arr = ['1.O','2.X'];
    }

    return arr;
}

function choiceList(str) {
    var arr = strToArr(str);
    return 
        `<div>
        <ul>
          ${arr.map((result, index) => {
            return `<li key={index}>{result}</li>`
          })}
        </ul>
       </div> `
    
}

const Fail = (props) => (
    <div>
        <h1> 您的成績: {props.score} , 再接再勵</h1>
    </div>
);

const Success = (props) => (
    <div>
        <h1> 您的成績: {props.score} , 恭喜通過考試 </h1>
    </div>
);

const imgFn = (cell, row) => {
    return `<img src=${cell} width='130px' />`
}

const questionFn = (cell, row) => {
    //let choice = choiceList(row.choice);
    return `<div> ${cell} </div> ${row.choice}`
}

const options = {
    sizePerPage: 5,  // which size per page you want to locate as default
    pageStartIndex: 0, // where to start counting the pages
}
      
const Score = ({
    score,
    data
}) => (
  <section className="examPage" id="score">
  <div className="container">
    <div className="col-lg-8 mx-auto" style={{textAlign: 'center'}}>
        {
            score > 85 ?
                <Success score={score} />
            :
                <Fail score={score}/>
        }
    </div>
    <BootstrapTable data={ data } version='4' striped hover condensed scrollTop={ 'Bottom' } >
                <TableHeaderColumn isKey dataField='id' hidden>題號</TableHeaderColumn>
                <TableHeaderColumn dataField='img' dataFormat={imgFn} width="20%">圖片</TableHeaderColumn>
                <TableHeaderColumn dataField='q' dataFormat={questionFn} width="60%" tdStyle={ { whiteSpace: 'normal' } }>題目</TableHeaderColumn>
                <TableHeaderColumn dataField='ansC'>考生答案</TableHeaderColumn>
                <TableHeaderColumn dataField='ans'>標準答案</TableHeaderColumn>
    </BootstrapTable>
  </div>
</section>
);

export default Score;