module.exports = [{
    label: 'Info',
    click(menuItem, browserWindow, event) {
        browserWindow.loadFile('./pages/index/index.html');
    }
},{
    label: 'Config',
    click(menuItem, browserWindow, event) {
        browserWindow.loadFile('./pages/config-modem/config-modem.html');
    }
}];