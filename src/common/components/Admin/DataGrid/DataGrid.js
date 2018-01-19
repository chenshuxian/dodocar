/*
  考題增加
*/
import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {TRIANTIME} from '../../../constants/exam';

const classType  = {
    'ED001': '第一期',
    'ED002': '第二期'
};

const genderType = {
    '1': '男',
    '2': '女'
};

const teacher = {
    'T001': 'eric',
    'T002': 'jacky'
};

const PT = TRIANTIME;

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
        const options = {
            onRowClick: this.props.onRowClick,
            onSearchChange: this.props.onSearchChange, 
            clearSearch: true 
        };
        const selectRowProp = {
            mode: 'checkbox',
            bgColor: 'pink',
            selected: [this.props.selected],
            clickToSelect: true  // enable click to select
        };
        return (
            <BootstrapTable data={ this.props.columns } version='4' selectRow={ selectRowProp } options={ options }
            striped hover condensed height='300' scrollTop={ 'Bottom' } search multiColumnSearch >
                <TableHeaderColumn isKey dataField='id'>身份證字號</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>姓名</TableHeaderColumn>
                <TableHeaderColumn dataField='gender' dataFormat={ genderFn } formatExtraData={ genderType }
                filterFormatted >性別</TableHeaderColumn>
                <TableHeaderColumn dataField='classType' dataFormat={ genderFn } formatExtraData={ classType }
                filterFormatted filter={ { type: 'SelectFilter', options: classType } }>期別</TableHeaderColumn>
                <TableHeaderColumn dataField='teacher' dataFormat={ genderFn } formatExtraData={ teacher }
                filterFormatted filter={ { type: 'SelectFilter', options: teacher } }>教練</TableHeaderColumn>
                <TableHeaderColumn dataField='trainTimeId' dataFormat={ genderFn } formatExtraData={ PT } 
                filterFormatted filter={ { type: 'SelectFilter', options: PT } }>練習時間</TableHeaderColumn>
            </BootstrapTable>
        )
    }

}
  
// const DataGrid = ({
//     getDataStore,
//     columns
// }) => (
//     <BootstrapTable data={columns} version='4' selectRow={ selectRowProp } insertRow={ true }>
//         <TableHeaderColumn isKey dataField='id'>身份證字號</TableHeaderColumn>
//         <TableHeaderColumn dataField='name'>姓名</TableHeaderColumn>
//         <TableHeaderColumn dataField='gender' dataFormat={ genderFn } formatExtraData={ genderType }>性別</TableHeaderColumn>
//     </BootstrapTable>
// );

export default DataGrid;