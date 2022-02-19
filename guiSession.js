const axios = require('axios');
const querystring = require('querystring');

class GuiSession {
    constructor(modemIp) {
        this._stok = '';
        this._modem_ip = modemIp;
        this._url_prefix = "http://";
        this._referer = "/index.html";
        this._url_set = "/goform/goform_set_cmd_process";
        this._url_get = "/goform/goform_get_cmd_process";
    }

    login(params) {
        const getParams = new URLSearchParams(querystring.stringify(params));
        return axios.post(`${this._url_prefix}${this._modem_ip}${this._url_set}`, getParams, {
            headers: {
                'Cookie': `stok="${this._stok}"`,
                'Referer': `${this._url_prefix}${this._modem_ip}${this._referer}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => {
                if (res.request.res.headers['set-cookie']) {
                    const cookies = res.request.res.headers['set-cookie'][0].split(';')
                        .map(v => v.split('='))
                        .reduce((acc, v) => {
                            acc[v[0]] = v[1] ? v[1].replace('"',''): null
                            return acc;
                        }, {});
                    if (cookies.stok) {
                        this._stok = cookies.stok;
                    }
                }
                return res.data;
            })
            .catch(err => {
                return {
                    error: err.message
                }
            });
    }

    get(params) {
        const getParams = new URLSearchParams(querystring.stringify(params));
        return axios.get(`${this._url_prefix}${this._modem_ip}${this._url_get}?${getParams}`, {
            headers: {
                'Cookie': `stok="${this._stok}"`,
                'Referer': `${this._url_prefix}${this._modem_ip}${this._referer}`,
            },
        })
            .then(res => res.data)
            .catch(err => {
                return {
                    error: err.message
                }
            });
    }

    set(params) {
        const getParams = new URLSearchParams(querystring.stringify(params));
        return axios.post(`${this._url_prefix}${this._modem_ip}${this._url_set}`, getParams, {
            headers: {
                'Cookie': `stok="${this._stok}"`,
                'Referer': `${this._url_prefix}${this._modem_ip}${this._referer}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => res.data)
            .catch(err => {
                return {
                    error: err.message
                }
            });
    }
}

module.exports = GuiSession;
