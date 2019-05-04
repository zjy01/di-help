const path = require('path');
const url = require('url')
// Modules to control application life and create native browser window
const { BrowserWindow } = require('electron');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

function createWindow () {
  // Create the browser window.
  let mainWindow = new BrowserWindow({
    simpleFullscreen:true,
      webPreferences: {
        javascript: true,
        plugins: true,
        nodeIntegration: false, // 不集成 Nodejs
        webSecurity: false,
        preload: path.join(__dirname, '../public/renderer.js') // 但预加载的 js 文件内仍可以使用 Nodejs 的 API
      }
  })

  console.log(process.env.NODE_ENV)
  // and load the index.html of the app.
  if(process.env.NODE_ENV === 'development'){
    mainWindow.loadURL('http://localhost:3000')
  } else {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../build/index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }
  // mainWindow.loadFile('index.html')

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
