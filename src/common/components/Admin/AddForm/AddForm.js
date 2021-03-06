/*
  考題增加
*/
import React from 'react';
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
        readOnly = {props.readonly}
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

function FieldSelectSeason(props) {
    return (
    <Row>
    <Label>{props.label}</Label>
    <Col>
    <Input type="select" name={props.name} onChange={props.chFn ? props.chFn : ''} style={props.styles} 
        value={props.value ? props.value[props.name] : ''}>
        {props.options.map(function(name, i) {
            return (<option key={i} value={props.options[i].name}>{props.options[i].name}</option>);
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
    yearType,
    classTypeIndex,
    teacherIndex,
    formData,
    fieldChangeFn,
    newAdd,
    season,
    year,
    seasonId,
    formState,
    seasonType,
    delScore,
    csv,
    csvDownload,
    seasonTypeFn
}) => (
<section className='examPage' id='exam'>
  <Container>
      <Row className='toolbar'>
        <Col xs={3} md={3}><Button color="success" className="glyphicon glyphicon-user" onClick={newAdd}>新增學員資料</Button></Col>
        <Col xs={3} md={3}><Button color="danger" className="glyphicon glyphicon-user" onClick={delScore}>刪除測試帳號成績</Button></Col>
        <Col xs={3} md={3}><Button color="warning" className="glyphicon glyphicon-user" onClick={csv(seasonId)}>建立CSV档</Button></Col>
        <Col xs={3} md={3}><Button color="info" className="glyphicon glyphicon-user" onClick={csvDownload(seasonId)}>CSV档案下载</Button></Col>
      </Row>
      <Row>
      <Col className='formCenter'>
            <Form id="adduser">
                <FormGroup row>
                    <FieldSelect label="訓練班別:" name="classType"  options={classType} chFn={fieldChangeFn} value={formData} />
                    <FieldSelect label="訓練年度:" name="yearType"  options={year} chFn={seasonTypeFn} value={formData} />
                    <FieldSelectSeason label="訓練期別:" name="seasonType"  options={seasonType} chFn={classTypeFn(teachers[teacherIndex] ? teachers[teacherIndex].id : '' )} 
                    value={formData}/>
                </FormGroup>
                <FormGroup row>
                    <Field label="開訓日期:" name="startDate" value={seasonType[classTypeIndex]} readonly="true"/>
                    <Field label="結訓日期:" name="finishDate" value={seasonType[classTypeIndex]} readonly="true"/>
                    <Field label="考試日期:" name="examDate" value={seasonType[classTypeIndex]} readonly="true"/>
                </FormGroup>
                <FormGroup row>
                    <Field label="學號:" name="stuNum" value={formData} chFn={fieldChangeFn}/>
                    <Field label="密碼:" name="passwd" value={formData} chFn={fieldChangeFn}/>
                    <Field label="姓名:" name="name" value={formData} chFn={fieldChangeFn}/>
                </FormGroup>
                <FormGroup row>
                    <FieldSelect label="性別:" name="gender" options={gender} value={formData} chFn={fieldChangeFn}/>
                    <Field label="出生年月日:" type="date" name="born" styles={{width:'160px'}} value={formData} chFn={fieldChangeFn}/>
                </FormGroup>
                <FormGroup row>
                    <Field label="身份證:" name="id" styles={{width:'120px'}} value={formData} chFn={fieldChangeFn} />
                    <Field label="郵地區號:" name="addrNum" value={formData} chFn={fieldChangeFn}/>
                </FormGroup>
                <FormGroup row>
                    <Field label="地址:" name="addr" styles={{width:'495px'}} value={formData} chFn={fieldChangeFn}/>
                </FormGroup>
                <FormGroup row>
                    <Field label="行動電話:" name="tel" value={formData} chFn={fieldChangeFn}/>
                    <Field label="住家電話:" name="mobile" value={formData} chFn={fieldChangeFn}/>
                    <FieldSelect label="來源:" name="source" options={source} value={formData} chFn={fieldChangeFn}/>
                    <FieldSelect label="教練姓名:" name="teacherId" options={teachers} chFn={teacherFn(seasonType[classTypeIndex] ? seasonType[classTypeIndex].name : '' )} 
                    value={formData}/>
                    <FieldSelect label="選訓時間:" name="trainTimeId" options={trainTime} styles={{width:'120px'}} 
                    value={formData} chFn={fieldChangeFn}/>
                </FormGroup>
                <FormGroup row>
                    <FieldSelect label="手、自排:" name="carType" options={carType} value={formData} chFn={fieldChangeFn}/>      
                    <Field label="訓練:" name="trainScore" value={formData} chFn={fieldChangeFn}/>
                    <Field label="筆試:" name="examScore" value={formData} chFn={fieldChangeFn}/>
                </FormGroup>
                <FormGroup row>
                    <Field label="路試:" name="roadScore" value={formData} chFn={fieldChangeFn}/>
                    <Field label="繳費:" name="payment" value={formData} chFn={fieldChangeFn}/>
                    <Field label="繳費日期:" type="date" styles={{width:'160px'}} name="payDate" value={formData} chFn={fieldChangeFn}/>              
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
        </Col>
        <Col>
            <DataGridContainer />
        </Col>
      </Row>
      {/* <Row className='dataGrid'>
       
      </Row> */}
  </Container>
  </section>
);

export default AddForm;