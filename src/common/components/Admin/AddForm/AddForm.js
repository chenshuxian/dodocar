/*
  考題增加
*/
import React from 'react';
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
//import 'node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Container, Form, FormGroup, Label, Input, FormText, Button,
          Row, Col } from 'reactstrap';
import DataGridContainer from '../../../containers/Admin/DataGridContainer';
var styles = {
    color:'red',
    width: '100px'
};


function Field(props) {
    return (
    <Row>
    <Label>{props.label}</Label>
    <Col>
    <Input type={props.type == "" ? text : props.type} name={props.name} style={props.styles} value={props.value} />
    </Col>
    </Row>
    );
}

function FieldSelect(props) {
    return (
    <Row>
    <Label>{props.label}</Label>
    <Col>
    <Input type="select" name={props.name} onChange={props.changeFn ? props.changeFn : ''} style={props.styles}>
        {props.options.map(function(name, i) {
            return (<option key={i} value={props.options[i].id}>{props.options[i].name}</option>);
        })}
    </Input>
    </Col>
    </Row>
    );
}
  
const AddForm = ({
    addUser,
    today,
    teacherTime,
    teachers,
    trainTime,
    submit,
    gender,
    source,
    carType,
    handleSubmit,
    teacherFn,
    classTypeFn,
    classType,
    classTypeIndex,
    teacherIndex,
    season
}) => (
<section className='examPage' id='exam'>
  <Container>
      <Row className='toolbar'>
        <Col xs={6} md={3}><Button color="success" onClick={addUser}>新增學員資料</Button></Col>
        <Col xs={6} md={3}><Button color="warning" onClick={addUser}>修改學員資料</Button></Col>
        <Col xs={6} md={3}><Button color="danger" onClick={addUser}>教練資料管理</Button></Col>
        <Col xs={6} md={3}><Button color="primary" onClick={addUser}>匯出檔案</Button></Col>
      </Row>
      <Row className='formCenter'>
            <Form id="adduser" onSubmit={handleSubmit}>
                <FormGroup row>
                    <FieldSelect label="訓練班別:" name="classType" options={classType} changeFn={classTypeFn(teachers[teacherIndex] ? teachers[teacherIndex].id : '' )} />
                    <Field label="期別:" name="season" value={classType[classTypeIndex] ? classType[classTypeIndex].season : ""}/>
                    <Field label="開訓日期:" name="startDate" value={classType[classTypeIndex] ? classType[classTypeIndex].startDate : ""} />
                    <Field label="結訓日期:" name="finishDate" value={classType[classTypeIndex] ? classType[classTypeIndex].finishDate : ""} />
                    <Field label="考試日期:" name="examDate" value={classType[classTypeIndex] ? classType[classTypeIndex].examDate : ""} />
                </FormGroup>
                <FormGroup row>
                    <Field label="學號:" name="stuNum" />
                    <Field label="密碼:" name="passwd" />
                    <Field label="姓名:" name="name" />
                    <FieldSelect label="性別:" name="gender" options={gender} />
                    <Field label="出生年月日:" type="date" name="born" styles={{width:'160px'}}/>
                </FormGroup>
                <FormGroup row>
                    <Field label="身份證:" name="id" styles={{width:'120px'}}/>
                    <Field label="郵地區號:" name="addrNum" />
                    <Field label="地址:" name="addr" styles={{width:'495px'}}/>
                </FormGroup>
                <FormGroup row>
                    <Field label="行動電話:" name="tel" />
                    <Field label="住家電話:" name="mobile" />
                    <FieldSelect label="來源:" name="source" options={source} />
                    <FieldSelect label="教練姓名:" name="teacher" options={teachers} changeFn={teacherFn(classType[classTypeIndex] ? classType[classTypeIndex].id : '' )}/>
                    <FieldSelect label="選訓時間:" name="trainBook" options={trainTime} styles={{width:'120px'}} />
                </FormGroup>
                <FormGroup row>
                    <FieldSelect label="手、自排:" name="carType" options={carType} />      
                    <Field label="訓練:" name="trainScore" />
                    <Field label="筆試:" name="examScore" />
                    <Field label="路試:" name="roadScore" />
                </FormGroup>
                <FormGroup row>
                    <Field label="備註:" type="textarea" name="memo" styles={{width:'450px'}}/>
                    <input type="submit" value="新增"/>
                </FormGroup>
            </Form>
      </Row>
      <Row className='dataGrid'>
        <DataGridContainer />
      </Row>
  </Container>
  </section>
);

export default AddForm;