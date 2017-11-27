import React from 'react';
import Section from  '../Common';
import Form from '../Form';
import { NAV } from  '../../constants/pageTitle';


let list = [
  {labelName: '姓名', id: 'name', type: 'text', holder:'請輸入姓名', req:true, msg:'姓名不可為空' },
  {labelName: '電子郵件', id: 'email', type: 'email', holder:'請輸入信箱', req:true, msg:'信箱不可為空' },
  {labelName: '手機號碼', id: 'phone', type: 'tel', holder:'請輸入手機', req:true, msg:'手機不可為空' },
  {labelName: '訊息', id: 'message', type: 'textArea', holder:'請輸入訊息', req:true, msg:'訊息不可為空' },
];

const Body = () => (
  <div className="col-lg-8 mx-auto">
    <Form formName= 'sentMessage' formId= 'contactForm' list ={list} />
  </div>
);

let props = {
  sectionId : 'contact',
  title: NAV.CONTACT,
  hr: 'star-primary',
  body: <Body />
};

const Contact = ({
  isAuthorized,
  onToShare,
  onLogout,
}) => (
  <Section {...props} />
);

export default Contact;