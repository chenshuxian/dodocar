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
    {/* <Form formName= 'sentMessage' formId= 'contactForm' list ={list} /> */}
    <p style={{marginLeft : 290}}>
      地址：金門縣金寧鄉盤果西路6號 <br/>
      Email：service@km-driving.com.tw  <br/>
      報名專線：082329881  <br/>
      營業時間：週一至週四 7:00-18:00  <br/>
      例假日 7:00-18:00  <br/>
      <a target="_blank" href="https://www.facebook.com/kinmen.driving.school/"><img style={{width: 150}} src="static/images/fb.png" /></a>
    </p>
  </div>
);

let props = {
  sectionId : 'contact',
  title: NAV.CONTACT,
  hr: 'star-primary',
  body: <Body />,
  className: 'success'
};

const Contact = ({
  isAuthorized,
  onToShare,
  onLogout,
}) => (
  <Section {...props} />
);

export default Contact;