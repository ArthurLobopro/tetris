const { ipcRenderer, contextBridge, shell } = require('electron')
const Store = require("./Store")

contextBridge.exposeInMainWorld("require", require)
contextBridge.exposeInMainWorld('openExternal', shell.openExternal)
contextBridge.exposeInMainWorld('Store', Store)
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer)

const NunitoFont = require("@electron-fonts/nunito")
const PressStart2PFont = require("@electron-fonts/press-start-2p")

window.addEventListener("DOMContentLoaded", () => {
    NunitoFont.inject()
    PressStart2PFont.inject()
})