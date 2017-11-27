import React from 'react';

const InputBox= (props) => (
  <div className="control-group">
    <div className="form-group floating-label-form-group controls">
      <label>{props.labelName}</label>
      {props.type === 'textArea' ?
        <textarea className="form-control" id={props.id} rows="5" placeholder={props.holder}  required = {props.req} data-validation-required-message={props.req ? props.msg : ''}></textarea>  
        : 
        <input className="form-control" id={props.id} type={props.type} placeholder={props.holder}  required = {props.req} data-validation-required-message={props.req ? props.msg : ''} />
      }
      
      <p className="help-block text-danger"></p>
    </div>
  </div>
);

const Form = (props) => (
  <form name={props.formName} id={props.formId} action={props.action} method='post'>
    {props.list.map((result, index) => {
      return (<InputBox key={index} {...result} />);
    })}
    <br />
    <div id="success"></div>
    <div className="form-group">
      <button type="submit" className="btn btn-success btn-lg" id="sendMessageButton">Send</button>
    </div>
  </form>
);

export default Form;