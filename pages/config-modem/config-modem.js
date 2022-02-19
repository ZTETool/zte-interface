const { ipcRenderer } = require('electron')
window.$ = window.jQuery = require('jquery');

ipcRenderer.on('modemConfigGetSettingsData', (event, settings) => {
    $('#modemIp').val(settings?.modemIp || '')
});
ipcRenderer.send('modemConfigGetSettings');


function saveSettings(event) {
    console.log('save Settings');
    ipcRenderer.send('modemConfigSaveSettings', {
        modemIp:  $('#modemIp').val(),
    });
}
