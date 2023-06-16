import { contextBridge, ipcRenderer, shell } from 'electron'
import Store from "../storage/Store"

contextBridge.exposeInMainWorld("require", require)
contextBridge.exposeInMainWorld('openExternal', shell.openExternal)
contextBridge.exposeInMainWorld('Store', Store)
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer)

import NunitoFont from "@electron-fonts/nunito"
import PressStart2PFont from "@electron-fonts/press-start-2p"

window.addEventListener("DOMContentLoaded", () => {
    NunitoFont.inject()
    PressStart2PFont.inject()

    require("../render/Game")
})