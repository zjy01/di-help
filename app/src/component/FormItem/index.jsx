import React from 'react';
import memoizeOne from 'memoize-one';
import {
  Form, Input, Radio, Select, DatePicker, Cascader, TimePicker, InputNumber
} from 'antd';

const { RangePicker } = DatePicker;

const { TextArea } = Input;
const RadioGroup = Radio.Group;

function propsSplit(props) {
  const formProps = ['colon', 'extra', 'hasFeedback',
    'help', 'label', 'labelCol', 'wrapperCol',
    'required', 'validateStatus', 'formClassName'];
  return Object.keys(props).reduce((acc, prop) => {
    const index = formProps.includes(prop) ? 0 : 1;
    acc[index][prop] = props[prop];
    return acc;
  }, [{}, {}]);
}
export default
class FormItem {
  static WrapForm(Item) {
    const splitFunc = memoizeOne(propsSplit);
    return (props) => {
      const { children, ...restProps } = props;
      const [formPropsValue, itemPropsValue] = splitFunc(restProps);
      return (
        <Form.Item {...formPropsValue} className={formPropsValue.formClassName}>
          {Item(itemPropsValue)}
          {children}
        </Form.Item>
      );
    };
  }

  constructor({
    form,
    model = {},
    defaultData,
  }) {
    this.form = form;
    this.model = model;
    this.defaultData = defaultData;

    [
      { name: 'Input', value: Input },
      { name: 'InputNumber', value: InputNumber },
      { name: 'TextArea', value: TextArea },
      { name: 'RadioGroup', value: RadioGroup },
      { name: 'DatePicker', value: DatePicker },
      { name: 'TimePicker', value: TimePicker },
      { name: 'RangePicker', value: RangePicker },
      { name: 'Cascader', value: Cascader },
    ]
      .forEach(this.autoMountItem.bind(this));
  }

  autoMountItem({ name, value: Item }) {
    this[name] = ({
      prop,
      ...props
    }) =>  this.getFieldDecorator(prop)(<Item {...props} />);
    this[`Form${name}`] = FormItem.WrapForm(this[name]);
  }

  getRules(prop) {
    const { form: { getFieldsValue }, model } = this;
    const propModel = model[prop] || {};
    if (typeof propModel.rules === 'function') {
      return  propModel.rules(getFieldsValue());
    }
    return propModel.rules;
  }

  getInitData(prop) {
    const { model, defaultData } = this;
    const { value, initConvert } = model[prop] || {};
    if (defaultData) {
      if (initConvert) {
        return initConvert(defaultData[prop], defaultData);
      }
      if (defaultData[prop] !== undefined) {
        return defaultData[prop];
      }
    }
    return value;
  }

  getFieldDecorator(prop) {
    const { form: { getFieldDecorator } } = this;
    return getFieldDecorator(prop, {
      rules: this.getRules(prop),
      initialValue: this.getInitData(prop),
    });
  }

  setData(data) {
    const { model, form } = this;
    const values = Object.keys(model).reduce((acc, prop) => {
      const { initConvert } = model[prop];
      if (data[prop] !== undefined) {
        if (initConvert) {
          acc[prop] = initConvert(data[prop], data);
        } else {
          acc[prop] = data[prop];
        }
      }
      return acc;
    }, {});
    form.setFieldsValue(values);
  }

  getData() {
    const { model, form } = this;
    const { getFieldsValue } = form;
    const data = getFieldsValue();
    const values = Object.keys(model).reduce((acc, prop) => {
      const { submitConvert, ignoreSubmit } = model[prop];
      if (!ignoreSubmit && data[prop] !== undefined) {
        if (submitConvert) {
          acc[prop] = submitConvert(data[prop], data);
        } else {
          acc[prop] = data[prop];
        }
      }
      return acc;
    }, {});
    return values;
  }

  Select({
    prop,
    options,
    ...props
  }) {
    const child = (
      <Select {...props}>
        {
          options.map(({ label, value }) => (
            <Select.Option value={value}>
              {label}
            </Select.Option>
          ))
        }
      </Select>
    );
    return this.getFieldDecorator(prop)(child);
  }

  FormSelect= FormItem.WrapForm(this.Select)
}
