const {
  BrowserWindow,
  dialog,
  Notification
} = require('electron');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

const timeToMonent = (time) => {
  return moment(time, 'MM-DD HH:mm');
}

const timeToDate = (time) => {
  return timeToMonent(time).format('YYYY-MM-DD')
}

module.exports = function printPDF(datas, info){
  const pages = [];
  datas = datas.sort((a,b) => {
    return timeToMonent(a.time).isAfter(timeToMonent(b.time));
  })
  pages.push(datas.slice(0,12));
  let items = [];
  datas.slice(12).forEach((item, index) => {
    if(index % 16 === 0){
      items = [];
      pages.push(items);
    }
    items.push(item);
  });
  const duration = `${timeToDate(datas[0].time)} 至 ${timeToDate(datas[datas.length - 1].time)}`;
  const money = datas.reduce((acc, item) => {
    return acc + Number(item.money);
  }, 0)
  
  ejs.renderFile(path.join(__dirname, '../template/ejs/index.ejs'), {
        data: pages,
        length: datas.length,
        duration,
        money: money.toFixed(2),
        submitDate: info.time,
        phone: info.phone
      }, {}, function (err, str) {
      // str => 输出绘制后的 HTML 字符串
      const blob = new Blob([str], {type : 'text/html'});
      const htmlPath = URL.createObjectURL(blob);
      // fs.writeFileSync(htmlPath, str, 'utf-8');
      const printWindow = new BrowserWindow({show: false});
      //pdfUrl是网络PDF文件的地址
      printWindow.loadFile(htmlPath);
      printWindow.webContents.on('did-finish-load', () => {
        printWindow.webContents.printToPDF({
            pageSize: 'A4',
            landscape: true
          }, (err, data) => {
            if(err){
              console.log('==err==',err)
            } else {
              dialog.showSaveDialog({
                  defaultPath: '滴滴出行行程报销单.pdf'
                }, (filename) => {
                  fs.writeFileSync(filename, data);
                  const n = new Notification({
                    title: '文件导出成功',
                    body: '文件导出成功'
                  });
                  n.show();
              })
            }
        });
      });
  });
}