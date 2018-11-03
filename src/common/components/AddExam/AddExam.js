/*
  考題增加
*/
import React from 'react';
import { Container, Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { addUser } from '../../actions/index';
  
const AddExam = ({
    addExam,
    addSeason,
    addStu,
    handleUploadData
}) => (
  <section className='examPage' id='exam'>
      <h2 className="text-center">試題及學員管理區</h2>
      <hr className="star-primary" />
      <div className="col-lg-8 mx-auto">
        <Form>
          <FormGroup row>
              <Label for="exampleFile">試題管理</Label>
              <Input type="file" name="file" id="examFile" />
              <Button onClick={addExam}>建立</Button> 
          </FormGroup>
          <p> 上傳格式說明: <a href="/static/sql/exam.json" target="_blank">exam 範例檔</a></p>
          <FormGroup row>
              <img src='/static/images/examJson.png' />
              <ul>
              <li><b> examId: 題庫ID </b></li>
              <li><b> question: 題目 </b></li>
              <li><b> choice: 選擇 </b></li>
              <li><b> answer: 答案 </b></li>
              <li><b> img: 圖片 </b></li>
              </ul>
          </FormGroup>
          <hr />
          <FormGroup row>
              <Label for="exampleFile">學員管理</Label>
              <Input type="file" name="stufile" id="stuFile" />
              <Button onClick={addUser}>建立</Button> 
          </FormGroup>
          <p> 上傳格式說明: <a href="/static/sql/user.json" target="_blank">user 範例檔</a></p>
          <FormGroup row>
              <img src='/static/images/userJson.png' />
              <ul>
              <li><b> name: 帳號 </b></li>
              <li><b> passwd: 密碼 </b></li>
              <li><b> email: 可有可無 </b></li>
              </ul>
          </FormGroup>
          <hr />
          <FormGroup row>
              <Label for="exampleFile">学期管理</Label>
              <Input type="file" name="seasonfile" id="seasonFile" />
              <Button onClick={addSeason}>建立</Button> 
          </FormGroup>
          <p> 上傳格式說明: <a href="/static/sql/user.json" target="_blank">season 範例檔</a></p>
          <FormGroup row>
              <img src='/static/images/seasonJson.png' />
              <ul>
              <li><b> year: 年  </b></li>
              <li><b> name: 期别 </b></li>
              <li><b> start: 期别开始 </b></li>
              <li><b> finish: 期别结束  </b></li>
              <li><b> exam: 考试日期 </b></li>
              </ul>
          </FormGroup>
        </Form>
      </div>
  </section>
);

export default AddExam;