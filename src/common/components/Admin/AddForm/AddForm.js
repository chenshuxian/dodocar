/*
  考題增加
*/
import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import { Container, Form, FormGroup, Label, Input, FormText, Button,
          Row, Col } from 'reactstrap';

var styles = {
    color:'red',
    width: '100px'
};
  
const AddForm = ({
    addUser,
    today,
    teacherTime,
    teacher,
    trainTime
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
            <Form inline>
                <FormGroup>
                    <Label>訓練班別:</Label>{' '}
                    <Input type="text" name="classType" id="classType"/>
                </FormGroup>{' '}
                <FormGroup>
                    <Label>期別:</Label>{' '}
                    <Input type="text" name="season" id="season"/>
                </FormGroup>
                <FormGroup>
                    <Label>開訓日期:</Label>{' '}
                    <Input type="text" name="startDate" id="startDate"/>
                </FormGroup>{' '}
                <FormGroup>
                    <Label>結訓日期:</Label>{' '}
                    <Input type="text" name="finishDate" id="finishDate"/>
                </FormGroup>
            </Form>
            <Form inline>
                <FormGroup>
                    <Label>學號:</Label>{' '}
                    <Input type="text" name="stuNum" id="stuNum"/>
                </FormGroup>{' '}
                <FormGroup>
                    <Label>姓名:</Label>{' '}
                    <Input type="text" name="name" id="name"/>
                </FormGroup>
                <FormGroup>
                    <Label>性別:</Label>{' '}
                    <Input type="select" name="gender" id="gender">
                        <option>男</option>
                        <option>女</option>
                    </Input>
                </FormGroup>{' '}
                <FormGroup>
                    <Label>出生年月日:</Label>{' '}
                    <DatePicker id="born" value={today} onChange={addUser}/>
                </FormGroup> 
                <FormGroup>
                    <Label>身份證字號:</Label>{' '}
                    <Input type="text" name="id" id="id" />
                </FormGroup>
            </Form>
            <Form inline>
                <FormGroup>
                    <Label>郵地區號:</Label>{' '}
                    <Input type="text" name="addrNum" id="addrNum"/>
                </FormGroup>{' '}
                <FormGroup>
                    <Label>地址:</Label>{' '}
                    <Input type="text" name="addr" id="addr"/>
                </FormGroup>
            </Form>
            <Form inline>
                <FormGroup>
                    <Label>行動電話:</Label>{' '}
                    <Input type="text" name="tel" id="tel"/>
                </FormGroup>{' '}
                <FormGroup>
                    <Label>住家電話:</Label>{' '}
                    <Input type="text" name="mobile" id="mobile"/>
                </FormGroup>
                <FormGroup>
                    <Label>來源:</Label>{' '}
                    <Input type="text" name="source" id="source"/>
                </FormGroup>{' '}
                <FormGroup>
                    <Label>教練姓名:</Label>{' '}
                    <Input type="select" name="teacher" id="teacher" onChange={teacherTime}>
                        {   
                            teacher.forEach(function(name, i) {
                                return <option key={i}>name</option>;
                            })
                        }
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>選訓時間:</Label>{' '}
                    <Input type="select" name="trainBook" id="trainBook" onChange={teacherTime}>
                        {   
                            trainTime.forEach(function(time, i) {
                                return <option key={i}>time</option>;
                            })
                        }
                    </Input>
                </FormGroup>
            </Form>
            <Form inline>
                <FormGroup>
                    <Label>手、自排:</Label>{' '}
                    <Input type="select" name="carType" id="carType" >
                       <option value="1">手排</option>
                       <option value="2">自排</option> 
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>訓練:</Label>{' '}
                    <Input type="text" name="trainScore" id="trainScore" />
                </FormGroup>
                <FormGroup>
                    <Label>筆試:</Label>{' '}
                    <Input type="text" name="examScore" id="examScore" />
                </FormGroup>
                <FormGroup>
                    <Label>路試:</Label>{' '}
                    <Input type="text" name="roadScore" id="roadScore" />
                </FormGroup>             
            </Form>
            <Form inline>
                <FormGroup>
                    <Label>備註:</Label>{' '}
                    <Input type="textArea" name="memo" id="memo" />
                </FormGroup>            
            </Form>
      </Row>
      <Row className='dataGrid'>
           datagrid
      </Row>
  </Container>
  </section>
);

export default AddForm;