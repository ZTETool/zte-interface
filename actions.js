const { ipcMain, Notification} = require('electron')
const Storage = require('./storage');

class Actions {
    constructor() {
        this.window = null;
        this.session = null;
        this.forms = null;
        this.storage = new Storage();
    }

    init(window) {
        this.window = window;
        ipcMain.on('modemConfigSaveSettings', this.modemConfigSaveSettings.bind(this));
        ipcMain.on('modemConfigGetSettings', this.modemConfigGetSettings.bind(this));
    }

    modemConfigGetSettings(event) {
        this.window.send('modemConfigGetSettingsData', this.storage.getData('modem-config'));
    }

    modemConfigSaveSettings(event, config) {
        if (config?.modemIp) {
            this.storage.setData('modem-config', config);
            new Notification({ title: 'Modem Config', body: 'Save successful' }).show()
            this.window.goToHome();
        } else {
            new Notification({ title: 'Modem Config', body: 'Save failed' }).show()
        }
    }
}

module.exports = Actions;