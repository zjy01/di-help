/**
 * model声明
 * value  {any} 默认值
 * initConvert  {func}  当线上数据回传时，转换出来的对应值
 * submitConvert  {func}  当数据提交时，转换出来的对应值
 * rules  {array} 数据的校验规则
 * ignoreSubmit {bool}  提交时是否携带该值
 */
export default {
  car: {
    value: '',
    noCopy: true,
    rules: [{
      max: 1000, message: '请输入车型', type: 'string', required: true,
    }],
  },
  start: {
    value: '',
    rules: [{
      required: true, message: '请输入起点', type: 'string', max: 100,
    }],
  },
  end: {
    value: '',
    rules: [{
      required: true, message: '请输入终点', type: 'string', max: 100,
    }],
  },
  duration: {
    rules: [{
      required: true, message: '请输入单次大约里程', trigger: 'submit', type: 'number',
    }],
  },
  durationAround: {
    rules: [{
      required: true, message: '请输入里程偏差值', trigger: 'submit', type: 'number',
    }],
  },
  money: {
    rules: [{
      required: true, message: '请输入里程总金额', trigger: 'submit', type: 'number',
    }],
  },
  moneyAround:{
    rules: [{
      required: true, message: '请输入单词里程金额偏差值', trigger: 'submit', type: 'number',
    }],
  },
  city:{
    rules: [{
      required: true, message: '请输入城市', trigger: 'submit', type: 'string',
    }],
  },
  startTime:{
    rules: [{
      required: true, message: '请输入上班时间', trigger: 'submit', type: 'object',
    }],
  },
  endTime:{
    rules: [{
      required: true, message: '请输入下班时间', trigger: 'submit', type: 'object',
    }],
  },
  cycle:{
    rules: [{
      required: true, message: '请输入里程周期', trigger: 'submit', type: 'array',
    }],
  }
};
