/*
  考題增加
*/
import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { TRAINTIME } from '../../../constants/exam';
import WebAPI from '../../../utils/WebAPI';

const genderType = {
    '1': '男',
    '2': '女'
};

const teacher = {
    'W100097559': '薛朝元',
    'W100389785': '吳子祺',
    'W100152304': '何清寬',
    'W100168900': '陳清江',
    'H122085541': '吳國良',
    'F125784192': '洪詩評'
};

const PT = TRAINTIME;

function genderFn(cell, row, enumObject) {
    return enumObject[cell];
}

function dgData() {
    return JSON.parse(localStorage.getItem('dataStore'));
}


function fnFormat(cell, row, extraData) {
    //console.log(extraData);
    return (<FuncArea test={test(cell)}/>);
}

var test= (v) => () => {
    WebAPI.delScore(v);
};


function FuncArea(props) {
    return (
        //<span className="glyphicon glyphicon-search" onClick={props.test}></span>
        <span onClick={props.test}><i className="material-icons">autorenew</i></span>
    )
}

class DataGrid extends React.Component {

    componentDidMount() {
        this.props.getUserData();
        this.props.onChangePage();
        //console.log('reander1');
    }
        
    render() {
        //console.log('render2');
        //console.log(this.teacher);
        const options = {
            onRowClick: this.props.onRowClick,
            onSearchChange: this.props.onSearchChange, 
            onDeleteRow: this.props.onDeleteRow,
            clearSearch: true 
        };
        const selectRowProp = {
            mode: 'checkbox',
            bgColor: 'pink'
            //selected: [this.props.selected],
            //clickToSelect: true  // enable click to select
        };
        const data = this.props.columns;
        //const seasonType =  this.props.seasonType.map((x) => x.name);
        // const seasonType = {} ;
        // const obj = this.props.seasonType;
        // obj.forEach((e) => {
        //     console.log(`${e.name} ${e.id}`); // "a 5", "b 7", "c 9"
        //     seasonType[e.id] = e.name;
        // });
        // console.log(`seasonType:${seasonType}`);
  
        return (
            <div>
            <BootstrapTable data={ data } version='4' selectRow={ selectRowProp } options={ options }
            striped hover condensed scrollTop={ 'Bottom' } search multiColumnSearch pagination deleteRow>
                <TableHeaderColumn isKey dataField='id'>身份證字號</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>姓名</TableHeaderColumn>
                <TableHeaderColumn width="46"dataField='gender' dataFormat={ genderFn } formatExtraData={ genderType }
                filterFormatted >性別</TableHeaderColumn>
                <TableHeaderColumn dataField='seasonType'>期別</TableHeaderColumn>
                <TableHeaderColumn dataField='teacherId' dataFormat={ genderFn } formatExtraData={ teacher }
                filterFormatted filter={ { type: 'SelectFilter', options: teacher } }>教練</TableHeaderColumn>
                <TableHeaderColumn dataField='trainTimeId' dataFormat={ genderFn } formatExtraData={ PT } 
                filterFormatted filter={ { type: 'SelectFilter', options: PT } }>練習時間</TableHeaderColumn>
                <TableHeaderColumn dataField='id' dataFormat={ fnFormat }  width='60px'>功能</TableHeaderColumn>
            </BootstrapTable>
            </div>
        )
    }

}

export default DataGrid;