/*
  考題增加
*/
import React from 'react';
import { Container, Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
  
const AddExam = ({
    addExam,
    handleUploadData
}) => (
  <section className='examPage' id='exam'>
    <Form>
    <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input type="file" name="file" id="examFile" />
    </FormGroup>
    <FormGroup>
        <Button onClick={addExam}></Button> 
    </FormGroup>
  </Form>
  </section>
);

export default AddExam;