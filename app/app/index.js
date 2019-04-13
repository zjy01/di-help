// Modules to control application life and create native browser window
const { BrowserWindow } = require('electron');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

function createWindow () {
  // Create the browser window.
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  console.log(process.env.NODE_ENV)
  // and load the index.html of the app.
  // if(process.env.NODE_ENV === 'development'){
  //   mainWindow.loadURL('http://localhost:3000')
  // } else {
  //   mainWindow.loadFile('index.html')
  // }
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  return mainWindow;
}

module.exports = createWindow;
