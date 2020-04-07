/*
  考題增加
*/
import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { TRAINTIME, COLOR, YN, LIC } from '../../../constants/exam';
import WebAPI from '../../../utils/WebAPI';



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
        this.props.getCarData();
        //this.props.onChangePage();
        //console.log('reander1');
    }
        
    render() {
        //console.log('render2');
        //console.log(this.teacher);
        const options = {
            onRowClick: this.props.onRowClick,
            //onSearchChange: this.props.onSearchChange, 
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
       
  
        return (
            <div>
            <BootstrapTable data={ data } version='4' selectRow={ selectRowProp } options={ options }
            striped hover condensed scrollTop={ 'Bottom' } search={true} multiColumnSearch pagination deleteRow>
                <TableHeaderColumn dataField='car_number'>車號</TableHeaderColumn>
                <TableHeaderColumn dataField='car_maker'>廠牌</TableHeaderColumn>
                <TableHeaderColumn dataField='engin_id'>引擎號</TableHeaderColumn>
                <TableHeaderColumn dataField='born_date'>出廠日期</TableHeaderColumn>
                <TableHeaderColumn dataField='cc'>排氣量</TableHeaderColumn>
                <TableHeaderColumn dataField='lic_status' dataFormat={ genderFn } formatExtraData={ LIC }
                filterFormatted filter={ { type: 'SelectFilter', options: LIC } }>牌照狀態</TableHeaderColumn>
                <TableHeaderColumn dataField='road_car' dataFormat={ genderFn } formatExtraData={ YN } 
                filterFormatted filter={ { type: 'SelectFilter', options: YN } }>道駕車</TableHeaderColumn>
                <TableHeaderColumn isKey dataField='id' dataFormat={ fnFormat }  width='60px ' hidden>功能</TableHeaderColumn>
            </BootstrapTable>
            </div>
        )
    }

}

export default DataGrid;