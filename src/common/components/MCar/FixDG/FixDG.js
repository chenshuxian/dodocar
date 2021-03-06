/*
  考題增加
*/
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import { TRAINTIME, COLOR, YN, LIC } from '../../../constants/exam';
// import WebAPI from '../../../utils/WebAPI';

// const PT = TRAINTIME;

// function genderFn(cell, row, enumObject) {
//   return enumObject[cell];
// }

// function dgData() {
//   return JSON.parse(localStorage.getItem('dataStore'));
// }

// function fnFormat(cell, row, extraData) {
//   //console.log(extraData);
//   return <FuncArea test={test(cell)} />;
// }

// var test = (v) => () => {
//   WebAPI.delScore(v);
// };

// function FuncArea(props) {
//   return (
//     //<span className="glyphicon glyphicon-search" onClick={props.test}></span>
//     <span onClick={props.test}>
//       <i className='material-icons'>autorenew</i>
//     </span>
//   );
// }

class FixDG extends React.Component {
  componentDidMount() {
    //this.props.getCarData();
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
      clearSearch: true,
    };
    const selectRowProp = {
      mode: 'checkbox',
      bgColor: 'pink',
      //selected: [this.props.selected],
      //clickToSelect: true  // enable click to select
    };
    const data = this.props.columns;

    return (
      <div>
        <BootstrapTable
          data={data || []}
          version='4'
          selectRow={selectRowProp}
          options={options}
          striped
          hover
          condensed
          scrollTop={'Bottom'}
          search={true}
          multiColumnSearch
          pagination
          deleteRow
        >
          <TableHeaderColumn dataField='device'>零件名稱</TableHeaderColumn>
          <TableHeaderColumn dataField='num'>數量</TableHeaderColumn>
          <TableHeaderColumn dataField='price'>單價</TableHeaderColumn>
          <TableHeaderColumn dataField='salary'>工資</TableHeaderColumn>
          <TableHeaderColumn dataField='totalPrice'>小計</TableHeaderColumn>
          <TableHeaderColumn isKey dataField='id' width='60px ' hidden>
            功能
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default FixDG;
