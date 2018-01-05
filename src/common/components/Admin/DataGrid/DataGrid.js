/*
  考題增加
*/
import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const genderType = {
    1: 'boy',
    2: 'girl'
};

const selectRowProp = {
    mode: 'checkbox',
    bgColor: 'pink',
    clickToSelect: true  // enable click to select
};

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
        return (
            <BootstrapTable data={ this.props.columns } version='4' selectRow={ selectRowProp } insertRow={ true }>
                <TableHeaderColumn isKey dataField='id'>身份證字號</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>姓名</TableHeaderColumn>
                <TableHeaderColumn dataField='gender' dataFormat={ genderFn } formatExtraData={ genderType }>性別</TableHeaderColumn>
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