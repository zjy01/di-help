import React from 'react';
import {
  Form, Input, Icon, Row, Col, Button, Checkbox, Alert
} from 'antd';
import moment from 'moment';
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
      dates: [],
      checkDates: []
    };
  }

  handleCycleChange = ([startTime, endTime]) => {
    const et = moment(endTime).endOf('d');
    const dates = [];
    for (let i = moment(startTime).startOf('d'); i.isBefore(et); i.add(1, 'd')) {
      const dateStr = moment(i).format('YYYY-MM-DD dd');
      dates.push(`${dateStr} 上午`, `${dateStr} 下午`)
    }
    this.setState({
      dates,
      checkDates: dates
    })
  }

  handleDatesChange = (values) => {
    this.setState({
      checkDates: values
    })
  }

  randomTime(date, time) {
    let dateStr = date.substr(0, 10);
    const addRamdom = Math.round(Math.random() * 10 * 60 * 1000);
    const subRamdom = Math.round(Math.random() * 10 * 60 * 1000);
    dateStr += moment(time.valueOf() + addRamdom - subRamdom).format(' HH:mm');
    return moment(dateStr, 'YYYY-MM-DD HH:mm');
  }

  randomMoney(options, arr = []) {
    const {
      len,
      offset,
      total,
    } = options;
    if (len > 1) {
      const avg = total / len;
      const randomNum = this.randomDuration(avg, offset);
      arr.push(randomNum);
      this.randomMoney({
        len: len - 1,
        offset,
        total: total - randomNum,
      }, arr)
    } else {
      arr.push(Number(total.toFixed(2)));
    }
    return arr;
  }

  randomDuration(num, offset) {
    const min = num - offset/2;
    const max = num + offset/2;
    const randomNum = Number(((Math.random() * (max - min)) + min).toFixed(2));
    return randomNum;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields((err) => {
      if (!err) {
        const { checkDates } = this.state;
        const {
          startTime, endTime, money, moneyAround, duration, durationAround,
          start, end, car, city
        } = this.Item.getData();
        const len = checkDates.length;
        const moneys = this.randomMoney({ offset: moneyAround, total: money, len: len });
        const result = checkDates.map((date, i) => {
          // 随机时间
          let time = date.endsWith('上午') ? startTime : endTime;
          let ttime = this.randomTime(date, time);

          // 金额
          const tmoney = moneys[i];

          // 里程
          const tduration = this.randomDuration(duration, durationAround);

          // 起点
          const tstart = date.endsWith('上午') ? start : end;

          // 终点
          const tend = date.endsWith('上午') ? end : start;

          return {
            car,
            city,
            time: ttime,
            start: tstart,
            end: tend,
            duration: tduration,
            money: tmoney,
          }
        });

        onSubmit && onSubmit(result);
      }
    })
  }
  render() {
    const { dates, checkDates } = this.state;
    const { Item } = this;
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
              placeholder="快车、出租车"
            />
          </Col>
          <Col {...firtyLayout}>
            <Item.FormInput
              label="城市"
              prop="city"
              placeholder="所在城市"
            />
          </Col>
          <Col {...firtyLayout}>
            <Item.FormInput
              label="起点"
              prop="start"
              placeholder="一般是居住地"
            />
          </Col>
          <Col {...firtyLayout}>
            <Item.FormInput
              label="终点"
              prop="end"
              placeholder="一般是办公点"
            />
          </Col>
          <Col {...firtyLayout}>
            <Item.FormInputNumber
              placeholder="请输入单次大约里程"
              label="里程"
              prop="duration"
            />
          </Col>
          <Col {...firtyLayout}>
            <Item.FormInputNumber
              placeholder="单次里程偏差值"
              label="偏差值"
              prop="durationAround"
            />
          </Col>
          <Col {...firtyLayout}>
            <Item.FormInputNumber
              placeholder="请输入里程总金额"
              label="总金额"
              prop="money"
            />
          </Col>
          <Col {...firtyLayout}>
            <Item.FormInputNumber
              placeholder="单次里程金额偏差值"
              label="偏差值"
              prop="moneyAround"
            />
          </Col>
        </Row>
        <Row>
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
              label="下班时间"
              prop="endTime"
              extra="终点回程搭车时间"
            />
          </Col>
          <Col span={12}>
            <Item.FormRangePicker
              label="里程周期"
              prop="cycle"
              extra="里程记录的周期"
              onChange={this.handleCycleChange}
            />
            <div>
              {
                dates.length > 0 &&
                <Alert showIcon message="请筛选具体的时间" type="info" />
              }
              <Checkbox.Group value={checkDates} onChange={this.handleDatesChange}>
                <Row>
                  {dates.map(date => (
                    <Col span={12} key={date}>
                      <Checkbox value={date}>{date}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </div>
          </Col>
        </Row>
        <div style={{ textAlign: 'center' }}>
          <Button htmlType="submit" type="primary">提交</Button>
        </div>
      </Form>
    )
  }
}
export default Form.create()(DiForm)