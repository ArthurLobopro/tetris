const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
require('./Store')

require('update-electron-app')()

// Faz com que o programa não inicie várias vezes durante a instalação
if (require('electron-squirrel-startup')) {
    app.quit()
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        icon: path.resolve(app.getAppPath(), 'assets', 'icon.png'),
        webPreferences: {
            nodeIntegration: true,
            preload: path.resolve(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile(path.resolve(app.getAppPath(), 'public', 'index.html'))
}

const isUnicWindow = app.requestSingleInstanceLock() //Verifica se o app já foi iniciado

if (!isUnicWindow) {
    app.quit() // Caso o app já tiver sido aberto ele é fechado
} else {
    app.whenReady().then(createWindow)
}

app.on('second-instance', () => {
    const win = BrowserWindow.getAllWindows()[0]
    if (win.isMinimized()) win.restore()
    win.center()
    win.focus()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('close', () => {
    const win = BrowserWindow.getFocusedWindow()
    win.close()
})

ipcMain.on('app-version', event => {
    event.returnValue = app.getVersion()
})