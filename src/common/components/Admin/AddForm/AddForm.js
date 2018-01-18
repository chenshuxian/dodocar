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
    //console.log(props.value);
    return (
    <Row>
    <Label>{props.label}</Label>
    <Col>
    <Input type={
        props.type == "" ? text : props.type} name={props.name} 
        style={props.styles} 
        value={props.value ? props.value[props.name] : ''}
        onChange={props.chFn}
        disabled = {props.disabled}
        />
    </Col>
    </Row>
    );
}

function FieldSelect(props) {
    return (
    <Row>
    <Label>{props.label}</Label>
    <Col>
    <Input type="select" name={props.name} onChange={props.chFn ? props.chFn : ''} style={props.styles} 
        value={props.value ? props.value[props.name] : ''}>
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
    handleUpdate,
    teacherFn,
    classTypeFn,
    classType,
    classTypeIndex,
    teacherIndex,
    formData,
    fieldChangeFn,
    changeState,
    season,
    formState
}) => (
<section className='examPage' id='exam'>
  <Container>
      <Row className='toolbar'>
        <Col xs={6} md={3}><Button color="success" onClick={changeState}>新增學員資料</Button></Col>
        {/* <Col xs={6} md={3}><Button color="danger" onClick={addUser}>教練資料管理</Button></Col>
        <Col xs={6} md={3}><Button color="primary" onClick={addUser}>匯出檔案</Button></Col> */}
      </Row>
      <Row className='formCenter'>
            <Form id="adduser">
                <FormGroup row>
                    <FieldSelect label="訓練班別:" name="classType"  options={classType} chFn={classTypeFn(teachers[teacherIndex] ? teachers[teacherIndex].id : '' )} 
                    value={formData}
                    />
                    <Field label="期別:" name="season" value={classType[classTypeIndex]} disabled="true"/>
                    <Field label="開訓日期:" name="startDate" value={classType[classTypeIndex]} disabled="true"/>
                    <Field label="結訓日期:" name="finishDate" value={classType[classTypeIndex]} disabled="true"/>
                    <Field label="考試日期:" name="examDate" value={classType[classTypeIndex]} disabled="true"/>
                </FormGroup>
                <FormGroup row>
                    <Field label="學號:" name="stuNum" value={formData} chFn={fieldChangeFn}/>
                    <Field label="密碼:" name="passwd" value={formData} chFn={fieldChangeFn}/>
                    <Field label="姓名:" name="name" value={formData} chFn={fieldChangeFn}/>
                    <FieldSelect label="性別:" name="gender" options={gender} value={formData} chFn={fieldChangeFn}/>
                    <Field label="出生年月日:" type="date" name="born" styles={{width:'160px'}} value={formData} chFn={fieldChangeFn}/>
                </FormGroup>
                <FormGroup row>
                    <Field label="身份證:" name="id" styles={{width:'120px'}} value={formData} chFn={fieldChangeFn} 
                        disabled = {formState == "update" ? true : false}/>
                    <Field label="郵地區號:" name="addrNum" value={formData} chFn={fieldChangeFn}/>
                    <Field label="地址:" name="addr" styles={{width:'495px'}} value={formData} chFn={fieldChangeFn}/>
                </FormGroup>
                <FormGroup row>
                    <Field label="行動電話:" name="tel" value={formData} chFn={fieldChangeFn}/>
                    <Field label="住家電話:" name="mobile" value={formData} chFn={fieldChangeFn}/>
                    <FieldSelect label="來源:" name="source" options={source} value={formData} chFn={fieldChangeFn}/>
                    <FieldSelect label="教練姓名:" name="teacher" options={teachers} chFn={teacherFn(classType[classTypeIndex] ? classType[classTypeIndex].id : '' )} 
                    value={formData}/>
                    <FieldSelect label="選訓時間:" name="trainBook" options={trainTime} styles={{width:'120px'}} value={formData}/>
                </FormGroup>
                <FormGroup row>
                    <FieldSelect label="手、自排:" name="carType" options={carType} value={formData} chFn={fieldChangeFn}/>      
                    <Field label="訓練:" name="trainScore" value={formData} chFn={fieldChangeFn}/>
                    <Field label="筆試:" name="examScore" value={formData} chFn={fieldChangeFn}/>
                    <Field label="路試:" name="roadScore" value={formData} chFn={fieldChangeFn}/>
                </FormGroup>
                <FormGroup row>
                    <Field label="備註:" type="textarea" name="memo" styles={{width:'450px'}} value={formData} chFn={fieldChangeFn}/>
                    {formState == "insert"
                    ? 
                        <Button color="success" onClick={handleSubmit}>新增</Button>
                    :
                        <Button color="warning" onClick={handleUpdate}>更新</Button>
                    }
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