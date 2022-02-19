const express = require('express');
const bodyParser = require('body-parser');
const { app, ipcMain, Notification} = require('electron');
const GuiSession = require('./guiSession');
const Actions = require('./actions');
const Window = require('./window');
const Storage = require("./storage");
const web = express()
const port = 8754

const storage = new Storage();
let modem = new GuiSession(storage.getData('modem-config')?.modemIp || '192.168.0.1');

ipcMain.on('modemConfigSaveSettings', (event, config) => {
    if (config?.modemIp) {
       modem = new GuiSession(config.modemIp);
    }
});

web.use(bodyParser.json());
web.use(bodyParser.urlencoded({ extended: true }));

web.use(express.static(__dirname + '/web'));

web.get('/goform/goform_get_cmd_process', async (req, res, next) => {
    res.json(await modem.get(req.query));
})

web.post('/goform/goform_set_cmd_process', async (req, res, next) => {
    if (req.body?.goformId === 'LOGIN') {
        res.json(await modem.login(req.body));
    } else {
        res.json(await modem.set(req.body));
    }
})

web.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.on('ready', () => {
    const mainWindow = new Window(port);
    const actions = new Actions();
    actions.init(mainWindow);
});
app.on('window-all-closed', () => {
    app.quit();
});

