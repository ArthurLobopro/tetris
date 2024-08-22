import path from "node:path";
import { BrowserWindow, app, ipcMain } from "electron";
import { updateElectronApp } from "update-electron-app";

import "electron-css-injector/main";
import "../storage/Store";

updateElectronApp();

// Faz com que o programa não inicie várias vezes durante a instalação
if (require("electron-squirrel-startup")) {
    app.quit();
}

const appPath = app.getAppPath();

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        icon: path.resolve(appPath, "assets", "icon.png"),
        webPreferences: {
            nodeIntegration: true,
            preload: path.resolve(__dirname, "preload.js"),
        },
    });

    mainWindow.loadFile(path.resolve(appPath, "public", "index.html"));
};

const isUnicWindow = app.requestSingleInstanceLock(); //Verifica se o app já foi iniciado

if (!isUnicWindow) {
    app.quit(); // Caso o app já tiver sido aberto ele é fechado
} else {
    app.whenReady().then(createWindow);
}

app.on("second-instance", () => {
    const win = BrowserWindow.getAllWindows()[0];
    if (win.isMinimized()) win.restore();
    win.center();
    win.focus();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on("close", () => {
    const win = BrowserWindow.getFocusedWindow() as BrowserWindow;
    win.close();
});

ipcMain.on("app-version", (event) => {
    event.returnValue = app.getVersion();
});
