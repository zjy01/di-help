import React from 'react';
import { Button, Drawer, Table, Input, InputNumber, DatePicker, Form, Row, Col, Icon, message } from 'antd';
import DiForm from './DiForm.jsx';
import printPDF from '../../utils/print'
import moment from 'moment';

import './style.css';
export default class DiCreate extends React.Component {

  state = {
    diFormShow: false,
    tables: [],
    form: {
      time : moment()
    }
  }

  toggleFormShow = (diFormShow) => {
    this.setState({
      diFormShow
    })
  }

  handleAddRecord = () => {
    const { tables } = this.state;
    this.setState({
      tables: [...tables, {}]
    })
  }

  handleFormChange(key, value) {
    this.setState((state) => ({
      form: {
        ...state.form,
        [key]: value
      }
    }))
  }

  handleDiForm = (data) => {
    const { tables } = this.state
    this.setState({
      tables: [...tables, ...data]
    });
  }

  handleChange(index, prop, value) {
    const { tables } = this.state;
    const data = tables[index];
    data[prop] = value;
    tables.splice(index, 1, data);
    this.setState({
      tables: [...tables]
    })
  }

  handleSort = () => {
    const { tables } = this.state
    this.setState({
      tables: [...tables.sort((a, b) => b.time.isBefore(a.time) ? 1: -1)]
    });
  }

  handleDelete = (index) => {
    const { tables } = this.state;
    tables.splice(index, 1);
    this.setState({
      tables: [...tables]
    });
  }

  handlePrint = () => {
    const { tables, form } = this.state;
    if(!form.time || !form.phone){
      message.info('请填写申请时间和申请人电话');
    } else{
      printPDF(tables, form)
    }
  }

  getColumns() {
    return [{
      title: '序号',
      dataIndex: 'index',
    }, {
      title: '车型',
      dataIndex: 'car',
      render: this.renderInput.bind(this, 'car'),
      width: 70
    }, {
      title: '上车时间',
      dataIndex: 'time',
      render: this.renderTime.bind(this, 'time'),
      width: 150
    }, {
      title: '城市',
      dataIndex: 'city',
      render: this.renderInput.bind(this, 'city'),
      width: 70
    }, {
      title: '起点',
      dataIndex: 'start',
      render: this.renderInput.bind(this, 'start')
    }, {
      title: '终点',
      dataIndex: 'end',
      render: this.renderInput.bind(this, 'end')
    }, {
      title: '里程',
      dataIndex: 'duration',
      render: this.renderInputNumber.bind(this, 'duration'),
      width: 70
    }, {
      title: '金额',
      dataIndex: 'money',
      render: this.renderInputNumber.bind(this, 'money'),
      width: 70
    }, {
      title: '备注',
      dataIndex: 'remark',
      render: this.renderInput.bind(this, 'remark')
    }, {
        title: '操作',
        dataIndex: 'action',
      render: this.renderOpt.bind(this),
      fixed: 'right',
      width: 50,
    }];
  }

  getDatas() {
    const { tables } = this.state;
    return tables.map((item, index) => ({
      ...item,
      index: index + 1,
      key: index + 1,
    }))
  }

  renderInput(prop, value, row, index) {
    return <Input value={value} onChange={(e) => this.handleChange(index, prop, e.target.value)} />
  }
  renderInputNumber(prop, value, row, index) {
    return <InputNumber value={value} step={0.01} onChange={this.handleChange.bind(this, index, prop)} />
  }
  renderTime(prop, value, row, index) {
    return <DatePicker allowClear={false} showTime value={value} onChange={this.handleChange.bind(this, index, prop)} format="MM-DD HH:mm dd" />
  }
  renderOpt(value, row, index) {
    return <Icon className="red" type="delete" onClick={this.handleDelete.bind(this, index)} />
  }

  readerHeader = () => {
    const { form, tables } = this.state;
    if (tables.length === 0) {
      return null;
    }
    const { time, phone } = form;
    const moneyTotal = tables.reduce((acc, { money }) => {
      return acc + money;
    }, 0);
    const startTime = tables[0].time ? tables[0].time.format('YYYY-MM-DD') : '--';
    const endTime = tables[tables.length - 1].time ? tables[tables.length - 1].time.format('YYYY-MM-DD') : '--';
    return (
      <div>
        <Form layout="inline">
          <Row>
            <Col span={6}>
              <Form.Item label="申请日期">
                <DatePicker value={time} onChange={this.handleFormChange.bind(this, 'time')} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="手机号">
                <Input value={phone} onChange={e => this.handleFormChange('phone', e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="行程时间">
                {startTime} 至 {endTime}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="汇总">
                共 {tables.length} 笔行程， 合计 {moneyTotal.toFixed(2)} 元
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }


  render() {
    const { diFormShow } = this.state;
    return (
      <section>
        <div>
          <Button
            onClick={this.handleAddRecord}
            type="primary"
            icon="plus"
          >添加单条记录</Button>
          <Button
            onClick={this.toggleFormShow.bind(this, true)}
            className="ml20"
            type="primary"
            icon="plus-square">批量智能生成记录</Button>
          <Button
            onClick={this.handleSort}
            className="ml20"
            icon="swap">一键排序</Button>
          <Button
            onClick={this.handlePrint}
            className="ml20"
            icon="download">生成PDF</Button>

        </div>
        <Table
          className="di-table"
          title={this.readerHeader}
          columns={this.getColumns()}
          dataSource={this.getDatas()}
          pagination={false}
          size="small"
        />
        <Drawer
          title="批量智能生成记录"
          width={800}
          onClose={this.toggleFormShow.bind(this, false)}
          visible={diFormShow}
        >
          {
            diFormShow
            &&
            <DiForm
              onSubmit={this.handleDiForm}
            />
          }
        </Drawer>
      </section>
    )
  }
}