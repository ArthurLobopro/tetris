const { ipcRenderer, contextBridge, shell } = require('electron')
const Store = require("./Store")

contextBridge.exposeInMainWorld("require", require)
contextBridge.exposeInMainWorld('openExternal', shell.openExternal)
contextBridge.exposeInMainWorld('Store', Store)
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer)