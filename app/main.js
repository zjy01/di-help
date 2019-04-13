// Modules to control application life and create native browser window
const { app,ipcMain } = require('electron');


const createWindow = require('./app/index');
const printPDF = require('./app/printPDF');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('print', function () {
  const datas = [{
    car: '快车',
    time: '04-07 15:17 周日',
    city: '深圳市',
    start: '兰兹酒店(深圳大学桃园店)',
    end: '深圳宝安国际机场T3航站楼国内...',
    duration: '22.3',
    money: '65.96'
  }, {
    car: '快车',
      time: '04-12 13:38 周五',
    city: '重庆市',
      start: '渝富大厦-公交站',
      end: '颐和幸福酒店(财富中心店)',
      duration: '1.3',
      money: '9.24'
  }];
  printPDF(datas);
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
