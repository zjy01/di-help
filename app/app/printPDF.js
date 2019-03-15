const { BrowserWindow } = require('electron');
const ejs = require('ejs');
const fs = require('fs');

module.exports = function printPDF(datas){
  const pages = [];
  pages.push(datas.slice(0,12));
  let items = [];
  datas.slice(12).forEach((item, index) => {
    if(index % 16 === 0){
      items = [];
      pages.push(items);
    }
    items.push(item);
  })
  ejs.renderFile('./template/ejs/index.ejs', {data: pages}, {}, function(err, str){
      // str => 输出绘制后的 HTML 字符串
      const htmlPath = './template/dist/index.html'
      fs.writeFileSync(htmlPath, str, 'utf-8');
      const printWindow = new BrowserWindow({show: true});
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
              fs.writeFileSync('./1.pdf', data)
            }
        });
      });
  });
}