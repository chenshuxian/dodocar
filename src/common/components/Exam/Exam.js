import React from 'react';
import Section from '../Common';
import { NAV } from  '../../constants/pageTitle';
import Form from '../Form';

let props = {
  sectionId : 'exam',
  title: NAV.EXAM,
  hr: 'star-primary',
  formName: 'Exam',
  formId: 'Exam'
};

const Exam = ({
  onChangeNumInput,
  onChangePasswordInput,
  onLoginSubmit,
}) => (
  <section className={props.className} id={props.sectionId}>
    <div className="container">
      <h2 className="text-center">{props.title}</h2>
      <hr className={props.hr} />
      <div className="col-lg-8 mx-auto">
        <form name={props.formName} id={props.formId}>
          <div className="control-group">
            <div className="form-group floating-label-form-group controls">
              <label>學號</label>
                <input className="form-control" id='userNum' name='userNum' type='text' placeholder='請輸入學號'  
                required  data-validation-required-message='學號不可為空' onChange={onChangeNumInput} />
                <p className="help-block text-danger"></p>
            </div>
          </div>
          <div className="control-group">
            <div className="form-group floating-label-form-group controls">
              <label>密碼</label>
                <input className="form-control" id='exPwd' name='exPwd' type='password' placeholder='請輸入密碼'  
                required  data-validation-required-message='密碼不可為空' onChange={onChangePasswordInput}/>
                <p className="help-block text-danger"></p>
            </div>
          </div>
          <br />
          <div id="success"></div>
          </form>
          <div className="form-group">
            <button onClick={onLoginSubmit} className="btn btn-success btn-lg" id="sendMessageButton">Send</button>
          </div>
       
      </div>
    </div>
  </section>
);

export default Exam;