const { ipcRenderer, contextBridge, shell } = require('electron')
const Store = require("./Store")

contextBridge.exposeInMainWorld("require", require)
contextBridge.exposeInMainWorld('openExternal', shell.openExternal)

document.addEventListener('DOMContentLoaded', () => {
    contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer)
    contextBridge.exposeInMainWorld('Store', Store)
})