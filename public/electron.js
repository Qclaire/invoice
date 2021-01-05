const { app, Menu, BrowserWindow, ipcMain, screen, Notification } = require('electron');
// Module to control application life.
// Module to create native browser window.


const path = require('path');
const isDev = require('electron-is-dev');
const url = require('url');

function showNotification(title, body) {
    const notification = new Notification(title, body);
    notification.show();

}
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.

    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    mainWindow = new BrowserWindow({
        width,
        height,
        center: true,
        webPreferences: {
            devTools: false,
        },
        maximizable: false,
        resizable: false
    });


    // and load the index.html of the app.
    // mainWindow.loadURL(
    //     isDev ?
    //         'http://localhost:3000'
    //         :
    //         `file://${path.join(__dirname, '../build/index.html')}`
    // );

    mainWindow.loadURL(
        isDev ?
            'http://localhost:3000'
            :
            url.format({
                pathname: `${__dirname}/../build/index.html`,
                protocol: 'file:',
                slashes: true
            }));



    Menu.setApplicationMenu(null);

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});



// ipcMain.on('fetch-histories', () => {
//     // fetch historys
//     showNotification('Fetch History, got it!', 'I will fetch it.')
// })