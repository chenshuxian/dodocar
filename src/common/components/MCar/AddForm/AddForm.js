/*
  汽車維護
*/
import React from 'react';
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  Row,
  Col,
} from 'reactstrap';
import DataGridContainer from '../../../containers/MCar/DataGridContainer';
import FixDGContainer from '../../../containers/MCar/FixDGContainer';
var styles = {
  color: 'red',
  width: '100px',
};

function Field(props) {
  //console.log(props.value);
  return (
    <Row>
      <Label>{props.label}</Label>
      <Col>
        <Input
          type={props.type == '' ? text : props.type}
          name={props.name}
          id={props.name}
          style={props.styles}
          value={props.value ? props.value[props.name] : ''}
          onChange={props.chFn}
          readOnly={props.readonly}
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
        <Input
          type='select'
          name={props.name}
          id={props.name}
          onChange={props.chFn ? props.chFn : ''}
          style={props.styles}
          value={props.value ? props.value[props.name] : ''}
        >
          {props.options.map(function (name, i) {
            return (
              <option key={i} value={props.options[i].id}>
                {props.options[i].name}
              </option>
            );
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
        <Input
          type='select'
          name={props.name}
          onChange={props.chFn ? props.chFn : ''}
          style={props.styles}
          value={props.value ? props.value[props.name] : ''}
        >
          {props.options.map(function (name, i) {
            return (
              <option key={i} value={props.options[i].name}>
                {props.options[i].name}
              </option>
            );
          })}
        </Input>
      </Col>
    </Row>
  );
}

const AddForm = ({
  fieldChangeFn,
  formData,
  detailFormData,
  carType,
  color,
  rc,
  lic,
  formState,
  mCarState,
  handleUpdate,
  handleSubmit,
  newAdd,
  store,
  teacher,
  car,
  fixStore,
  detailSubmit,
  detailUpdate,
  count,
  report,
  excel,
}) => (
  <section className='examPage' id='exam'>
    <Container>
      <Row>
        <Button color='success' onClick={newAdd}>
          新增車輛資料
        </Button>
      </Row>
      <Row>
        <Col className='formCenter' xs='auto'>
          <Form id='addcar'>
            <FormGroup row>
              <Field
                label='車牌:'
                name='car_number'
                id='car_number'
                value={formData}
                chFn={fieldChangeFn()}
              />
              <Field
                label='車子廠牌:'
                name='car_maker'
                value={formData}
                chFn={fieldChangeFn()}
              />
            </FormGroup>
            <FormGroup row>
              <Field
                label='引擎號碼:'
                name='engin_id'
                value={formData}
                chFn={fieldChangeFn()}
              />
              <Field
                label='出廠日期:'
                styles={{ width: '160px' }}
                type='date'
                name='born_date'
                value={formData}
                chFn={fieldChangeFn()}
              />
            </FormGroup>
            <FormGroup row>
              <Field
                label='保險日期:'
                styles={{ width: '160px' }}
                type='date'
                name='ins_date'
                value={formData}
                chFn={fieldChangeFn()}
              />
              <Field
                label='排氣量:'
                name='cc'
                value={formData}
                chFn={fieldChangeFn()}
              />
            </FormGroup>
            <FormGroup row>
              <FieldSelect
                label='顏色:'
                name='color'
                options={color}
                value={formData}
                chFn={fieldChangeFn()}
              />
              <FieldSelect
                label='牌照狀態:'
                name='lic_status'
                options={lic}
                value={formData}
                chFn={fieldChangeFn()}
              />
            </FormGroup>
            <FormGroup row>
              <FieldSelect
                label='手、自排:'
                name='hand_auto'
                options={carType}
                value={formData}
                chFn={fieldChangeFn()}
              />
              <FieldSelect
                label='道駕車:'
                name='road_car'
                options={rc}
                value={formData}
                chFn={fieldChangeFn()}
              />
            </FormGroup>
            <FormGroup row>
              {formState == 'insert' ? (
                <Button color='success' onClick={handleSubmit}>
                  新增
                </Button>
              ) : (
                <Button color='warning' onClick={handleUpdate}>
                  更新
                </Button>
              )}
              <Field label='' name='id' value={formData} type='hidden' />
            </FormGroup>
          </Form>
        </Col>
        <Col>
          <DataGridContainer />
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Button color='danger' onClick={excel}>
          建立EXCEL檔案
        </Button>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col className='formCenter' xs='auto'>
          <Form id='detail'>
            <FormGroup row>
              <FieldSelect
                label='車牌:'
                name='car_id'
                id='car_id'
                options={car}
                value={detailFormData}
                chFn={fieldChangeFn(store)}
              />
              <FieldSelect
                label='請修人員:'
                name='teacher_id'
                options={teacher}
                value={detailFormData}
                chFn={fieldChangeFn(store)}
              />
            </FormGroup>
            <FormGroup row>
              <FieldSelect
                label='修理廠家:'
                name='fix_store'
                options={fixStore}
                value={detailFormData}
                chFn={fieldChangeFn(store)}
              />
              <Field
                label='出廠日期:'
                styles={{ width: '160px' }}
                type='date'
                name='fix_date'
                value={detailFormData}
                chFn={fieldChangeFn(store)}
              />
            </FormGroup>
            <FormGroup row>
              <Field
                label='零件名稱:'
                name='device'
                value={detailFormData}
                chFn={fieldChangeFn(store)}
              />
              <Field
                label='工資:'
                name='salary'
                value={detailFormData}
                chFn={fieldChangeFn(store)}
              />
            </FormGroup>
            <FormGroup row>
              <Field
                label='數量:'
                name='num'
                value={detailFormData}
                chFn={fieldChangeFn(store)}
              />
              <Field
                label='單價:'
                name='price'
                value={detailFormData}
                chFn={fieldChangeFn(store)}
              />
            </FormGroup>
            <FormGroup row>
              <Field
                label='小計:'
                styles={{ width: '160px' }}
                name='totalPrice'
                value={detailFormData}
              />
              {mCarState == 'insert' ? (
                <Button color='success' onClick={detailSubmit}>
                  新增
                </Button>
              ) : (
                <Button color='warning' onClick={detailUpdate}>
                  更新
                </Button>
              )}
              <Field
                label=''
                name='detailId'
                id='detailId'
                value={detailFormData}
                type='hidden'
              />
            </FormGroup>
          </Form>
        </Col>
        <Col>
          <FixDGContainer />
        </Col>
      </Row>
    </Container>
  </section>
);

export default AddForm;
