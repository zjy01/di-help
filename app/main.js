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
  const datas =  new Array(30).fill({
    car: '快车',
    time: '01-06 18:27 周六',
    city: '广州市',
    start: '凤池农贸市场西侧',
    end: '微八连锁酒店(西朗地铁站店)',
    duration: '6.2',
    money: '24.59'
  });
  printPDF(datas);
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
