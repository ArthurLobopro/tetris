const { ipcRenderer, contextBridge } = require('electron')
const Store = require("./Store")

document.addEventListener('DOMContentLoaded', () => {
    contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer)
    contextBridge.exposeInMainWorld('api', Store)
})