const { BrowserWindow, Menu } = require('electron');
const menu = require('./menu');

const defaultProps = {
    with: 1224,
    height: 700,
    webPreferences: {
        nodeIntegration: true,
        devTools: true,
        contextIsolation: false,
        enableRemoteModule: true,
    },
}



class Window extends BrowserWindow {
    constructor({...windowSettings}) {
        super({ ...defaultProps, ...windowSettings});


        this.loadFile('./pages/index/index.html');

        // this.webContents.openDevTools();

        Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
    }

    goToHome() {
        this.loadFile('./pages/index/index.html');
    }
}

module.exports = Window;