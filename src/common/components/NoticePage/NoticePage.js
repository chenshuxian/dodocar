import React from 'react';
import { Button , Form, FormGroup, Label, Input } from 'reactstrap';
import Section from  '../Common';
import { EXAM } from  '../../constants/pageTitle';

var click = (event) => {
  alert(event.target.value);
}

let props = {
  sectionId : 'notice',
  title: EXAM.NOTICE,
  hr: 'star-primary'
};

const EnableBtn = (props) => (
  <Button color='red' onClick={props.fn} >考試</Button>
);

const DisableBtn = () => (
  <Button color='red' disabled>考試</Button>
);
const  NoticePage = ({
  onBtnUse,
  goExam,
  isEdit
}) => (
  <section className="examPage" id={props.sectionId}>
  <div className="container">
    <h2 className="text-center">{props.title}</h2>
    <hr className={props.hr} />
    <div className="col-lg-8 mx-auto">
    <ul>
        <ol>1. 交通規則：考試時間為「30」分鐘；機械常識：考試時間為「20」分鐘。兩者皆考者合計「50」分鐘。</ol>
        <ol>2. 於完成考試前，答案可更改。</ol>
        <ol>3. 作答完畢，考試時間尚未結束，可自己選擇是否「繳卷」，繳卷後，考試立即結束。</ol>
        <ol>4. 考試舞弊或冒名代考者，自查獲日停考五年並註銷其原考之駕照！</ol>
        <ol>5. 考試過程全程錄影。</ol>
        <ol>6. 考試中有問題可舉手向監考人員反應。</ol>
    </ul>
    <br />
    <Form>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" onClick={onBtnUse} /> 我同意以上規則進行考試。
          </Label>
        </FormGroup>
        <Button color='danger'>回首頁</Button>{' '}
        {
          isEdit ?
          <EnableBtn fn = {goExam} />
        :
          <DisableBtn />
        }
    </Form>
  </div>
  </div>
</section>
);

export default NoticePage;