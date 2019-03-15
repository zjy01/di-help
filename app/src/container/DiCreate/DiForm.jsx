import React from 'react';
import {
  Form, Input, Icon, Row, Col, Button,
} from 'antd';
import FormItem from '../../component/FormItem';

import model from './model';
class DiForm extends React.Component {
  constructor(props) {
    super(props);
    this.Item = new FormItem({
      form: props.form,
      model,
    });
    this.state = {
      submitting: false,
      unitCascader: [],
    };
  }

  render(){
    const { Item } = this;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
      },
    };
    const firtyLayout = {
      md: 6,
      xs: 12,
    }
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Row>
          <Col {...firtyLayout}>
            <Item.FormInput
              label="车型"
              prop="car"
              extra="快车、出租车"
            />
          </Col>
          <Col {...firtyLayout}>
            <Item.FormInput
              label="城市"
              prop="city"
              extra="所在城市"
            />
          </Col>
          <Col {...firtyLayout}>
            <Item.FormInput
              label="起点"
              prop="start"
              extra="一般是居住地"
            />
          </Col>
          <Col {...firtyLayout}>
            <Item.FormInput
              label="终点"
              prop="end"
              extra="一般是办公点"
            />
          </Col>
          <Col {...firtyLayout}>
            <Item.FormTimePicker
              format={'HH:mm'}
              label="上班时间"
              prop="startTime"
              extra="起点启程搭车时间"
            />
          </Col>
          <Col {...firtyLayout}>
            <Item.FormTimePicker
              format={'HH:mm'}
              label="下班班时间"
              prop="endTime"
              extra="终点回程搭车时间"
            />
          </Col>
        </Row>
        </Form>
    )
  }
}
export default Form.create()(DiForm)