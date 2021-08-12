const { ipcRenderer, contextBridge } = require('electron')
const api = require("./api")

document.addEventListener('DOMContentLoaded', () => {
    contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer)
    contextBridge.exposeInMainWorld('api', api)
})