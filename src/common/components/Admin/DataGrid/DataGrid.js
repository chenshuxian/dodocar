/*
  考題增加
*/
import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { TRAINTIME } from '../../../constants/exam';

const classType  = {
    'ED10701': '第1期',
    'ED10702': '第2期',
    'ED10703': '第3期',
    'ED10704': '第4期',
    'ED10705': '第5期',
    'ED10706': '第6期',
    'ED10707': '第7期',
    'ED10708': '第8期',
    'ED10709': '第9期',
    'ED10710': '第10期',
    'ED10711': '第11期',
    'ED10712': '第12期',
    'ED10713': '第13期',
    'ED10714': '第14期',
    'ED10715': '第15期',
    'ED10716': '第16期',
    'ED10717': '第17期',
    'ED10718': '第18期',
    'ED10719': '第19期',
    'ED10720': '第20期'
};

const genderType = {
    '1': '男',
    '2': '女'
};

const teacher = {
    'T001': 'eric',
    'T002': 'jacky'
};

const PT = TRAINTIME;

function genderFn(cell, row, enumObject) {
    return enumObject[cell];
}

function dgData() {
    return JSON.parse(localStorage.getItem('dataStore'));
}


class DataGrid extends React.Component {

    componentDidMount() {
        this.props.getUserData();
    }
        
    render() {
        console.log('render2');
        const options = {
            onRowClick: this.props.onRowClick,
            onSearchChange: this.props.onSearchChange, 
            onDeleteRow: this.props.onDeleteRow,
            onExportToCSV: this.props.onExportToCSV,
            clearSearch: true 
        };
        const selectRowProp = {
            mode: 'checkbox',
            bgColor: 'pink'
            //selected: [this.props.selected],
            //clickToSelect: true  // enable click to select
        };
        const data = this.props.columns;
        const seasonType =  this.props.seasonType.map((x) => x.name);
  
        return (
            <div>
            <BootstrapTable data={ data } version='4' selectRow={ selectRowProp } options={ options }
            striped hover condensed scrollTop={ 'Bottom' } search multiColumnSearch pagination deleteRow exportCSV>
                <TableHeaderColumn isKey dataField='id'>身份證字號</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>姓名</TableHeaderColumn>
                <TableHeaderColumn width="46"dataField='gender' dataFormat={ genderFn } formatExtraData={ genderType }
                filterFormatted >性別</TableHeaderColumn>
                <TableHeaderColumn dataField='seasonType' filter={ { type: 'SelectFilter', options:seasonType} }>期別</TableHeaderColumn>
                <TableHeaderColumn dataField='teacher' dataFormat={ genderFn } formatExtraData={ teacher }
                filterFormatted filter={ { type: 'SelectFilter', options: teacher } }>教練</TableHeaderColumn>
                <TableHeaderColumn dataField='trainTimeId' dataFormat={ genderFn } formatExtraData={ PT } 
                filterFormatted filter={ { type: 'SelectFilter', options: PT } }>練習時間</TableHeaderColumn>
            </BootstrapTable>
            </div>
        )
    }

}

export default DataGrid;