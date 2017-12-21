import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Login = ({
    onLogin,
    isOpen,
    onChangeNumInput,
    onChangePasswordInput,
    onLoginSubmit,
    modalTitle
}) => (
    <div>
    <Modal isOpen={isOpen} toggle={onLogin} className=''>
      <ModalHeader toggle={onLogin}>{modalTitle}</ModalHeader>
      <ModalBody>
      <form name='Exam' id='Exam'>
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
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onLoginSubmit}>登入</Button>{' '}
        <Button color="secondary" onClick={onLogin}>取消</Button>
      </ModalFooter>
    </Modal>
  </div>
)

export default Login;