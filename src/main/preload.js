const { ipcRenderer, contextBridge } = require('electron')
const Store = require("./Store")

contextBridge.exposeInMainWorld("require", require)

document.addEventListener('DOMContentLoaded', () => {
    contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer)
    contextBridge.exposeInMainWorld('Store', Store)
})