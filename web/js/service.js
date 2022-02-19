define(["underscore", "jquery", "config/config"], function (_, $, config) {
    function syncRequest(e, t) {
        return ajaxRequest(e, null, null, !1, t)
    }

    function asyncRequest(e, t, n, r) {
        ajaxRequest(e, t, n, !0, r)
    }

    function ajaxRequest(e, t, n, r, i) {
        var o = null;
        if (config.ACCESSIBLE_ID_SUPPORT && i && "LOGIN" != e.goformId && "SET_WEB_LANGUAGE" != e.goformId) {
            var s = hex_md5(rd0 + rd1),
                _ = getParams({
                    nv: "RD"
                }).RD,
                a = hex_md5(s + _);
            e.AD = a
        }
        return e.isTest ? (o = simulate.simulateRequest(e, t, n, r, i), r ? void setTimeout(function () {
            t(o)
        }, getRandomInt(120) + 50) : o) : ($.ajax({
            type: i ? "POST" : "GET",
            url: i ? "/goform/goform_set_cmd_process" : e.cmd ? "/goform/goform_get_cmd_process" : "/goform/goform_set_cmd_process",
            data: e,
            dataType: "json",
            async: !!r,
            cache: !1,
            error: function (e) {
                r ? n(e) : 200 == e.status && (o = jQuery.parseJSON("(" + e.responseText + ")"))
            },
            success: function (e) {
                r ? t(e) : o = e
            }
        }), r ? void 0 : o)
    }

    function doStuff(e, t, n, r, i, o) {
        function s(e, t, n) {
            if (n = n || t, isErrorObject(e)) switch (e.errorType) {
                case "cellularNetworkError":
                case "deviceError":
                case "wifiConnectionError":
                    wifiCallbackDestination.receivedNonSpecificError(e);
                    break;
                default:
                    n(e)
            } else t(e)
        }
        var _, a = e[0],
            u = e[1],
            c = e[2];
        if (t && "string" == typeof t.errorType) {
            if (_ = $.extend(unknownErrorObject, t), !u) return _;
            s(_, u, c)
        } else {
            _ = $.extend({}, t);
            var d;
            if (d = n ? n(a, o) : a, !u) {
                if (d && (d.cmd || d.goformId)) {
                    var l = syncRequest(d, o);
                    _ = r ? $.extend({}, r(l)) : l
                }
                return _
            }
            d && (d.cmd || d.goformId) ? asyncRequest(d, function (e) {
                _ = r ? $.extend({}, r(e)) : $.extend({}, e), d.notCallback || s(_, u, c)
            }, function () {
                _ = i ? $.extend(unknownErrorObject, i) : $.extend(unknownErrorObject, {
                    errorType: "Unknown"
                }), s(_, u, c)
            }, o) : s(_, u, c)
        }
    }

    function getWifiBasic() {
        function e(e, t) {
            var n = {};
            n.isTest = isTest;
            var r = config.PASSWORD_ENCODE ? "WPAPSK1_encode,m_WPAPSK1_encode," : "WPAPSK1,m_WPAPSK1,";
            return n.cmd = "m_ssid_enable,RadioOff,NoForwarding,m_NoForwarding," + r + "wifi_attr_max_station_number,SSID1,AuthMode,HideSSID,MAX_Access_num,EncrypType,m_SSID,m_AuthMode,m_HideSSID,m_MAX_Access_num,m_EncrypType,wifi_ap_mode_set,m_band_enable,wifi_sta_switch_onoff,wifi_band,wifi_syncparas_flag", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                return {
                    wifi_ap_mode_set: e.wifi_ap_mode_set,
                    wifi_enable: e.RadioOff,
                    multi_ssid_enable: e.m_ssid_enable,
                    MAX_Station_num: $.isNumeric(e.wifi_attr_max_station_number) ? e.wifi_attr_max_station_number : config.MAX_STATION_NUMBER,
                    AuthMode: e.AuthMode,
                    SSID: e.SSID1,
                    broadcast: e.HideSSID,
                    apIsolation: e.NoForwarding,
                    passPhrase: config.PASSWORD_ENCODE ? Base64.decode(e.WPAPSK1_encode) : e.WPAPSK1,
                    MAX_Access_num: e.MAX_Access_num,
                    cipher: "TKIP" == e.EncrypType ? "0" : "AES" == e.EncrypType ? 1 : 2,
                    m_SSID: e.m_SSID,
                    m_broadcast: e.m_HideSSID,
                    m_apIsolation: e.m_NoForwarding,
                    m_MAX_Access_num: e.m_MAX_Access_num,
                    m_AuthMode: e.m_AuthMode,
                    m_passPhrase: config.PASSWORD_ENCODE ? Base64.decode(e.m_WPAPSK1_encode) : e.m_WPAPSK1,
                    m_cipher: "TKIP" == e.m_EncrypType ? "0" : "AES" == e.m_EncrypType ? 1 : 2,
                    m_band_enable: e.m_band_enable,
                    wifi_sta_switch_onoff: e.wifi_sta_switch_onoff,
                    wifiband: e.wifi_band,
                    wifi_syncparas_flag: e.wifi_syncparas_flag
                }
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setWifiBasicSync() {
        function e(e) {
            var t = {
                goformId: "SET_WIFI_SSID1_SSID2_SETTINGS",
                isTest: isTest,
                ssid: e.SSID,
                broadcastSsidEnabled: e.broadcast,
                MAX_Access_num: e.station,
                security_mode: e.AuthMode,
                cipher: e.cipher,
                NoForwarding: e.NoForwarding,
                m_SSID: e.m_SSID,
                m_HideSSID: e.m_broadcast,
                m_MAX_Access_num: e.m_station,
                m_AuthMode: e.m_AuthMode,
                cipher: e.m_cipher,
                m_NoForwarding: e.m_NoForwarding,
                wifi_syncparas_flag: e.wifi_syncparas_flag
            };
            return "WPAPSKWPA2PSK" == e.AuthMode || "WPA2PSK" == e.AuthMode ? (t.security_shared_mode = e.cipher, t.passphrase = config.PASSWORD_ENCODE ? Base64.encode(e.passPhrase) : e.passPhrase) : t.security_shared_mode = "NONE", "WPAPSKWPA2PSK" == e.m_AuthMode || "WPA2PSK" == e.m_AuthMode ? (t.m_EncrypType = e.m_cipher, t.m_WPAPSK1 = config.PASSWORD_ENCODE ? Base64.encode(e.m_passPhrase) : e.m_passPhrase) : t.m_EncrypType = "NONE", t
        }

        function t(e) {
            return e || unknownErrorObject
        }
        doStuffAndCheckServerIsOnline(arguments, e, t)
    }

    function setWifiBasic() {
        function e(e) {
            var t = {
                goformId: "SET_WIFI_SSID1_SETTINGS",
                isTest: isTest,
                ssid: e.SSID,
                broadcastSsidEnabled: e.broadcast,
                MAX_Access_num: e.station,
                security_mode: e.AuthMode,
                cipher: e.cipher,
                NoForwarding: e.NoForwarding
            };
            return "WPAPSKWPA2PSK" == e.AuthMode || "WPA2PSK" == e.AuthMode ? (t.security_shared_mode = e.cipher, t.passphrase = config.PASSWORD_ENCODE ? Base64.encode(e.passPhrase) : e.passPhrase) : t.security_shared_mode = "NONE", t
        }

        function t(e) {
            return e || unknownErrorObject
        }
        doStuffAndCheckServerIsOnline(arguments, e, t)
    }

    function setWifiBasic4SSID2() {
        function e(e) {
            var t = {
                goformId: "SET_WIFI_SSID2_SETTINGS",
                isTest: isTest,
                m_SSID: e.m_SSID,
                m_HideSSID: e.m_broadcast,
                m_MAX_Access_num: e.m_station,
                m_AuthMode: e.m_AuthMode,
                cipher: e.m_cipher,
                m_NoForwarding: e.m_NoForwarding
            };
            return "WPAPSKWPA2PSK" == e.m_AuthMode || "WPA2PSK" == e.m_AuthMode ? (t.m_EncrypType = e.m_cipher, t.m_WPAPSK1 = config.PASSWORD_ENCODE ? Base64.encode(e.m_passPhrase) : e.m_passPhrase) : t.m_EncrypType = "NONE", t
        }

        function t(e) {
            return e || unknownErrorObject
        }
        doStuffAndCheckServerIsOnline(arguments, e, t)
    }

    function setSkipSetting() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "CHANGE_DEFAULT_WIFI_OR_PASSWORD_REMIND", n.password_remind = "0", n.web_wifi_password_remind = "0", n
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setWifiAdvanceGuest() {
        function e(e) {
            var t = {
                goformId: "SET_M_WIFI_INFO",
                isTest: isTest,
                m_WirelessMode: e.m_WirelessMode,
                m_CountryCode: e.m_CountryCode
            };
            return config.WIFI_BAND_SUPPORT && (t.m_wifi_band = e.m_wifi_band), t.m_Channel = e.m_Channel, config.WIFI_BANDWIDTH_SUPPORT && (t.m_wifi_11n_cap = e.m_wifi_11n_cap), t
        }

        function t(e) {
            return e || unknownErrorObject
        }
        doStuffAndCheckServerIsOnline(arguments, e, t)
    }

    function setWifiFrequency() {
        function e(e) {
            return {
                goformId: "SET_WIFI_AP_MODE",
                isTest: isTest,
                wifi_ap_mode_set: e.wifi_ap_mode_set
            }
        }

        function t(e) {
            return e || unknownErrorObject
        }
        doStuffAndCheckServerIsOnline(arguments, e, t)
    }

    function setWifiBasicMultiSSIDSwitch() {
        function e(e) {
            var t = e;
            return "0" == e.wifiEnabled && (t = {
                wifiEnabled: e.wifiEnabled
            }), $.extend({
                goformId: "SET_WIFI_INFO",
                isTest: isTest
            }, t)
        }

        function t(e) {
            return e || unknownErrorObject
        }
        doStuffAndCheckServerIsOnline(arguments, e, t)
    }

    function getSecurityInfo() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "AuthMode,passPhrase", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.AuthMode = e.AuthMode, t.passPhrase = config.PASSWORD_ENCODE ? Base64.decode(e.passPhrase) : e.passPhrase, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setSecurityInfo() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "SET_WIFI_SECURITY_INFO", n.AuthMode = e.AuthMode, "WPAPSKWPA2PSK" == n.AuthMode && (n.passPhrase = config.PASSWORD_ENCODE ? Base64.encode(e.passPhrase) : e.passPhrase), n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getCurrentlyAttachedDevicesInfo() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "station_list"
            }
        }

        function t(e) {
            for (var t = [], n = e.station_list, r = 0; n && r < n.length; r++) {
                var i = {};
                i.macAddress = n[r].mac_addr;
                var o = n[r].hostname;
                i.hostName = "" == o ? $.i18n.prop("unknown") : o, i.ipAddress = n[r].ip_addr, i.ssid_index = n[r].ssid_index, t.push(i)
            }
            return {
                attachedDevices: t
            }
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getAttachedCableDevices() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "lan_station_list"
            }
        }

        function t(e) {
            for (var t = [], n = e.lan_station_list || e.station_list, r = 0; n && r < n.length; r++) {
                var i = {};
                i.macAddress = n[r].mac_addr;
                var o = n[r].hostname;
                i.hostName = "" == o ? $.i18n.prop("unknown") : o, i.ipAddress = n[r].ip_addr, t.push(i)
            }
            return {
                attachedDevices: t
            }
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getLanguage() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "Language,cr_version,wa_inner_version", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.Language = e && e.Language ? e.Language : "en", t.rd_params0 = e.wa_inner_version, t.rd_params1 = e.cr_version, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setLanguage() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "SET_WEB_LANGUAGE", n.Language = e.Language, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getNetSelectInfo() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "current_network_mode,m_netselect_save,net_select_mode,m_netselect_contents,net_select,ppp_status,modem_main_state", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.current_network_mode = e.current_network_mode, t.net_select_mode = e.net_select_mode, t.m_netselect_save = e.m_netselect_save, t.m_netselect_contents = e.m_netselect_contents, t.net_select = e.net_select, t.ppp_status = e.ppp_status, t.modem_main_state = e.modem_main_state, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setBearerPreference() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "SET_BEARER_PREFERENCE", n.BearerPreference = e.strBearerPreference, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function scanForNetwork(e) {
        function t() {
            $.getJSON("/goform/goform_get_cmd_process", {
                cmd: "m_netselect_status",
                _: (new Date).getTime()
            }, function (r) {
                "manual_selecting" == r.m_netselect_status ? setTimeout(t, 1e3) : $.getJSON("/goform/goform_get_cmd_process", {
                    cmd: "m_netselect_contents",
                    _: (new Date).getTime()
                }, function (t) {
                    "" != trim(t.m_netselect_contents) ? n(t.m_netselect_contents) : e(!1, [])
                }).error(function () {
                    e(!1, [])
                })
            }).error(function () {
                e(!1, [])
            })
        }

        function n(t) {
            for (var n, r = /([^,;]*),([^,]*),([^,]*),([^,;]*)/g, i = []; n = r.exec(t);) null != n && i.push({
                strShortName: n[2].replace(/\"/g, ""),
                strNumeric: n[3].replace(/\D/g, ""),
                nRat: parseInt(n[4], 10),
                nState: parseInt(n[1], 10)
            });
            e(!0, i)
        }
        if (isTest) return void setTimeout(function () {
            n(simulate.m_netselect_contents)
        }, 500);
        var r = {};
        if (r.goformId = "SCAN_NETWORK", config.ACCESSIBLE_ID_SUPPORT) {
            var i = hex_md5(rd0 + rd1),
                o = getParams({
                    nv: "RD"
                }).RD,
                s = hex_md5(i + o);
            r.AD = s
        }
        $.post("/goform/goform_set_cmd_process", r, function (n) {
            "success" == n.result ? t() : e(!1, [])
        }, "json").error(function () {
            e(!1, [])
        })
    }

    function getStatusInfo() {
        if (void 0 === timerInfo.isLoggedIn) {
            var e = getLoginStatus();
            return {
                networkType: timerInfo.networkType,
                signalImg: timerInfo.signalImg,
                networkOperator: timerInfo.networkOperator,
                spn_b1_flag: timerInfo.spn_b1_flag,
                spn_name_data: timerInfo.spn_name_data,
                spn_b2_flag: timerInfo.spn_b2_flag,
                connectStatus: timerInfo.connectStatus,
                attachedDevices: timerInfo.curr_connected_devices,
                roamingStatus: timerInfo.roamingStatus,
                wifiStatus: timerInfo.wifiStatus,
                wifiSwitchStatus: timerInfo.wifiSwitchStatus,
                simStatus: timerInfo.simStatus,
                pinStatus: timerInfo.pinStatus,
                batteryStatus: timerInfo.batteryStatus,
                batteryLevel: timerInfo.batteryLevel,
                batteryPers: timerInfo.batteryPers,
                batteryTime: timerInfo.batteryTime,
                ssid: timerInfo.ssid,
                mainSSID5g: timerInfo.mainSSID5g,
                station_num_ssid1: timerInfo.station_num_ssid1,
                station_num_ssid2: timerInfo.station_num_ssid2,
                station_num_guest_ssid1: timerInfo.station_num_guest_ssid1,
                station_num_guest_ssid2: timerInfo.station_num_guest_ssid2,
                authMode: timerInfo.authMode,
                data_counter: timerInfo.data_counter,
                isLoggedIn: "loggedIn" == e.status,
                newSmsReceived: timerInfo.newSmsReceived,
                smsReportReceived: timerInfo.smsReportReceived,
                smsUnreadCount: timerInfo.smsUnreadCount,
                limitVolumeEnable: timerInfo.limitVolumeEnable,
                limitVolumeType: timerInfo.limitVolumeType,
                limitVolumePercent: timerInfo.limitVolumePercent,
                limitVolumeSize: timerInfo.limitVolumeSize,
                limitVolumeSizeSource: timerInfo.limitVolumeSizeSource,
                connectWifiProfile: timerInfo.connectWifiProfile,
                connectWifiSSID: timerInfo.connectWifiSSID,
                connectWifiStatus: timerInfo.connectWifiStatus,
                multi_ssid_enable: timerInfo.multi_ssid_enable,
                roamMode: timerInfo.roamMode,
                opms_wan_mode: timerInfo.opms_wan_mode,
                opms_wan_auto_mode: timerInfo.opms_wan_auto_mode,
                dhcp_wan_status: timerInfo.dhcp_wan_status,
                current_upgrade_state: timerInfo.current_upgrade_state,
                is_mandatory: timerInfo.is_mandatory,
                new_version_state: timerInfo.new_version_state,
                allowRoamingUpdate: timerInfo.allowRoamingUpdate,
                wifi_dfs_status: timerInfo.wifi_dfs_status,
                radio_off: timerInfo.radio_off,
                wifi_5g_enable: timerInfo.wifi_5g_enable,
                battery_value: timerInfo.battery_value,
                ap_station_enable: timerInfo.ap_station_enable,
                ap_station_mode: timerInfo.ap_station_mode,
                dialMode: timerInfo.dialMode,
                isCaStatus: timerInfo.isCaStatus,
                privacy_read_flag: timerInfo.privacy_read_flag,
                ppp_dial_conn_fail_counter: timerInfo.ppp_dial_conn_fail_counter,
                is_night_mode: timerInfo.is_night_mode,
                pppoe_status: timerInfo.pppoe_status,
                dhcp_wan_status: timerInfo.dhcp_wan_status,
                static_wan_status: timerInfo.static_wan_status,
                vpn_conn_status: timerInfo.vpn_conn_status,
                rmcc: timerInfo.rmcc,
                rmnc: timerInfo.rmnc,
                wan_connect_status: timerInfo.wan_connect_status,
                wifi_onoff_wifi5g_by_n79_mutex: timerInfo.wifi_onoff_wifi5g_by_n79_mutex
            }
        }
        return {
            networkType: timerInfo.networkType,
            signalImg: timerInfo.signalImg,
            networkOperator: timerInfo.networkOperator,
            spn_b1_flag: timerInfo.spn_b1_flag,
            spn_name_data: timerInfo.spn_name_data,
            spn_b2_flag: timerInfo.spn_b2_flag,
            connectStatus: timerInfo.connectStatus,
            attachedDevices: timerInfo.curr_connected_devices,
            roamingStatus: timerInfo.roamingStatus,
            wifiStatus: timerInfo.wifiStatus,
            wifiSwitchStatus: timerInfo.wifiSwitchStatus,
            simStatus: timerInfo.simStatus,
            pinStatus: timerInfo.pinStatus,
            batteryStatus: timerInfo.batteryStatus,
            batteryLevel: timerInfo.batteryLevel,
            batteryPers: timerInfo.batteryPers,
            batteryTime: timerInfo.batteryTime,
            ssid: timerInfo.ssid,
            mainSSID5g: timerInfo.mainSSID5g,
            station_num_ssid1: timerInfo.station_num_ssid1,
            station_num_ssid2: timerInfo.station_num_ssid2,
            station_num_guest_ssid1: timerInfo.station_num_guest_ssid1,
            station_num_guest_ssid2: timerInfo.station_num_guest_ssid2,
            authMode: timerInfo.authMode,
            data_counter: timerInfo.data_counter,
            isLoggedIn: timerInfo.isLoggedIn,
            newSmsReceived: timerInfo.newSmsReceived,
            smsReportReceived: timerInfo.smsReportReceived,
            smsUnreadCount: timerInfo.smsUnreadCount,
            limitVolumeEnable: timerInfo.limitVolumeEnable,
            limitVolumeType: timerInfo.limitVolumeType,
            limitVolumePercent: timerInfo.limitVolumePercent,
            limitVolumeSize: timerInfo.limitVolumeSize,
            limitVolumeSizeSource: timerInfo.limitVolumeSizeSource,
            connectWifiProfile: timerInfo.connectWifiProfile,
            connectWifiSSID: timerInfo.connectWifiSSID,
            connectWifiStatus: timerInfo.connectWifiStatus,
            multi_ssid_enable: timerInfo.multi_ssid_enable,
            opms_wan_mode: timerInfo.opms_wan_mode,
            opms_wan_auto_mode: timerInfo.opms_wan_auto_mode,
            dhcp_wan_status: timerInfo.dhcp_wan_status,
            roamMode: timerInfo.roamMode,
            current_upgrade_state: timerInfo.current_upgrade_state,
            is_mandatory: timerInfo.is_mandatory,
            new_version_state: timerInfo.new_version_state,
            allowRoamingUpdate: timerInfo.allowRoamingUpdate,
            wifi_dfs_status: timerInfo.wifi_dfs_status,
            radio_off: timerInfo.radio_off,
            wifi_5g_enable: timerInfo.wifi_5g_enable,
            battery_value: timerInfo.battery_value,
            ap_station_enable: timerInfo.ap_station_enable,
            ap_station_mode: timerInfo.ap_station_mode,
            dialMode: timerInfo.dialMode,
            isCaStatus: timerInfo.isCaStatus,
            privacy_read_flag: timerInfo.privacy_read_flag,
            ppp_dial_conn_fail_counter: timerInfo.ppp_dial_conn_fail_counter,
            is_night_mode: timerInfo.is_night_mode,
            pppoe_status: timerInfo.pppoe_status,
            dhcp_wan_status: timerInfo.dhcp_wan_status,
            static_wan_status: timerInfo.static_wan_status,
            vpn_conn_status: timerInfo.vpn_conn_status,
            rmcc: timerInfo.rmcc,
            rmnc: timerInfo.rmnc,
            wan_connect_status: timerInfo.wan_connect_status,
            wifi_onoff_wifi5g_by_n79_mutex: timerInfo.wifi_onoff_wifi5g_by_n79_mutex
        }
    }

    function getConnectionInfo() {
        var e = "1" == timerInfo.limitVolumeType,
            t = {
                data_counter: timerInfo.data_counter,
                connectStatus: timerInfo.connectStatus,
                limitVolumeEnable: timerInfo.limitVolumeEnable,
                limitVolumeType: timerInfo.limitVolumeType,
                limitVolumePercent: timerInfo.limitVolumePercent,
                networkType: timerInfo.networkType,
                isCaStatus: timerInfo.isCaStatus
            };
        return e ? (t.limitDataMonth = timerInfo.limitVolumeSize, t.limitDataMonthSource = timerInfo.limitVolumeSizeSource, t.limitTimeMonth = 0) : (t.limitTimeMonth = timerInfo.limitVolumeSize, t.limitTimeMonthSource = timerInfo.limitVolumeSizeSource, t.limitDataMonth = 0), t.opms_wan_mode = timerInfo.opms_wan_mode, t.opms_wan_auto_mode = timerInfo.opms_wan_auto_mode, t
    }

    function resetNewSmsReceivedVar() {
        timerInfo.newSmsReceived = !1
    }

    function resetSmsReportReceivedVar() {
        timerInfo.smsReportReceived = !1
    }

    function getSmsCapability() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "sms_capacity_info", n
        }

        function t(e) {
            return {
                nvTotal: parseInt(e.sms_nv_total, 10),
                nvUsed: parseInt(e.sms_nv_rev_total, 10) + parseInt(e.sms_nv_send_total, 10) + parseInt(e.sms_nv_draftbox_total, 10),
                simTotal: parseInt(e.sms_sim_total, 10),
                simUsed: parseInt(e.sms_sim_rev_total, 10) + parseInt(e.sms_sim_send_total, 10) + parseInt(e.sms_sim_draftbox_total, 10),
                nvReceive: parseInt(e.sms_nv_rev_total, 10),
                nvSend: parseInt(e.sms_nv_send_total, 10),
                nvDraft: parseInt(e.sms_nv_draftbox_total, 10),
                simReceive: parseInt(e.sms_sim_rev_total, 10),
                simSend: parseInt(e.sms_sim_send_total, 10),
                simDraft: parseInt(e.sms_sim_draftbox_total, 10)
            }
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function connect() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.notCallback = !0, n.goformId = "CONNECT_NETWORK", n
        }

        function t(e) {
            "success" == e.result ? (i = (new Date).getTime(), addCallback(n)) : r({
                result: !1
            })
        }

        function n(e) {
            "ppp_connecting" == e.ppp_status ? timerInfo.connectStatus = "ppp_connecting" : checkConnectedStatus(e.ppp_status) ? (removeCallback(n), timerInfo.connectStatus = "ppp_connected", r({
                result: !0,
                status: timerInfo.connectStatus
            })) : (new Date).getTime() - i < 1e4 ? timerInfo.connectStatus = "ppp_connecting" : (removeCallback(n), r({
                result: !1
            }))
        }
        var r = arguments[1],
            i = 0;
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function disconnect() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.notCallback = !0, n.goformId = "DISCONNECT_NETWORK", n
        }

        function t(e) {
            "success" == e.result ? (i = (new Date).getTime(), addCallback(n)) : r({
                result: !1
            })
        }

        function n(e) {
            "ppp_disconnecting" == e.ppp_status ? timerInfo.connectStatus = "ppp_disconnecting" : "ppp_disconnected" == e.ppp_status ? (removeCallback(n), timerInfo.connectStatus = "ppp_disconnected", r({
                result: !0,
                status: timerInfo.connectStatus
            })) : (new Date).getTime() - i < 1e4 ? timerInfo.connectStatus = "ppp_disconnecting" : (removeCallback(n), r({
                result: !1
            }))
        }
        var r = arguments[1],
            i = 0;
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getApnSettings() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "apn_interface_version,APN_config0,APN_config1,APN_config2,APN_config3,APN_config4,APN_config5,APN_config6,APN_config7,APN_config8,APN_config9,APN_config10,APN_config11,APN_config12,APN_config13,APN_config14,APN_config15,APN_config16,APN_config17,APN_config18,APN_config19,ipv6_APN_config0,ipv6_APN_config1,ipv6_APN_config2,ipv6_APN_config3,ipv6_APN_config4,ipv6_APN_config5,ipv6_APN_config6,ipv6_APN_config7,ipv6_APN_config8,ipv6_APN_config9,ipv6_APN_config10,ipv6_APN_config11,ipv6_APN_config12,ipv6_APN_config13,ipv6_APN_config14,ipv6_APN_config15,ipv6_APN_config16,ipv6_APN_config17,ipv6_APN_config18,ipv6_APN_config19,m_profile_name,profile_name,wan_dial,apn_select,pdp_type,pdp_select,pdp_addr,index,Current_index,apn_auto_config,ipv6_apn_auto_config,apn_mode,wan_apn,ppp_auth_mode,ppp_username,ppp_passwd,dns_mode,prefer_dns_manual,standby_dns_manual,ipv6_wan_apn,ipv6_pdp_type,ipv6_ppp_auth_mode,ipv6_ppp_username,ipv6_ppp_passwd,ipv6_dns_mode,ipv6_prefer_dns_manual,ipv6_standby_dns_manual,apn_num_preset,wan_apn_ui,profile_name_ui,pdp_type_ui,ppp_auth_mode_ui,ppp_username_ui,ppp_passwd_ui,dns_mode_ui,prefer_dns_manual_ui,standby_dns_manual_ui,ipv6_wan_apn_ui,ipv6_ppp_auth_mode_ui,ipv6_ppp_username_ui,ipv6_ppp_passwd_ui,ipv6_dns_mode_ui,ipv6_prefer_dns_manual_ui,ipv6_standby_dns_manual_ui", n.multi_data = 1, n
        }

        function t(e) {
            return e ? {
                APNs: e.APN_config0 + "||" + e.APN_config1 + "||" + e.APN_config2 + "||" + e.APN_config3 + "||" + e.APN_config4 + "||" + e.APN_config5 + "||" + e.APN_config6 + "||" + e.APN_config7 + "||" + e.APN_config8 + "||" + e.APN_config9 + "||" + e.APN_config10 + "||" + e.APN_config11 + "||" + e.APN_config12 + "||" + e.APN_config13 + "||" + e.APN_config14 + "||" + e.APN_config15 + "||" + e.APN_config16 + "||" + e.APN_config17 + "||" + e.APN_config18 + "||" + e.APN_config19,
                ipv6APNs: e.ipv6_APN_config0 + "||" + e.ipv6_APN_config1 + "||" + e.ipv6_APN_config2 + "||" + e.ipv6_APN_config3 + "||" + e.ipv6_APN_config4 + "||" + e.ipv6_APN_config5 + "||" + e.ipv6_APN_config6 + "||" + e.ipv6_APN_config7 + "||" + e.ipv6_APN_config8 + "||" + e.ipv6_APN_config9 + "||" + e.ipv6_APN_config10 + "||" + e.ipv6_APN_config11 + "||" + e.ipv6_APN_config12 + "||" + e.ipv6_APN_config13 + "||" + e.ipv6_APN_config14 + "||" + e.ipv6_APN_config15 + "||" + e.ipv6_APN_config16 + "||" + e.ipv6_APN_config17 + "||" + e.ipv6_APN_config18 + "||" + e.ipv6_APN_config19,
                apnMode: e.apn_mode,
                profileName: e.apn_interface_version >= 2 ? e.profile_name_ui : e.m_profile_name || e.profile_name,
                wanDial: e.wan_dial,
                apnSelect: e.apn_select,
                pdpType: e.apn_interface_version >= 2 ? e.pdp_type_ui : e.pdp_type,
                pdpSelect: e.pdp_select,
                pdpAddr: e.pdp_addr,
                index: e.index,
                currIndex: e.Current_index,
                autoApns: e.apn_auto_config,
                autoApnsV6: e.ipv6_apn_auto_config,
                wanApn: e.apn_interface_version >= 2 ? e.wan_apn_ui : e.wan_apn,
                authMode: e.apn_interface_version >= 2 ? e.ppp_auth_mode_ui.toLowerCase() : e.ppp_auth_mode.toLowerCase(),
                username: e.apn_interface_version >= 2 ? e.ppp_username_ui : e.ppp_username,
                password: e.apn_interface_version >= 2 ? e.ppp_passwd_ui : e.ppp_passwd,
                dnsMode: e.apn_interface_version >= 2 ? e.dns_mode_ui : e.dns_mode,
                dns1: e.apn_interface_version >= 2 ? e.prefer_dns_manual_ui : e.prefer_dns_manual,
                dns2: e.apn_interface_version >= 2 ? e.standby_dns_manual_ui : e.standby_dns_manual,
                wanApnV6: e.apn_interface_version >= 2 ? e.ipv6_wan_apn_ui : e.ipv6_wan_apn,
                authModeV6: e.apn_interface_version >= 2 ? e.ipv6_ppp_auth_mode_ui.toLowerCase() : e.ipv6_ppp_auth_mode.toLowerCase(),
                usernameV6: e.apn_interface_version >= 2 ? e.ipv6_ppp_username_ui : e.ipv6_ppp_username,
                passwordV6: e.apn_interface_version >= 2 ? e.ipv6_ppp_passwd_ui : e.ipv6_ppp_passwd,
                dnsModeV6: e.apn_interface_version >= 2 ? e.ipv6_dns_mode_ui : e.ipv6_dns_mode,
                dns1V6: e.apn_interface_version >= 2 ? e.ipv6_prefer_dns_manual_ui : e.ipv6_prefer_dns_manual,
                dns2V6: e.apn_interface_version >= 2 ? e.ipv6_standby_dns_manual_ui : e.ipv6_standby_dns_manual,
                apnNumPreset: e.apn_num_preset
            } : {
                result: !1
            }
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function deleteApn() {
        function e(e, t) {
            var n = {
                isTest: isTest,
                apn_action: "delete",
                apn_mode: "manual",
                index: e.index
            };
            return config.USE_IPV6_INTERFACE ? n.goformId = "APN_PROC_EX" : n.goformId = "APN_PROC", n
        }

        function t(e) {
            return "success" == e.result ? {
                result: !0
            } : {
                result: !1
            }
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setDefaultApn() {
        function e(e, t) {
            if (config.USE_IPV6_INTERFACE) {
                var n = {
                    isTest: isTest,
                    goformId: "APN_PROC_EX",
                    apn_mode: e.apnMode
                };
                return "manual" == e.apnMode && (n.apn_action = "set_default", n.set_default_flag = "1", n.pdp_type = e.pdpType, n.index = e.index), n
            }
            return {
                isTest: isTest,
                goformId: "APN_PROC",
                apn_action: "set_default",
                index: e.index,
                apn_mode: e.apnMode,
                profile_name: e.profileName,
                wan_apn: e.wanApn,
                dns_mode: e.dnsMode,
                prefer_dns_manual: e.dns1,
                w_standby_dns_manual: e.dns2,
                ppp_username: e.username,
                ppp_passwd: e.password,
                ppp_auth_mode: e.authMode,
                apn_select: "manual",
                wan_dial: "*99#",
                pdp_type: "PPP",
                pdp_select: "auto",
                pdp_addr: "",
                set_default_flag: "1"
            }
        }

        function t(e) {
            return "success" == e.result ? {
                result: !0
            } : {
                result: !1
            }
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function addOrEditApn() {
        function e(e, t) {
            if (config.USE_IPV6_INTERFACE) {
                var n = {
                    isTest: isTest,
                    goformId: "APN_PROC_EX",
                    apn_action: "save",
                    apn_mode: "manual",
                    profile_name: e.profileName,
                    wan_dial: "*99#",
                    apn_select: "manual",
                    pdp_type: e.pdpType,
                    pdp_select: "auto",
                    pdp_addr: "",
                    index: e.index
                };
                return "IP" == e.pdpType ? $.extend(n, {
                    wan_apn: e.wanApn,
                    ppp_auth_mode: e.authMode,
                    ppp_username: e.username,
                    ppp_passwd: e.password,
                    dns_mode: e.dnsMode,
                    prefer_dns_manual: e.dns1,
                    standby_dns_manual: e.dns2
                }) : "IPv6" == e.pdpType ? $.extend(n, {
                    ipv6_wan_apn: e.wanApnV6,
                    ipv6_ppp_auth_mode: e.authModeV6,
                    ipv6_ppp_username: e.usernameV6,
                    ipv6_ppp_passwd: e.passwordV6,
                    ipv6_dns_mode: e.dnsModeV6,
                    ipv6_prefer_dns_manual: e.dns1V6,
                    ipv6_standby_dns_manual: e.dns2V6
                }) : $.extend(n, {
                    wan_apn: e.wanApn,
                    ppp_auth_mode: e.authMode,
                    ppp_username: e.username,
                    ppp_passwd: e.password,
                    dns_mode: e.dnsMode,
                    prefer_dns_manual: e.dns1,
                    standby_dns_manual: e.dns2,
                    ipv6_wan_apn: e.wanApnV6,
                    ipv6_ppp_auth_mode: e.authModeV6,
                    ipv6_ppp_username: e.usernameV6,
                    ipv6_ppp_passwd: e.passwordV6,
                    ipv6_dns_mode: e.dnsModeV6,
                    ipv6_prefer_dns_manual: e.dns1V6,
                    ipv6_standby_dns_manual: e.dns2V6
                }), n
            }
            var n = {
                isTest: isTest,
                goformId: "APN_PROC",
                apn_action: "save",
                apn_mode: "manual",
                index: e.index,
                profile_name: e.profileName,
                wan_apn: e.wanApn,
                dns_mode: e.dnsMode,
                prefer_dns_manual: e.dns1,
                w_standby_dns_manual: e.dns2,
                ppp_auth_mode: e.authMode,
                ppp_username: e.username,
                ppp_passwd: e.password,
                wan_dial: "*99#",
                apn_select: "manual",
                pdp_type: "PPP",
                pdp_select: "auto",
                pdp_addr: ""
            };
            return n
        }

        function t(e) {
            return "success" == e.result ? {
                result: !0
            } : {
                result: !1
            }
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function timerUpdater() {
        if (!timerUpdaterEnable) return void setTimeout(function () {
            timerUpdater()
        }, 1e3);
        asyncRequest(checkTimerUpdaterParameters(), function (e) {
            for (var t = 0; t < timerCallbacks.length; t++) "function" == typeof timerCallbacks[t] && timerCallbacks[t](e);
            $.merge(timerCallbacks, timerCallbackStack), timerCallbackStack = [], setTimeout(function () {
                timerUpdater()
            }, 1e3)
        }, function () {
            timerUpdaterErrorCallback(), setTimeout(function () {
                timerUpdater()
            }, 1e3)
        }, !1)
    }

    function checkTimerUpdaterParameters() {
        var e = {
            multi_data: 1,
            isTest: isTest
        };
        return window.location.hash && "#login" != window.location.hash && timerInfo.isLoggedIn ? (config.HAS_SMS && (e.sms_received_flag_flag = 0, e.sts_received_flag_flag = 0), loginTimerQueryString.length > 0 && -1 == _.indexOf(timerQueryString, loginTimerQueryString[0]) && $.each(loginTimerQueryString, function (e, t) {
            timerQueryString.push(t)
        })) : loginTimerQueryString.length > 0 && -1 != _.indexOf(timerQueryString, loginTimerQueryString[0]) && (timerQueryString = _.without(timerQueryString, loginTimerQueryString)), e.cmd = timerQueryString.join(","), e
    }

    function addTimerThings(e, t) {
        if (_.isArray(e))
            for (var n = 0; n < e.length; n++) addQueryString(e[n]);
        else addQueryString(e);
        addCallback(t)
    }

    function removeTimerThings(e, t) {
        if (_.isArray(e))
            for (var n = 0; n < e.length; n++) removeQueryString(e[n]);
        else removeQueryString(e);
        removeCallback(t)
    }

    function addCallback(e) {
        -1 == _.indexOf(timerCallbackStack, e) && timerCallbackStack.push(e)
    }

    function removeCallback(e) {
        return timerCallbacks = _.without(timerCallbacks, e), 0 == timerCallbacks.length && timerCallbacks.push(timerUpdateStatus), timerCallbackStack
    }

    function addQueryString(e) {
        -1 == _.indexOf(timerQueryString, e) && timerQueryString.push(e)
    }

    function removeQueryString(e) {
        return timerQueryString = _.without(timerQueryString, e)
    }

    function timerUpdateStatus(e) {
        timerInfo.signalImg = void 0 === e.signalbar ? "0" : e.signalbar, timerInfo.networkType = e.network_type ? e.network_type : "", -1 != timerInfo.networkType.toLowerCase().indexOf("limited_service") || -1 != timerInfo.networkType.toLowerCase().indexOf("limited service") ? timerInfo.networkType = "limited_service" : -1 == timerInfo.networkType.toLowerCase().indexOf("no_service") && -1 == timerInfo.networkType.toLowerCase().indexOf("no service") || (timerInfo.networkType = "no_service"), timerInfo.networkOperator = e.network_provider ? e.network_provider : "", timerInfo.spn_b1_flag = e.spn_b1_flag, timerInfo.spn_b2_flag = e.spn_b2_flag, timerInfo.spn_name_data = e.spn_name_data, "PPPOE" == e.opms_wan_mode || ("AUTO" == e.opms_wan_mode || "AUTO_BACKUP" == e.opms_wan_mode) && "AUTO_PPPOE" == e.opms_wan_auto_mode ? timerInfo.connectStatus = void 0 === e.pppoe_status ? "ppp_disconnected" : e.pppoe_status : "DHCP" == e.opms_wan_mode || ("AUTO" == e.opms_wan_mode || "AUTO_BACKUP" == e.opms_wan_mode) && "AUTO_DHCP" == e.opms_wan_auto_mode ? "1" == e.dhcp_wan_status ? timerInfo.connectStatus = "ppp_connected" : timerInfo.connectStatus = "ppp_disconnected" : "STATIC" == e.opms_wan_mode || ("AUTO" == e.opms_wan_mode || "AUTO_BACKUP" == e.opms_wan_mode) && "AUTO_STATIC" == e.opms_wan_auto_mode ? "1" == e.static_wan_status ? timerInfo.connectStatus = "ppp_connected" : timerInfo.connectStatus = "ppp_disconnected" : timerInfo.connectStatus = void 0 === e.ppp_status ? "ppp_disconnected" : e.ppp_status;
        var t = e.wifi_access_sta_num && "" != e.wifi_access_sta_num ? e.wifi_access_sta_num : 0;
        timerInfo.curr_connected_devices = t, timerInfo.roamingStatus = getRoamStatus(timerInfo.networkType, e.modem_main_state, e.simcard_roam), timerInfo.wifiStatus = "1" == e.wifi_onoff_state, timerInfo.wifiSwitchStatus = e.wifi_onoff_state, timerInfo.simStatus = e.modem_main_state, timerInfo.pinStatus = e.pin_status;
        var n = e.battery_vol_percent && e.battery_vol_percent.length > 0 ? e.battery_vol_percent : 100;
        timerInfo.batteryPers = e.battery_pers;
        var r = Math.round(10800 * (1 - n / 100));
        if (timerInfo.batteryStatus = void 0 === e.battery_charging ? "0" : e.battery_charging, timerInfo.battery_value = void 0 === e.battery_value ? "0" : e.battery_value, timerInfo.batteryLevel = n, timerInfo.batteryTime = r.toString(), timerInfo.data_counter = {
                uploadRate: "" == e.realtime_tx_thrpt ? 0 : e.realtime_tx_thrpt,
                downloadRate: "" == e.realtime_rx_thrpt ? 0 : e.realtime_rx_thrpt,
                currentSent: "" == e.realtime_tx_bytes ? 0 : e.realtime_tx_bytes,
                currentReceived: "" == e.realtime_rx_bytes ? 0 : e.realtime_rx_bytes,
                currentConnectedTime: "" == e.realtime_time ? 0 : e.realtime_time,
                monthlySent: "" == e.monthly_tx_bytes ? 0 : e.monthly_tx_bytes,
                monthlyReceived: "" == e.monthly_rx_bytes ? 0 : e.monthly_rx_bytes,
                monthlyConnectedTime: "" == e.monthly_time ? 0 : e.monthly_time,
                month: "" == e.date_month ? 1 : e.date_month
            }, timerInfo.ssid = e.wifi_chip1_ssid1_ssid, timerInfo.mainSSID5g = e.wifi_chip2_ssid1_ssid, timerInfo.station_num_ssid1 = e.wifi_chip1_ssid1_access_sta_num, timerInfo.station_num_ssid2 = e.wifi_chip2_ssid1_access_sta_num, config.HAS_MULTI_SSID && (timerInfo.station_num_guest_ssid1 = e.wifi_chip1_ssid2_access_sta_num, timerInfo.station_num_guest_ssid2 = e.wifi_chip2_ssid2_access_sta_num), timerInfo.authMode = e.AuthMode, timerInfo.isLoggedIn && 1 == timerInfo.isLoggedIn && "ok" != e.loginfo ? isLoggedInFlag > 2 ? (timerInfo.isLoggedIn = !config.HAS_LOGIN || "ok" == e.loginfo, isLoggedInFlag = 0) : isLoggedInFlag++ : timerInfo.isLoggedIn = !config.HAS_LOGIN || "ok" == e.loginfo, config.HAS_SMS && (timerInfo.newSmsReceived || (timerInfo.newSmsReceived = e.sms_received_flag > 0), timerInfo.smsReportReceived || (timerInfo.smsReportReceived = e.sts_received_flag > 0), void 0 !== e.sms_dev_unread_num ? timerInfo.smsUnreadCount = config.SMS_UNREAD_NUM_INCLUDE_SIM ? parseInt(0 | e.sms_dev_unread_num, 10) + parseInt(0 | e.sms_sim_unread_num, 10) : parseInt(0 | e.sms_dev_unread_num, 10) : timerInfo.smsUnreadCount = parseInt(0 | e.sms_unread_num, 10)), "1" == e.data_volume_limit_switch)
            if (timerInfo.limitVolumeEnable = !0, timerInfo.limitVolumeType = "data" == e.data_volume_limit_unit ? "1" : "0", timerInfo.limitVolumePercent = e.data_volume_alert_percent, "data" == e.data_volume_limit_unit) {
                var i = e.data_volume_limit_size.split("_");
                timerInfo.limitVolumeSize = i[0] * i[1] * 1024 * 1024, timerInfo.limitVolumeSizeSource = i[0] * i[1]
            } else timerInfo.limitVolumeSize = 60 * e.data_volume_limit_size * 60, timerInfo.limitVolumeSizeSource = e.data_volume_limit_size;
        else timerInfo.limitVolumeEnable = !1, timerInfo.limitVolumeType = "1", timerInfo.limitVolumePercent = "100", timerInfo.limitVolumeSize = "0";
        timerInfo.connectWifiProfile = e.EX_wifi_profile, timerInfo.connectWifiSSID = e.EX_SSID1, timerInfo.connectWifiStatus = e.sta_ip_status, timerInfo.multi_ssid_enable = e.m_ssid_enable, timerInfo.roamMode = e.roam_setting_option, timerInfo.opms_wan_mode = e.opms_wan_mode, timerInfo.opms_wan_auto_mode = e.opms_wan_auto_mode, timerInfo.dhcp_wan_status = e.dhcp_wan_status, timerInfo.new_version_state = "1" == e.new_version_state || "version_has_new_critical_software" == e.new_version_state || "version_has_new_optional_software" == e.new_version_state || "upgrade_pack_redownload" == e.current_upgrade_state, timerInfo.current_upgrade_state = e.current_upgrade_state, "downloading" == timerInfo.current_upgrade_state ? timerInfo.current_upgrade_state = "upgrading" : "verify_failed" == timerInfo.current_upgrade_state && (timerInfo.current_upgrade_state = "upgrade_pack_error"), timerInfo.is_mandatory = "1" == e.is_mandatory || "version_has_new_critical_software" == e.new_version_state, timerInfo.allowRoamingUpdate = e.upg_roam_switch, timerInfo.wifi_dfs_status = e.wifi_dfs_status, timerInfo.wifi_5g_enable = e.wifi_5g_enable, timerInfo.dialMode = e.dial_mode, timerInfo.ppp_dial_conn_fail_counter = e.ppp_dial_conn_fail_counter, timerInfo.isCaStatus = "ca_activated" == e.wan_lte_ca || "ca_deactivated" == e.wan_lte_ca, timerInfo.privacy_read_flag = e.privacy_read_flag, timerInfo.is_night_mode = e.is_night_mode, timerInfo.pppoe_status = e.pppoe_status, timerInfo.dhcp_wan_status = e.dhcp_wan_status, timerInfo.static_wan_status = e.static_wan_status,
            timerInfo.vpn_conn_status = void 0 === e.vpn_conn_status ? "disconnected" : e.vpn_conn_status, timerInfo.rmcc = e.rmcc, timerInfo.rmnc = e.rmnc, timerInfo.wan_connect_status = e.wan_connect_status, timerInfo.wifi_onoff_wifi5g_by_n79_mutex = e.wifi_onoff_wifi5g_by_n79_mutex
    }

    function timerUpdaterErrorCallback() {
        timerInfo.batteryStatus = "0"
    }

    function getRoamStatus(e, t, n) {
        return "" != $.trim(e) && "no_service" != e.toLowerCase() && "limited_service" != e.toLowerCase() && "modem_sim_undetected" != t && "modem_waitpin" != t && "modem_waitpuk" != t && ("Internal" == n || "International" == n)
    }

    function setNetwork(e, t, n) {
        if (("string" != typeof e || "" === e || "number" != typeof t || isNaN(t)) && "function" == typeof n) return void n(!1);
        if (-1 === (0 === t ? 0 : 2 === t ? 2 : 7 == t ? 7 : 12 == t ? 12 : -1) && "function" == typeof n) return void n(!1);
        asyncRequest({
            isTest: isTest,
            goformId: "SET_NETWORK",
            NetworkNumber: e,
            Rat: t
        }, function (e) {
            if (e && "success" == e.result) var t, r = 0,
                i = setInterval(function () {
                    var e = syncRequest({
                        cmd: "m_netselect_result",
                        isTest: isTest
                    }, !1);
                    e || n(!1), "manual_success" == e.m_netselect_result ? (t = "1", window.clearInterval(i), n(!0)) : "manual_fail" == e.m_netselect_result ? (t = "0", window.clearInterval(i), n(!1)) : r < 120 ? r++ : (window.clearInterval(i), n(!1))
                }, 1e3);
            else n(!1)
        }, function (e) {
            n(!1)
        }, !0)
    }

    function getCurrentNetwork() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "current_network", n
        }

        function t(e) {
            return e ? {
                strFullName: e.strFullName,
                strShortName: e.strShortName,
                strNumeric: e.strNumeric,
                nRat: "" == e.nRat ? "" : Number(e.nRat),
                strBearer: e.strBearer
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function savePhoneBook() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.notCallback = !0, n.goformId = "PBM_CONTACT_ADD", n.location = e.location, n.name = encodeMessage(e.name), n.mobilephone_num = e.mobile_phone_number, 1 == n.location ? (n.add_index_pc = e.index, n.homephone_num = e.home_phone_number, n.officephone_num = e.office_phone_number, n.email = encodeMessage(e.mail), n.groupchoose = e.group, n.groupchoose || (n.groupchoose = "common")) : n.edit_index = e.index, n
        }

        function t(e) {
            e && "success" == e.result ? addTimerThings("pbm_write_flag", n) : r(e)
        }

        function n(e) {
            checkPbmWriteFlag(e, r, n)
        }
        var r = arguments[1];
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function checkPbmWriteFlag(e, t, n) {
        "0" == e.pbm_write_flag ? (removeTimerThings("pbm_write_flag", n), t({
            result: "success"
        })) : "6" != e.pbm_write_flag && "7" != e.pbm_write_flag && "8" != e.pbm_write_flag && "9" != e.pbm_write_flag && "10" != e.pbm_write_flag && "11" != e.pbm_write_flag && "14" != e.pbm_write_flag || (removeTimerThings("pbm_write_flag", n), t({
            result: "fail"
        }))
    }

    function deletePhoneBooks() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.notCallback = !0, n.goformId = "PBM_CONTACT_DEL", n.del_option = "delete_num", n.delete_id = e.indexs.join(","), n
        }

        function t(e) {
            e && "success" == e.result ? addTimerThings("pbm_write_flag", n) : r(e)
        }

        function n(e) {
            checkPbmWriteFlag(e, r, n)
        }
        var r = arguments[1];
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function deleteAllPhoneBooks() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.notCallback = !0, n.goformId = "PBM_CONTACT_DEL", n.del_option = "delete_all", n.del_all_location = e.location, n
        }

        function t(e) {
            e && "success" == e.result ? addTimerThings("pbm_write_flag", n) : r(e)
        }

        function n(e) {
            checkPbmWriteFlag(e, r, n)
        }
        var r = arguments[1];
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function deleteAllPhoneBooksByGroup() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.notCallback = !0, n.goformId = "PBM_CONTACT_DEL", n.del_option = "delete_all_by_group", n.del_all_location = 3, n.del_group = e.group, n
        }

        function t(e) {
            e && "success" == e.result ? addTimerThings("pbm_write_flag", n) : r(e)
        }

        function n(e) {
            checkPbmWriteFlag(e, r, n)
        }
        var r = arguments[1];
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setConnectionMode() {
        function e(e, t) {
            var n = {};
            return n.goformId = "SET_CONNECTION_MODE", n.isTest = isTest, n.ConnectionMode = e.connectionMode, n.roam_setting_option = e.isAllowedRoaming, n
        }

        function t(e) {
            if (e) return e;
            callback(e)
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getConnectionMode() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "ConnectionMode", n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.connectionMode = e.connectionMode, t.isAllowedRoaming = e.autoConnectWhenRoaming, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function _getPhoneBooks(e, t) {
        function n(e, n) {
            var r = {};
            return r.isTest = isTest, r.mem_store = t, r.cmd = 2 == t ? "pbm_data_total" : "pbm_data_info", r.page = e.page, r.data_per_page = e.data_per_page, r.orderBy = e.orderBy, r.isAsc = e.isAsc, r
        }

        function r(e) {
            if (e && e.pbm_data) {
                var t = [];
                return $.each(e.pbm_data, function (n) {
                    t.push({
                        pbm_id: e.pbm_data[n].pbm_id,
                        pbm_location: e.pbm_data[n].pbm_location,
                        pbm_number: e.pbm_data[n].pbm_number,
                        pbm_anr: e.pbm_data[n].pbm_anr,
                        pbm_anr1: e.pbm_data[n].pbm_anr1,
                        pbm_group: e.pbm_data[n].pbm_group,
                        pbm_name: decodeMessage(e.pbm_data[n].pbm_name),
                        pbm_email: decodeMessage(e.pbm_data[n].pbm_email)
                    })
                }), {
                    pbm_data: t
                }
            }
            return unknownErrorObject
        }
        return 0 == e[0].data_per_page ? {
            pbm_data: []
        } : doStuff(e, {}, n, r, null, !1)
    }

    function getPhoneBooksByGroup() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "pbm_data_total", n.mem_store = 3, n.pbm_group = e.group, n.page = e.page, n.data_per_page = e.data_per_page, n.orderBy = e.orderBy, n.isAsc = e.isAsc, n
        }

        function t(e) {
            if (e && e.pbm_data) {
                var t = [];
                return $.each(e.pbm_data, function (n) {
                    t.push({
                        pbm_id: e.pbm_data[n].pbm_id,
                        pbm_location: e.pbm_data[n].pbm_location,
                        pbm_number: e.pbm_data[n].pbm_number,
                        pbm_anr: e.pbm_data[n].pbm_anr,
                        pbm_anr1: e.pbm_data[n].pbm_anr1,
                        pbm_group: e.pbm_data[n].pbm_group,
                        pbm_name: decodeMessage(e.pbm_data[n].pbm_name),
                        pbm_email: decodeMessage(e.pbm_data[n].pbm_email)
                    })
                }), {
                    pbm_data: t
                }
            }
            return unknownErrorObject
        }
        return 0 == arguments[0].data_per_page ? {
            pbm_data: []
        } : doStuff(arguments, {}, e, t, null, !1)
    }

    function getDevicePhoneBooks() {
        return _getPhoneBooks(arguments, 1)
    }

    function getSIMPhoneBooks() {
        return _getPhoneBooks(arguments, 0)
    }

    function getPhoneBooks() {
        return _getPhoneBooks(arguments, 2)
    }

    function getPhoneBookReady() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "pbm_init_flag", n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getPhoneBookCapacity(e, t) {
        function n(e, n) {
            var r = {};
            return r.isTest = isTest, r.cmd = "pbm_capacity_info", r.pbm_location = t ? "pbm_sim" : "pbm_native", r
        }

        function r(e) {
            return e || unknownErrorObject
        }
        return doStuff(e, {}, n, r, null, !1)
    }

    function getSIMPhoneBookCapacity() {
        var e = getPhoneBookCapacity(arguments, !0);
        return {
            simPbmTotalCapacity: parseInt(e.pbm_sim_max_record_num),
            simPbmUsedCapacity: parseInt(e.pbm_sim_used_record_num),
            simType: e.pbm_sim_type,
            maxNameLen: parseInt(e.pbm_sim_max_name_len),
            maxNumberLen: parseInt(e.pbm_sim_max_number_len)
        }
    }

    function getDevicePhoneBookCapacity() {
        var e = getPhoneBookCapacity(arguments, !1);
        return {
            pcPbmTotalCapacity: parseInt(e.pbm_dev_max_record_num),
            pcPbmUsedCapacity: parseInt(e.pbm_dev_used_record_num)
        }
    }

    function getLoginData() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "modem_main_state,puknumber,pinnumber,opms_wan_mode,psw_fail_num_str,login_lock_time,SleepStatusForSingleChipCpe", n.multi_data = 1, n
        }

        function t(e) {
            return e ? (e.psw_fail_num_str = "" == e.psw_fail_num_str ? config.MAX_LOGIN_COUNT : e.psw_fail_num_str, e.login_lock_time = "" == e.login_lock_time ? "300" : e.login_lock_time, e.curSleepStatus = "1" == e.SleepStatusForSingleChipCpe ? "1" : "2", e) : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function login() {
        function e(e, t) {
            var n = getParams({
                nv: "LD"
            }).LD;
            return {
                isTest: isTest,
                goformId: "LOGIN",
                password: "2" == config.WEB_ATTR_IF_SUPPORT_SHA256 ? paswordAlgorithmsCookie(paswordAlgorithmsCookie(e.password) + n) : "1" == config.WEB_ATTR_IF_SUPPORT_SHA256 ? paswordAlgorithmsCookie(Base64.encode(e.password)) : Base64.encode(e.password)
            }
        }

        function t(e) {
            if (!e || "0" != e.result && "4" != e.result) {
                if (e && "5" == e.result) return timerInfo.isLoggedIn = !1, {
                    result: "5"
                };
                var t = {};
                switch (e.result) {
                    case "1":
                        t = {
                            errorType: "Login Fail"
                        };
                        break;
                    case "2":
                        t = {
                            errorType: "duplicateUser"
                        };
                        break;
                    case "3":
                        t = {
                            errorType: "badPassword"
                        };
                        break;
                    default:
                        t = {
                            errorType: "Login Fail"
                        }
                }
                return timerInfo.isLoggedIn = !1, $.extend(unknownErrorObject, t)
            }
            return timerInfo.isLoggedIn = !0, {
                result: !0
            }
        }
        return doStuff(arguments, {}, e, t, {
            errorType: "badPassword"
        }, !0)
    }

    function getLoginStatus() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "loginfo", n.multi_data = 1, n
        }

        function t(e) {
            if (e && e.loginfo || "" == e.loginfo) {
                var t = {};
                switch (e.loginfo) {
                    case "ok":
                        timerInfo.isLoggedIn = !0, t.status = "loggedIn";
                        break;
                    default:
                        timerInfo.isLoggedIn = !1, t.status = "loggedOut"
                }
                return t
            }
            return timerInfo.isLoggedIn = void 0, $.extend(unknownErrorObject, {
                errorType: "LoginStatusError"
            })
        }
        if (void 0 != timerInfo.isLoggedIn) return doStuff(arguments, {
            status: timerInfo.isLoggedIn ? "loggedIn" : "loggedOut"
        });
        var n = {};
        return config.HAS_LOGIN || (n.status = "loggedIn", n.errorType = "no_login", timerInfo.isLoggedIn = !0), doStuff(arguments, n, e, t, null, !1)
    }

    function enterPIN() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "ENTER_PIN", n.PinNumber = e.PinNumber, n
        }

        function t(e) {
            return e && "success" === e.result ? {
                result: !0
            } : {
                result: !1
            }
        }
        return doStuff(arguments, {}, e, t, {}, !0)
    }

    function enterPUK() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "ENTER_PUK", n.PUKNumber = e.PUKNumber, n.PinNumber = e.PinNumber, n
        }

        function t(e) {
            return e && "success" === e.result ? {
                result: !0
            } : {
                result: !1
            }
        }
        return doStuff(arguments, {}, e, t, {}, !0)
    }

    function getSMSMessages() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "sms_data_total",
                page: e.page,
                data_per_page: config.SMS_DATABASE_SORT_SUPPORT ? e.smsCount : 500,
                mem_store: e.nMessageStoreType,
                tags: e.tags,
                order_by: e.orderBy
            }
        }

        function t(e) {
            return e && e.messages && e.messages.length > 0 ? {
                messages: parseMessages(e.messages)
            } : {
                messages: []
            }
        }
        return doStuff(arguments, {}, e, t, {}, !1)
    }

    function parseMessages(e, t) {
        for (var n = [], r = 0; r < e.length; r++)
            if (config.SHOW_UN_COMPLETE_CONCAT_SMS || void 0 === e[r].received_all_concat_sms || "0" != e[r].received_all_concat_sms) {
                var i = {};
                i.id = e[r].id, i.number = e[r].number, i.content = t ? e[r].content : decodeMessageContent(e[r].content), i.timeOri = transTime("20" + e[r].date), i.time = transTime("20" + e[r].date, config.DATE_FORMAT, config.TIME_FORMAT), i.isNew = "1" == e[r].tag, i.groupId = e[r].draft_group_id, i.tag = e[r].tag, i.receivedAll = "1" == e[r].received_all_concat_sms, n.push(i)
            } if (config.SMS_DATABASE_SORT_SUPPORT) return n;
        for (var o = [], s = [], r = n.length; r--;) {
            var a = n[r],
                u = $.inArray(a.id, o); - 1 == u ? (o.push(a.id), s.push(a)) : a.content.length > s[u].content.length && (s[u] = a)
        }
        return _.sortBy(s, function (e) {
            return 0 - e.id
        })
    }

    function decodeMessageContent(e) {
        return decodeMessage(escapeMessage(e))
    }

    function sendSMS() {
        function e(e, t) {
            return {
                isTest: isTest,
                goformId: "SEND_SMS",
                notCallback: !0,
                Number: e.number,
                sms_time: getCurrentTimeString(),
                MessageBody: escapeMessage(encodeMessage(e.message)),
                ID: e.id,
                encode_type: getEncodeType(e.message).encodeType
            }
        }

        function t(e) {
            if (!e) return void r($.extend(unknownErrorObject, {
                errorType: "sendFail",
                errorText: "send_fail_try_again"
            }));
            "success" == e.result ? setTimeout(function () {
                getSmsStatusInfo({
                    smsCmd: 4,
                    errorType: "sendFail",
                    errorText: "send_fail_try_again"
                }, n, r)
            }, 1e3) : r($.extend(unknownErrorObject, {
                errorType: "sendFail",
                errorText: "send_fail_try_again"
            }))
        }
        var n = arguments[1],
            r = arguments[2] ? arguments[2] : n;
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function saveSMS() {
        function e(e, t) {
            return {
                isTest: isTest,
                notCallback: !0,
                goformId: "SAVE_SMS",
                SMSMessage: escapeMessage(encodeMessage(e.message)),
                SMSNumber: e.numbers.join(";") + ";",
                Index: e.index,
                encode_type: getEncodeType(e.message).encodeType,
                sms_time: e.currentTimeString,
                draft_group_id: e.groupId
            }
        }

        function t(e) {
            if (!e) return void r($.extend(unknownErrorObject, {
                errorType: "saveFail",
                errorText: "save_fail"
            }));
            "success" == e.result ? getSmsStatusInfo({
                smsCmd: 5,
                errorType: "saveFail",
                errorText: "save_fail"
            }, n, r) : r($.extend(unknownErrorObject, {
                errorType: "saveFail",
                errorText: "save_fail"
            }))
        }
        var n = arguments[1],
            r = arguments[2] ? arguments[2] : n;
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function deleteAllMessages() {
        function e(e, t) {
            return {
                isTest: isTest,
                goformId: "ALL_DELETE_SMS",
                notCallback: !0,
                which_cgi: e.location
            }
        }

        function t(e) {
            if (!e) return void i($.extend(unknownErrorObject, {
                errorType: "deleteFail",
                errorText: "delete_fail_try_again"
            }));
            "success" == e.result ? addTimerThings("sms_cmd_status_info", n) : i($.extend(unknownErrorObject, {
                errorType: "deleteFail",
                errorText: "delete_fail_try_again"
            }))
        }

        function n(e) {
            var t = e.sms_cmd_status_info;
            "2" == t ? (removeTimerThings("sms_cmd_status_info", n), i($.extend(unknownErrorObject, {
                errorType: "deleteFail",
                errorText: "delete_fail_try_again"
            }))) : "3" == t && (removeTimerThings("sms_cmd_status_info", n), r({
                result: !0
            }))
        }
        var r = arguments[1],
            i = arguments[2] ? arguments[2] : r;
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function deleteMessage() {
        function e(e, t) {
            var n = e.ids.join(";") + ";";
            return {
                isTest: isTest,
                goformId: "DELETE_SMS",
                msg_id: n,
                notCallback: !0
            }
        }

        function t(e) {
            if (!e) return void r($.extend(unknownErrorObject, {
                errorType: "deleteFail",
                errorText: "delete_fail_try_again"
            }));
            "success" == e.result ? getSmsStatusInfo({
                smsCmd: 6,
                errorType: "deleteFail",
                errorText: "delete_fail_try_again"
            }, n, r) : r($.extend(unknownErrorObject, {
                errorType: "deleteFail",
                errorText: "delete_fail_try_again"
            }))
        }
        var n = arguments[1],
            r = arguments[2] ? arguments[2] : n;
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getSmsStatusInfo(e, t, n) {
        asyncRequest({
            cmd: "sms_cmd_status_info",
            sms_cmd: e.smsCmd,
            isTest: isTest
        }, function (r) {
            if (r) {
                var i = r.sms_cmd_status_result;
                "2" == i ? n($.extend(unknownErrorObject, {
                    errorType: e.errorType,
                    errorText: e.errorText
                })) : "3" == i ? t({
                    result: "success"
                }) : window.setTimeout(function () {
                    getSmsStatusInfo(e, t, n)
                }, 1e3)
            } else n($.extend(unknownErrorObject, {
                errorType: e.errorType,
                errorText: e.errorText
            }))
        }, function (t) {
            n($.extend(unknownErrorObject, {
                errorType: e.errorType,
                errorText: e.errorText
            }))
        }, !1)
    }

    function getSMSReady() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "sms_cmd_status_info", n.sms_cmd = 1, n
        }

        function t(e) {
            return e ? ("3" == e.sms_cmd_status_result && (config.smsIsReady = !0), e) : unknownErrorObject
        }
        if (config.smsIsReady) {
            var n = arguments[1];
            return n ? n({
                sms_cmd: "1",
                sms_cmd_status_result: "3"
            }) : {
                sms_cmd: "1",
                sms_cmd_status_result: "3"
            }
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setSmsRead() {
        function e(e, t) {
            var n = e.ids.join(";");
            return e.ids.length > 0 && (n += ";"), {
                isTest: isTest,
                goformId: "SET_MSG_READ",
                msg_id: n,
                tag: 0
            }
        }

        function t(e) {
            return "success" == e.result ? {
                result: !0
            } : {
                result: !1
            }
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getSMSDeliveryReport() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "sms_status_rpt_data",
                page: e.page,
                data_per_page: e.smsCount
            }
        }

        function t(e) {
            return e ? {
                messages: parseMessages(e.messages, !0)
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, {}, !1)
    }

    function logout() {
        function e(e, t) {
            var n = $.extend({}, e);
            return n.isTest = isTest, n.goformId = "LOGOUT", n
        }

        function t(e) {
            return e && "success" == e.result ? (timerInfo.isLoggedIn = !1, {
                result: !0
            }) : $.extend(unknownErrorObject, {
                errorType: "loggedOutError"
            })
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function changePassword() {
        function e(e, t) {
            var n = {};
            return n.newPassword = "2" == config.WEB_ATTR_IF_SUPPORT_SHA256 ? paswordAlgorithmsCookie(e.newPassword) : (config.WEB_ATTR_IF_SUPPORT_SHA256, Base64.encode(e.newPassword)), n.oldPassword = "2" == config.WEB_ATTR_IF_SUPPORT_SHA256 ? paswordAlgorithmsCookie(e.oldPassword) : "1" == config.WEB_ATTR_IF_SUPPORT_SHA256 ? paswordAlgorithmsCookie(Base64.encode(e.oldPassword)) : Base64.encode(e.oldPassword), n.goformId = "CHANGE_PASSWORD", n.isTest = isTest, n
        }

        function t(e) {
            return e && "success" === e.result ? {
                result: !0
            } : $.extend(unknownErrorObject, {
                errorType: "badPassword"
            })
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getPinData() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "pinnumber,pin_status,puknumber", n.multi_data = 1, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function enablePin() {
        function e(e, t) {
            var n = {};
            return n.goformId = "ENABLE_PIN", n.OldPinNumber = e.oldPin, n.isTest = isTest, n
        }

        function t(e) {
            return e && "success" === e.result ? {
                result: !0
            } : {
                result: !1
            }
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function disablePin() {
        function e(e, t) {
            var n = {};
            return n.goformId = "DISABLE_PIN", n.OldPinNumber = e.oldPin, n.isTest = isTest, n
        }

        function t(e) {
            return e && "success" === e.result ? {
                result: !0
            } : {
                result: !1
            }
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function changePin() {
        function e(e, t) {
            var n = {};
            return n.goformId = "ENABLE_PIN", n.OldPinNumber = e.oldPin, n.NewPinNumber = e.newPin, n.isTest = isTest, n
        }

        function t(e) {
            return e && "success" === e.result ? {
                result: !0
            } : {
                result: !1
            }
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getLanInfo() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "lan_ipaddr,lan_netmask,mac_address,dhcpEnabled,dhcpStart,dhcpEnd,dhcpLease_hour,mtu,tcp_mss", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.ipAddress = e.lan_ipaddr, t.subnetMask = e.lan_netmask, t.macAddress = e.mac_address, t.dhcpServer = e.dhcpEnabled, t.dhcpStart = e.dhcpStart, t.dhcpEnd = e.dhcpEnd, t.dhcpLease = parseInt(e.dhcpLease_hour, 10), t.mtuValue = e.mtu, t.mssValue = e.tcp_mss, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setLanInfo() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "DHCP_SETTING", n.lanIp = e.ipAddress, n.lanNetmask = e.subnetMask, n.lanDhcpType = "1" == e.dhcpServer ? "SERVER" : "DISABLE", "SERVER" == n.lanDhcpType && (n.dhcpStart = e.dhcpStart, n.dhcpEnd = e.dhcpEnd, n.dhcpLease = e.dhcpLease), n.dhcp_reboot_flag = 1, n.mac_ip_reset = e.mac_ip_reset, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setMtuMss() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "SET_DEVICE_MTU", n.mtu = e.mtuValue, n.tcp_mss = e.mssValue, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getSmsSetting() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "sms_parameter_info", n
        }

        function t(e) {
            if (e) {
                var t = {};
                switch (t.centerNumber = e.sms_para_sca, t.memStroe = e.sms_para_mem_store, t.deliveryReport = e.sms_para_status_report, parseInt(e.sms_para_validity_period)) {
                    case 143:
                        t.validity = "twelve_hours";
                        break;
                    case 167:
                        t.validity = "one_day";
                        break;
                    case 173:
                        t.validity = "one_week";
                        break;
                    case 244:
                    case 255:
                        t.validity = "largest";
                        break;
                    default:
                        t.validity = "twelve_hours"
                }
                return t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setSmsSetting() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "SET_MESSAGE_CENTER", n.save_time = e.validity, n.MessageCenter = e.centerNumber, n.status_save = e.deliveryReport, n.save_location = "native", n.notCallback = !0, n
        }

        function t(e) {
            if (!e) return void r($.extend(unknownErrorObject, {
                errorType: "smsSettingFail",
                errorText: "error_info"
            }));
            "success" == e.result ? getSmsStatusInfo({
                smsCmd: 3,
                errorType: "smsSettingFail",
                errorText: "error_info"
            }, n, r) : r($.extend(unknownErrorObject, {
                errorType: "deleteFail",
                errorText: "delete_fail_try_again"
            }))
        }
        var n = arguments[1],
            r = arguments[2] ? arguments[2] : n;
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function restoreFactorySettings() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "RESTORE_FACTORY_SETTINGS", n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        var n = {};
        return config.HAS_PARENTAL_CONTROL && 0 != config.currentUserInChildGroup && (n = {
            errorType: "no_auth"
        }), doStuff(arguments, n, e, t, null, !0)
    }

    function checkRestoreStatus(e) {
        var t = {};
        t.isTest = isTest, t.cmd = "restore_flag", t.multi_data = 1, asyncRequest(t, function (t) {
            t && "1" === t.restore_flag ? e() : setTimeout(function () {
                checkRestoreStatus(e)
            }, 5e3)
        }, function () {
            setTimeout(function () {
                checkRestoreStatus(e)
            }, 5e3)
        }, !1)
    }

    function getWpsInfo() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "wifi_wps_index,WscModeOption,AuthMode,wifi_onoff_state,EncrypType,wps_mode,WPS_SSID,m_ssid_enable,SSID1,m_SSID,m_EncrypType,m_AuthMode", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.wpsFlag = e.WscModeOption, t.authMode = e.AuthMode, t.wpsType = e.wps_mode, t.radioFlag = e.wifi_onoff_state, t.encrypType = e.EncrypType, t.wpsSSID = e.WPS_SSID, t.ssidEnable = e.m_ssid_enable, t.ssid = e.SSID1, t.multiSSID = e.m_SSID, t.m_encrypType = e.m_EncrypType, t.wifi_wps_index = e.wifi_wps_index, t.AuthMode = e.AuthMode, t.m_AuthMode = e.m_AuthMode, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function openWps() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "WIFI_WPS_SET", n.WPS_SSID = e.wpsSSID, n.wps_mode = e.wpsType, n.wifi_wps_index = e.wpsIndex, "PIN" == n.wps_mode && (n.wps_pin = e.wpsPin), n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getSleepMode() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "sysIdleTimeToSleep", n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.sleepMode = e.sysIdleTimeToSleep, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setSleepMode() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "SET_WIFI_SLEEP_INFO", n.sysIdleTimeToSleep = e.sleepMode, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getSysSecurity() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "RemoteManagement,WANPingFilter", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.remoteFlag = "1" == e.RemoteManagement ? "1" : "0", t.pingFlag = "1" == e.WANPingFilter ? "1" : "0", t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setSysSecurity() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "FW_SYS", n.remoteManagementEnabled = e.remoteFlag, n.pingFrmWANFilterEnabled = e.pingFlag, n.RemoteManagement = e.remoteFlag, n.WANPingFilter = e.pingFlag, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getPortForward() {
        function prepare(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "PortForwardEnable,portforward_rule_num,PortForwardRules_0,PortForwardRules_1,PortForwardRules_2,PortForwardRules_3,PortForwardRules_4,PortForwardRules_5,PortForwardRules_6,PortForwardRules_7,PortForwardRules_8,PortForwardRules_9,PortForwardRules_10,PortForwardRules_11,PortForwardRules_12,PortForwardRules_13,PortForwardRules_14,PortForwardRules_15,PortForwardRules_16,PortForwardRules_17,PortForwardRules_18,PortForwardRules_19", n.multi_data = 1, n
        }

        function deal(data) {
            if (data) {
                var result = {};
                result.portForwardEnable = data.PortForwardEnable;
                var rules = [];
                "" == data.portforward_rule_num && (data.portforward_rule_num = "10"), result.portforward_rule_num = data.portforward_rule_num;
                for (var i = 0; i < data.portforward_rule_num; i++) {
                    var PortForwardRules = eval("data.PortForwardRules_" + i);
                    "" != PortForwardRules && rules.push([i, PortForwardRules])
                }
                return result.portForwardRules = parsePortForwardRules(rules), result
            }
            return unknownErrorObject
        }

        function parsePortForwardRules(e) {
            var t = [];
            if (e && e.length > 0)
                for (var n = 0; n < e.length; n++) {
                    var r = {},
                        i = e[n][1].split(",");
                    r.index = e[n][0], r.ipAddress = i[0], r.portRange = i[1] + " - " + i[2], r.protocol = transProtocol(i[3]), r.comment = i[4], t.push(r)
                }
            return t
        }
        return doStuff(arguments, {}, prepare, deal, null, !1)
    }

    function setPortForward() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "FW_FORWARD_ADD", n.ipAddress = e.ipAddress, n.portStart = e.portStart, n.portEnd = e.portEnd, n.protocol = e.protocol, n.comment = e.comment, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function deleteForwardRules() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "FW_FORWARD_DEL", n.delete_id = e.indexs.join(";") + ";", n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function enableVirtualServer() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "VIRTUAL_SERVER", n.PortForwardEnable = e.portForwardEnable, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getQuickSettingInfo() {
        function e(e, t) {
            var n = {};
            n.isTest = isTest;
            var r = config.PASSWORD_ENCODE ? ",WPAPSK1_encode" : ",WPAPSK1";
            return n.cmd = "pdp_type,ipv6_pdp_type,RadioOff,SSID1,HideSSID,AuthMode,WscModeOption,ppp_status,apn_index,ipv6_apn_index,ipv6_APN_index,m_profile_name,apn_mode" + r + ",APN_config0,APN_config1,APN_config2,APN_config3,APN_config4,APN_config5,APN_config6,APN_config7,APN_config8,APN_config9,APN_config10,APN_config11,APN_config12,APN_config13,APN_config14,APN_config15,APN_config16,APN_config17,APN_config18,APN_config19,ipv6_APN_config0,ipv6_APN_config1,ipv6_APN_config2,ipv6_APN_config3,ipv6_APN_config4,ipv6_APN_config5,ipv6_APN_config6,ipv6_APN_config7,ipv6_APN_config8,ipv6_APN_config9,ipv6_APN_config10,ipv6_APN_config11,ipv6_APN_config12,ipv6_APN_config13,ipv6_APN_config14,ipv6_APN_config15,ipv6_APN_config16,ipv6_APN_config17,ipv6_APN_config18,ipv6_APN_config19", n.multi_data = 1, n
        }

        function t(e) {
            return e ? (config.PASSWORD_ENCODE && (e.WPAPSK1 = Base64.decode(e.WPAPSK1_encode)), e) : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setQuickSetting() {
        function e(e) {
            return {
                isTest: isTest,
                goformId: "QUICK_SETUP",
                apn_mode: e.apnMode,
                Profile_Name: e.Profile_Name,
                APN_name: e.APN_name,
                ppp_auth_mode: e.ppp_auth_mode,
                ppp_username: e.ppp_username,
                ppp_passwd: e.ppp_passwd,
                SSID_name: e.SSID_name,
                SSID_Broadcast: e.SSID_Broadcast,
                Encryption_Mode_hid: e.Encryption_Mode_hid,
                security_shared_mode: e.security_shared_mode,
                WPA_PreShared_Key: config.PASSWORD_ENCODE ? Base64.encode(e.WPA_PreShared_Key) : e.WPA_PreShared_Key,
                wep_default_key: e.wep_default_key,
                WPA_ENCRYPTION_hid: e.WPA_ENCRYPTION_hid
            }
        }

        function t(e) {
            return e || $.extend(unknownErrorObject, {
                errorType: "SetSetUpError"
            })
        }
        doStuffAndCheckServerIsOnline(arguments, e, t)
    }

    function setQuickSetting4IPv6() {
        function e(e) {
            return {
                isTest: isTest,
                goformId: "QUICK_SETUP_EX",
                index: e.apn_index,
                pdp_type: e.pdp_type,
                apn_mode: e.apnMode,
                profile_name: e.profile_name,
                wan_apn: e.wan_apn,
                ppp_auth_mode: e.ppp_auth_mode,
                ppp_username: e.ppp_username,
                ppp_passwd: e.ppp_passwd,
                ipv6_wan_apn: e.ipv6_wan_apn,
                ipv6_ppp_auth_mode: e.ipv6_ppp_auth_mode,
                ipv6_ppp_username: e.ipv6_ppp_username,
                ipv6_ppp_passwd: e.ipv6_ppp_passwd,
                SSID_name: e.SSID_name,
                SSID_Broadcast: e.SSID_Broadcast,
                Encryption_Mode_hid: e.Encryption_Mode_hid,
                security_shared_mode: e.security_shared_mode,
                WPA_PreShared_Key: config.PASSWORD_ENCODE ? Base64.encode(e.WPA_PreShared_Key) : e.WPA_PreShared_Key,
                wep_default_key: e.wep_default_key,
                WPA_ENCRYPTION_hid: e.WPA_ENCRYPTION_hid
            }
        }

        function t(e) {
            return e || $.extend(unknownErrorObject, {
                errorType: "SetSetUpError"
            })
        }
        doStuffAndCheckServerIsOnline(arguments, e, t)
    }

    function doStuffAndCheckServerIsOnline(e, t, n) {
        var r = !1,
            i = !1,
            o = t(e[0]),
            s = e[1],
            _ = function (e) {
                r = !0, !i && s && s(n(e)), i = !0
            },
            a = e[2];
        asyncRequest(o, _, function () {
            r = !0, a && a()
        }, !0), addTimeout(function () {
            if (0 == r) var e = addInterval(function () {
                0 == r && getLanguage({}, function (t) {
                    window.clearInterval(e), _({
                        result: "success"
                    })
                })
            }, 1e3)
        }, 5e3)
    }

    function getSDConfiguration() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "sdcard_mode_option,sd_card_state,HTTP_SHARE_STATUS,HTTP_SHARE_CARD_USER,HTTP_SHARE_WR_AUTH,HTTP_SHARE_FILE",
                multi_data: 1
            }
        }

        function t(e) {
            if (e) {
                var t;
                t = "mmc2" == e.HTTP_SHARE_FILE || "/mmc2" == e.HTTP_SHARE_FILE || "/mmc2/" == e.HTTP_SHARE_FILE ? "1" : "0";
                return {
                    sd_mode: "1" == e.sdcard_mode_option ? "0" : "1",
                    sd_status: e.sd_card_state,
                    share_status: "Enabled" == e.HTTP_SHARE_STATUS ? "1" : "0",
                    share_user: e.HTTP_SHARE_CARD_USER,
                    share_auth: "readWrite" == e.HTTP_SHARE_WR_AUTH ? "1" : "0",
                    file_to_share: t,
                    share_file: e.HTTP_SHARE_FILE
                }
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setSdCardMode() {
        function e(e, t) {
            return {
                isTest: isTest,
                goformId: "HTTPSHARE_MODE_SET",
                mode_set: "0" == e.mode ? "http_share_mode" : "usb_mode"
            }
        }

        function t(e) {
            return e && "success" == e.result ? {
                result: !0
            } : {
                result: !1
            }
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function checkFileExists() {
        function e(e, t) {
            return {
                isTest: isTest,
                goformId: "GOFORM_HTTPSHARE_CHECK_FILE",
                path_SD_CARD: e.path
            }
        }

        function t(e) {
            return e ? "no_sdcard" == e.result ? {
                status: "no_sdcard"
            } : "noexist" == e.result ? {
                status: "noexist"
            } : {
                status: "exist"
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getFileList() {
        function e(e, t) {
            return {
                isTest: isTest,
                goformId: "HTTPSHARE_ENTERFOLD",
                path_SD_CARD: e.path,
                indexPage: e.index
            }
        }

        function t(e) {
            return e ? "failure" == e.result ? $.extend(unknownErrorObject, {
                errorType: "get_file_list_failure"
            }) : "no_sdcard" == e.result ? $.extend(unknownErrorObject, {
                errorType: "no_sdcard"
            }) : n(e.result) : unknownErrorObject
        }

        function n(e) {
            var t = {};
            t.totalRecord = e.totalRecord;
            for (var n = [], r = e.fileInfo, i = 0; r && i < r.length; i++)
                if ("" != r[i].fileName) {
                    var o = {};
                    o.fileName = r[i].fileName, o.attribute = r[i].attribute, o.size = r[i].size, o.lastUpdateTime = r[i].lastUpdateTime, n.push(o)
                } return t.details = n, t
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function fileRename() {
        function e(e, t) {
            var n = new Date,
                r = n.getTime(),
                i = 60 * n.getTimezoneOffset();
            return {
                isTest: isTest,
                goformId: "HTTPSHARE_FILE_RENAME",
                path_SD_CARD: e.path,
                OLD_NAME_SD_CARD: e.oldPath,
                NEW_NAME_SD_CARD: e.newPath,
                path_SD_CARD_time: transUnixTime(r),
                path_SD_CARD_time_unix: Math.round((r - 1e3 * i) / 1e3)
            }
        }

        function t(e) {
            return e ? "success" == e.result ? {
                result: !0
            } : "no_sdcard" == e.result ? $.extend(unknownErrorObject, {
                errorType: "no_sdcard"
            }) : {
                result: !1
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getSdMemorySizes() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "HTTPSHARE_GETCARD_VALUE"
            }
        }

        function t(e) {
            return !e || e.result && "no_sdcard" == e.result ? $.extend(unknownErrorObject, {
                errorType: "no_sdcard"
            }) : {
                totalMemorySize: "" == e.sd_card_total_size ? 0 : 32 * e.sd_card_total_size * 1024,
                availableMemorySize: "" == e.sd_card_avi_space ? 0 : 32 * e.sd_card_avi_space * 1024
            }
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function deleteFilesAndFolders() {
        function e(e, t) {
            var n = (new Date).getTime();
            return {
                isTest: isTest,
                goformId: "HTTPSHARE_DEL",
                path_SD_CARD: e.path,
                name_SD_CARD: e.names,
                path_SD_CARD_time: transUnixTime(n),
                path_SD_CARD_time_unix: Math.round(n / 1e3)
            }
        }

        function t(e) {
            return e.result && "failure" == e.result ? $.extend(unknownErrorObject, {
                errorType: "delete_folder_failure"
            }) : e.result && "no_sdcard" == e.result ? $.extend(unknownErrorObject, {
                errorType: "no_sdcard"
            }) : e.result && "success" == e.result ? {
                result: !0
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function createFolder() {
        function e(e, t) {
            var n = new Date,
                r = n.getTime(),
                i = 60 * n.getTimezoneOffset();
            return {
                isTest: isTest,
                goformId: "HTTPSHARE_NEW",
                path_SD_CARD: e.path,
                path_SD_CARD_time: transUnixTime(r),
                path_SD_CARD_time_unix: Math.round((r - 1e3 * i) / 1e3)
            }
        }

        function t(e) {
            return e.result && "failure" == e.result ? $.extend(unknownErrorObject, {
                errorType: "create_folder_failure"
            }) : e.result && "no_sdcard" == e.result ? $.extend(unknownErrorObject, {
                errorType: "no_sdcard"
            }) : e.result && "success" == e.result ? {
                result: !0
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function checkUploadFileStatus() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "CheckUploadFileStatus"
            }
        }

        function t(e) {
            return e ? "5" == e.result ? {
                result: !1
            } : "6" == e.result ? {
                result: !0
            } : {
                result: !1
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setSdCardSharing() {
        function e(e, t) {
            return {
                isTest: isTest,
                goformId: "HTTPSHARE_AUTH_SET",
                HTTP_SHARE_STATUS: "1" == e.share_status ? "Enabled" : "Disabled",
                HTTP_SHARE_WR_AUTH: "1" == e.share_auth ? "readWrite" : "readOnly",
                HTTP_SHARE_FILE: e.share_file
            }
        }

        function t(e) {
            return e ? "no_sdcard" == e.result ? $.extend(unknownErrorObject, {
                errorType: "no_sdcard"
            }) : {
                result: !0
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getPortFilter() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "IPPortFilterEnable,DefaultFirewallPolicy,IPPortFilterRules_0,IPPortFilterRules_1,IPPortFilterRules_2,IPPortFilterRules_3,IPPortFilterRules_4,IPPortFilterRules_5,IPPortFilterRules_6,IPPortFilterRules_7,IPPortFilterRules_8,IPPortFilterRules_9", config.USE_IPV6_INTERFACE && (n.cmd += ",IPPortFilterRulesv6_0,IPPortFilterRulesv6_1,IPPortFilterRulesv6_2,IPPortFilterRulesv6_3,IPPortFilterRulesv6_4,IPPortFilterRulesv6_5,IPPortFilterRulesv6_6,IPPortFilterRulesv6_7,IPPortFilterRulesv6_8,IPPortFilterRulesv6_9"), n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                t.portFilterEnable = e.IPPortFilterEnable, t.defaultPolicy = e.DefaultFirewallPolicy;
                var r = [];
                if ("" != e.IPPortFilterRules_0 && r.push([0, e.IPPortFilterRules_0]), "" != e.IPPortFilterRules_1 && r.push([1, e.IPPortFilterRules_1]), "" != e.IPPortFilterRules_2 && r.push([2, e.IPPortFilterRules_2]), "" != e.IPPortFilterRules_3 && r.push([3, e.IPPortFilterRules_3]), "" != e.IPPortFilterRules_4 && r.push([4, e.IPPortFilterRules_4]), "" != e.IPPortFilterRules_5 && r.push([5, e.IPPortFilterRules_5]), "" != e.IPPortFilterRules_6 && r.push([6, e.IPPortFilterRules_6]), "" != e.IPPortFilterRules_7 && r.push([7, e.IPPortFilterRules_7]), "" != e.IPPortFilterRules_8 && r.push([8, e.IPPortFilterRules_8]), "" != e.IPPortFilterRules_9 && r.push([9, e.IPPortFilterRules_9]), t.portFilterRules = n(r, "IPv4"), config.USE_IPV6_INTERFACE) {
                    var i = [];
                    "" != e.IPPortFilterRulesv6_0 && i.push([10, e.IPPortFilterRulesv6_0]), "" != e.IPPortFilterRulesv6_1 && i.push([11, e.IPPortFilterRulesv6_1]), "" != e.IPPortFilterRulesv6_2 && i.push([12, e.IPPortFilterRulesv6_2]), "" != e.IPPortFilterRulesv6_3 && i.push([13, e.IPPortFilterRulesv6_3]), "" != e.IPPortFilterRulesv6_4 && i.push([14, e.IPPortFilterRulesv6_4]), "" != e.IPPortFilterRulesv6_5 && i.push([15, e.IPPortFilterRulesv6_5]), "" != e.IPPortFilterRulesv6_6 && i.push([16, e.IPPortFilterRulesv6_6]), "" != e.IPPortFilterRulesv6_7 && i.push([17, e.IPPortFilterRulesv6_7]), "" != e.IPPortFilterRulesv6_8 && i.push([18, e.IPPortFilterRulesv6_8]), "" != e.IPPortFilterRulesv6_9 && i.push([19, e.IPPortFilterRulesv6_9]), t.portFilterRules = _.union(t.portFilterRules, n(i, "IPv6"))
                }
                return t
            }
            return unknownErrorObject
        }

        function n(e, t) {
            var n = [];
            if (e && e.length > 0)
                for (var r = 0; r < e.length; r++) {
                    var i = {},
                        o = e[r][1].split(",");
                    i.index = e[r][0], i.macAddress = o[11], i.destIpAddress = "any/0" == o[4] ? "" : o[4], i.sourceIpAddress = "any/0" == o[0] ? "" : o[0], i.destPortRange = "0" == o[6] ? "" : o[6] + " - " + o[7], i.sourcePortRange = "0" == o[2] ? "" : o[2] + " - " + o[3], i.action = 1 == o[9] ? "filter_accept" : "filter_drop", i.protocol = transProtocol(o[8]), i.comment = o[10], i.ipType = t, n.push(i)
                }
            return n
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setPortFilterBasic() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "BASIC_SETTING", n.portFilterEnabled = e.portFilterEnable, n.defaultFirewallPolicy = e.defaultPolicy, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setPortFilter() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, config.USE_IPV6_INTERFACE ? (n.goformId = "ADD_IP_PORT_FILETER_V4V6", n.ip_version = e.ipType) : n.goformId = "ADD_IP_PORT_FILETER", n.mac_address = e.macAddress, n.dip_address = e.destIpAddress, n.sip_address = e.sourceIpAddress, n.dFromPort = e.destPortStart, n.dToPort = e.destPortEnd, n.sFromPort = e.sourcePortStart, n.sToPort = e.sourcePortEnd, n.action = e.action, n.protocol = e.protocol, n.comment = e.comment, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function deleteFilterRules() {
        function e(e, t) {
            var n = {};
            n.isTest = isTest;
            var r = _.filter(e.indexs, function (e) {
                return 1 == e.length
            });
            if (config.USE_IPV6_INTERFACE) {
                n.goformId = "DEL_IP_PORT_FILETER_V4V6";
                var i = [];
                _.each(e.indexs, function (e) {
                    2 == e.length && i.push(e.substring(1))
                }), n.delete_id_v6 = i.length > 0 ? i.join(";") + ";" : ""
            } else n.goformId = "DEL_IP_PORT_FILETER";
            return n.delete_id = r.length > 0 ? r.join(";") + ";" : "", n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getWifiAdvance() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "WirelessMode,CountryCode,Channel,HT_MCS,wifi_band,wifi_11n_cap,MAX_Access_num,m_MAX_Access_num,wifi_attr_max_station_number,m_ssid_enable,wan_active_band,m_band_enable,m_WirelessMode,m_CountryCode,m_Channel,m_wifi_band,m_wifi_11n_cap", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                return {
                    multi_ssid_enable: e.m_ssid_enable,
                    wan_active_band: e.wan_active_band,
                    mul_band_enable: e.m_band_enable,
                    mode: e.WirelessMode,
                    countryCode: e.CountryCode,
                    channel: e.Channel,
                    rate: e.HT_MCS,
                    wifiBand: "a" == e.wifi_band ? "a" : "b",
                    bandwidth: e.wifi_11n_cap,
                    MAX_Station_num: $.isNumeric(e.wifi_attr_max_station_number) ? e.wifi_attr_max_station_number : config.MAX_STATION_NUMBER,
                    MAX_Access_num: e.MAX_Access_num,
                    m_MAX_Access_num: e.m_MAX_Access_num,
                    guestMode: e.m_WirelessMode,
                    guestCountryCode: "" == e.m_CountryCode ? "CN" : e.m_CountryCode,
                    guestChannel: e.m_Channel,
                    guestWifiBand: "a" == e.m_wifi_band ? "a" : "b",
                    guestBandwidth: e.m_wifi_11n_cap
                }
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setWifiAdvance24G5G() {
        function e(e) {
            var t = {
                goformId: "WIFI_ADVANCE_SET",
                isTest: isTest,
                wifiMode: e.mode,
                countryCode: e.countryCode,
                m_WirelessMode: e.m_WirelessMode,
                m_CountryCode: e.m_CountryCode
            };
            return config.WIFI_BAND_SUPPORT && (t.wifi_band = e.wifiBand, t.m_wifi_band = e.m_wifi_band), t.selectedChannel = e.channel, t.m_Channel = e.m_Channel, config.WIFI_BAND_SUPPORT && "a" == e.wifiBand || (t.abg_rate = e.rate), config.WIFI_BANDWIDTH_SUPPORT && (t.wifi_11n_cap = e.bandwidth, t.m_wifi_11n_cap = e.m_wifi_11n_cap), t
        }

        function t(e) {
            return e || unknownErrorObject
        }
        doStuffAndCheckServerIsOnline(arguments, e, t)
    }

    function setWifiAdvance() {
        function e(e) {
            var t = {
                goformId: "SET_WIFI_INFO",
                isTest: isTest,
                wifiMode: e.mode,
                countryCode: e.countryCode,
                MAX_Access_num: e.station,
                m_MAX_Access_num: e.m_station
            };
            return config.WIFI_BAND_SUPPORT && (t.wifi_band = e.wifiBand), t.selectedChannel = e.channel, config.WIFI_BAND_SUPPORT && "a" == e.wifiBand || (t.abg_rate = e.rate), config.WIFI_BANDWIDTH_SUPPORT && (t.wifi_11n_cap = e.bandwidth), t
        }

        function t(e) {
            return e || unknownErrorObject
        }
        doStuffAndCheckServerIsOnline(arguments, e, t)
    }

    function getDeviceInfo() {
        return getDeviceInfoTrue(), deviceInfo2
    }

    function getDeviceInfo() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "wifi_onoff_state,guest_switch,wifi_chip1_ssid2_max_access_num,m_SSID2,wifi_chip2_ssid2_max_access_num,wifi_chip1_ssid1_wifi_coverage,apn_interface_version,m_ssid_enable,imei,network_type,rssi,rscp,lte_rsrp,imsi,sim_imsi,cr_version,wa_version,hardware_version,web_version,wa_inner_version,wifi_chip1_ssid1_max_access_num,wifi_chip1_ssid1_ssid,wifi_chip1_ssid1_auth_mode,wifi_chip1_ssid1_password_encode,wifi_chip2_ssid1_ssid,wifi_chip2_ssid1_auth_mode,m_HideSSID,wifi_chip2_ssid1_password_encode,wifi_chip2_ssid1_max_access_num,lan_ipaddr,lan_ipaddr,mac_address,msisdn,LocalDomain,wan_ipaddr,static_wan_ipaddr,ipv6_wan_ipaddr,ipv6_pdp_type,ipv6_pdp_type_ui,pdp_type,pdp_type_ui,opms_wan_mode,opms_wan_auto_mode,ppp_status,Z5g_snr,Z5g_rsrp,wan_lte_ca,lte_ca_pcell_band,lte_ca_pcell_bandwidth,lte_ca_scell_band,lte_ca_scell_bandwidth,lte_ca_pcell_arfcn,lte_ca_scell_arfcn,lte_multi_ca_scell_info,wan_active_band,wifi_onoff_state,guest_switch,wifi_chip1_ssid2_max_access_num,wifi_chip2_ssid2_max_access_num,wifi_chip1_ssid1_wifi_coverage,wifi_chip1_ssid1_max_access_num,wifi_chip1_ssid1_ssid,wifi_chip1_ssid1_auth_mode,wifi_chip1_ssid1_password_encode,wifi_chip2_ssid1_ssid,wifi_chip2_ssid1_auth_mode,wifi_chip2_ssid1_password_encode,wifi_chip2_ssid1_max_access_num,wifi_chip1_ssid2_ssid,wifi_chip2_ssid2_ssid,wifi_chip1_ssid1_switch_onoff,wifi_chip2_ssid1_switch_onoff,wifi_chip1_ssid2_switch_onoff,wifi_chip2_ssid2_switch_onoff,Z5g_SINR,station_ip_addr,wifi_onoff_wifi5g_by_n79_mutex",
                multi_data: 1
            }
        }

        function t(e) {
            return e ? {
                wifi_enable: e.wifi_onoff_state,
                multi_ssid_enable: e.guest_switch,
                ssid: e.wifi_chip1_ssid1_ssid,
                ssidGuest: e.wifi_chip1_ssid2_ssid,
                authMode: e.wifi_chip1_ssid1_auth_mode,
                passPhrase: Base64.decode(e.wifi_chip1_ssid1_password_encode),
                m_authMode: e.wifi_chip2_ssid1_auth_mode,
                m_passPhrase: Base64.decode(e.wifi_chip2_ssid1_password_encode),
                chip1_ssid1_enable: e.wifi_chip1_ssid1_switch_onoff,
                chip2_ssid1_enable: e.wifi_chip2_ssid1_switch_onoff,
                chip1_ssid2_enable: e.wifi_chip1_ssid2_switch_onoff,
                chip2_ssid2_enable: e.wifi_chip2_ssid2_switch_onoff,
                m_ssid: e.wifi_chip2_ssid1_ssid,
                m_ssid_guest: e.wifi_chip2_ssid2_ssid,
                m_max_access_num: e.wifi_chip2_ssid1_max_access_num,
                m_max_access_num_guest: e.wifi_chip2_ssid2_max_access_num,
                ipAddress: e.lan_ipaddr,
                wanIpAddress: e.wan_ipaddr,
                staticWanIpAddress: e.static_wan_ipaddr,
                ipv6WanIpAddress: e.ipv6_wan_ipaddr,
                ipv6PdpType: e.ipv6_pdp_type,
                macAddress: e.mac_address,
                simSerialNumber: e.msisdn,
                lanDomain: e.LocalDomain,
                imei: e.imei,
                signal: convertSignal(e),
                imsi: e.imsi || e.sim_imsi,
                sw_version: e.wa_inner_version || e.cr_version,
                fw_version: e.wa_version,
                hw_version: e.hardware_version,
                max_access_num: e.wifi_chip1_ssid1_max_access_num,
                max_access_num_guest: e.wifi_chip1_ssid2_max_access_num,
                wifiRange: e.wifi_chip1_ssid1_wifi_coverage,
                pdpType: e.apn_interface_version >= 2 ? e.pdp_type_ui : e.pdp_type,
                opms_wan_mode: e.opms_wan_mode,
                opms_wan_auto_mode: e.opms_wan_auto_mode,
                connectStatus: e.ppp_status,
                Z5g_SINR: e.Z5g_SINR,
                Z5g_rsrp: e.Z5g_rsrp,
                network_type: e.network_type,
                wan_lte_ca: e.wan_lte_ca,
                lte_ca_pcell_band: e.lte_ca_pcell_band,
                lte_ca_pcell_bandwidth: e.lte_ca_pcell_bandwidth,
                lte_ca_scell_band: e.lte_ca_scell_band,
                lte_ca_scell_bandwidth: e.lte_ca_scell_bandwidth,
                lte_ca_pcell_arfcn: e.lte_ca_pcell_arfcn,
                lte_ca_scell_arfcn: e.lte_ca_scell_arfcn,
                lte_multi_ca_scell_info: e.lte_multi_ca_scell_info,
                wan_active_band: e.wan_active_band,
                station_ip_addr: e.station_ip_addr,
                wifi_onoff_wifi5g_by_n79_mutex: e.wifi_onoff_wifi5g_by_n79_mutex
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getWifiRange() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "wifi_coverage", n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.wifiRangeMode = e.wifi_coverage, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setWifiRange() {
        function e(e, t) {
            var n = {};
            return n.goformId = "SET_WIFI_COVERAGE", n.isTest = isTest, n.wifi_coverage = e.wifiRangeMode, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getWifiCoverageInfo() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "queryWiFiCoverage", n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.wifiRangeMode = e.WiFiCoverage, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setWifiCoverageInfo() {
        function e(e, t) {
            var n = {};
            return n.goformId = "setWiFiCoverage", n.isTest = isTest, n.WiFiCoverage = e.WiFiCoverage, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getAutoPowerSave() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "auto_power_save", n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.autoPowerSaveMode = e.auto_power_save, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setAutoPowerSave() {
        function e(e, t) {
            var n = {};
            return n.goformId = "SET_AUTO_POWER_SAVE", n.isTest = isTest, n.auto_power_save = e.autoPowerSaveMode, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getUpnpSetting() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "upnpEnabled", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.upnpSetting = "1" == e.upnpEnabled ? "1" : "0", t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setUpnpSetting() {
        function e(e, t) {
            var n = {};
            return n.goformId = "UPNP_SETTING", n.isTest = isTest, n.upnp_setting_option = e.upnpSetting, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getDmzSetting() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "DMZEnable,DMZIPAddress,lan_ipaddr,lan_netmask", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.dmzSetting = "1" == e.DMZEnable ? "1" : "0", t.ipAddress = e.DMZIPAddress, t.gatewayIpAddress = e.lan_ipaddr, t.gatewaySubnetMask = e.lan_netmask, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setDmzSetting() {
        function e(e, t) {
            var n = {};
            return n.goformId = "DMZ_SETTING", n.isTest = isTest, n.DMZEnabled = e.dmzSetting, "1" == n.DMZEnabled && (n.DMZIPAddress = e.ipAddress), n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getPortMap() {
        function prepare(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "PortMapEnable,portmap_rule_num,PortMapRules_0,PortMapRules_1,PortMapRules_2,PortMapRules_3,PortMapRules_4,PortMapRules_5,PortMapRules_6,PortMapRules_7,PortMapRules_8,PortMapRules_9,PortMapRules_10,PortMapRules_11,PortMapRules_12,PortMapRules_13,PortMapRules_14,PortMapRules_15,PortMapRules_16,PortMapRules_17,PortMapRules_18,PortMapRules_19", n.multi_data = 1, n
        }

        function deal(data) {
            if (data) {
                var result = {};
                result.portMapEnable = data.PortMapEnable;
                var rules = [];
                "" == data.portmap_rule_num && (data.portmap_rule_num = "10"), result.portmap_rule_num = data.portmap_rule_num;
                for (var i = 0; i < data.portmap_rule_num; i++) {
                    var PortMapRules = eval("data.PortMapRules_" + i);
                    "" != PortMapRules && rules.push([i, PortMapRules])
                }
                return result.portMapRules = parsePortMapRules(rules), result
            }
            return unknownErrorObject
        }

        function parsePortMapRules(e) {
            var t = [];
            if (e && e.length > 0)
                for (var n = 0; n < e.length; n++) {
                    var r = {},
                        i = e[n][1].split(",");
                    r.index = e[n][0], r.sourcePort = i[1], r.destIpAddress = i[0], r.destPort = i[2], r.protocol = transProtocol(i[3]), r.comment = i[4], t.push(r)
                }
            return t
        }
        return doStuff(arguments, {}, prepare, deal, null, !1)
    }

    function setPortMap() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "ADD_PORT_MAP", n.portMapEnabled = e.portMapEnable, n.fromPort = e.sourcePort, n.ip_address = e.destIpAddress, n.toPort = e.destPort, n.protocol = e.protocol, n.comment = e.comment, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function enablePortMap() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "ADD_PORT_MAP", n.portMapEnabled = e.portMapEnable, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function deleteMapRules() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "DEL_PORT_MAP", n.delete_id = e.indexs.join(";") + ";", n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getTrafficAlertInfo() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "data_volume_limit_switch,data_volume_limit_unit,data_volume_limit_size,data_volume_alert_percent,monthly_tx_bytes,monthly_rx_bytes,monthly_time,wan_auto_clear_flow_data_switch,traffic_clear_date",
                multi_data: 1
            }
        }

        function t(e) {
            if (e) {
                var t = "data" == e.data_volume_limit_unit;
                return {
                    dataLimitChecked: e.data_volume_limit_switch,
                    dataLimitTypeChecked: t ? "1" : "0",
                    limitDataMonth: t ? e.data_volume_limit_size : "0",
                    alertDataReach: t ? e.data_volume_alert_percent : "0",
                    limitTimeMonth: t ? "0" : e.data_volume_limit_size,
                    alertTimeReach: t ? "0" : e.data_volume_alert_percent,
                    monthlySent: "" == e.monthly_tx_bytes ? 0 : e.monthly_tx_bytes,
                    monthlyReceived: "" == e.monthly_rx_bytes ? 0 : e.monthly_rx_bytes,
                    monthlyConnectedTime: "" == e.monthly_time ? 0 : e.monthly_time,
                    autoClearTraffic: e.wan_auto_clear_flow_data_switch,
                    traffic_clear_date: e.traffic_clear_date
                }
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setTrafficAlertInfo() {
        function e(e, t) {
            var n = "1" == e.dataLimitTypeChecked,
                r = {
                    isTest: isTest,
                    goformId: "DATA_LIMIT_SETTING"
                };
            return "1" == e.dataLimitChecked && (r.data_volume_limit_unit = n ? "data" : "time", r.data_volume_limit_size = n ? e.limitDataMonth : e.limitTimeMonth, r.data_volume_alert_percent = n ? e.alertDataReach : e.alertTimeReach), r.wan_auto_clear_flow_data_switch = e.wan_auto_clear_flow_data_switch, r.traffic_clear_date = e.traffic_clear_date, -1 != config.DEVICE.toLowerCase().indexOf("cpe") ? r.data_volume_limit_switch = e.dataLimitChecked : (r.data_volume_limit_switch = e.dataLimitChecked, r.notify_deviceui_enable = "0"), r
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getUSSDResponse() {
        function e(e, t) {
            return "send" == e.sendOrReply ? {
                isTest: isTest,
                goformId: "USSD_PROCESS",
                USSD_operator: e.operator,
                USSD_send_number: e.strUSSDCommand,
                notCallback: !0
            } : "reply" == e.sendOrReply ? {
                isTest: isTest,
                goformId: "USSD_PROCESS",
                USSD_operator: e.operator,
                USSD_reply_number: e.strUSSDCommand,
                notCallback: !0
            } : void 0
        }

        function t(e) {
            if (!e) return void n(!1, "ussd_fail");
            "success" == e.result ? (callbackTemp = n, getResponse()) : n(!1, "ussd_fail")
        }
        var n = arguments[1];
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getResponse() {
        $.ajax({
            url: "/goform/goform_get_cmd_process",
            data: {
                cmd: "ussd_write_flag"
            },
            cache: !1,
            async: !0,
            dataType: "json",
            success: function (e) {
                "1" == e.ussd_write_flag ? callbackTemp(!1, "ussd_no_service") : "4" == e.ussd_write_flag || "unknown" == e.ussd_write_flag || "3" == e.ussd_write_flag ? callbackTemp(!1, "ussd_timeout") : "15" == e.ussd_write_flag ? setTimeout(getResponse, 1e3) : "10" == e.ussd_write_flag ? callbackTemp(!1, "ussd_retry") : "99" == e.ussd_write_flag ? callbackTemp(!1, "ussd_unsupport") : "41" == e.ussd_write_flag ? callbackTemp(!1, "operation_not_supported") : "2" == e.ussd_write_flag ? callbackTemp(!1, "network_terminated") : "16" == e.ussd_write_flag ? $.ajax({
                    url: "/goform/goform_get_cmd_process",
                    data: {
                        cmd: "ussd_data_info"
                    },
                    dataType: "json",
                    async: !0,
                    cache: !1,
                    success: function (e) {
                        var t = {};
                        t.data = e.ussd_data, t.ussd_action = e.ussd_action, t.ussd_dcs = e.ussd_dcs, callbackTemp(!0, t)
                    },
                    error: function () {
                        callbackTemp(!1, "ussd_info_error")
                    }
                }) : callbackTemp(!1, "ussd_fail")
            },
            error: function () {
                callbackTemp(!1, "ussd_fail")
            }
        })
    }

    function USSDReplyCancel(e) {
        function t() {
            $.ajax({
                url: "/goform/goform_get_cmd_process",
                data: {
                    cmd: "ussd_write_flag"
                },
                cache: !1,
                async: !0,
                dataType: "json",
                success: function (n) {
                    "15" == n.ussd_write_flag ? setTimeout(t, 1e3) : e("13" == n.ussd_write_flag ? !0 : !1)
                },
                error: function () {
                    e(!1)
                }
            })
        }
        var n = {};
        if (n.goformId = "USSD_PROCESS", n.USSD_operator = "ussd_cancel", config.ACCESSIBLE_ID_SUPPORT) {
            var r = hex_md5(rd0 + rd1),
                i = getParams({
                    nv: "RD"
                }).RD,
                o = hex_md5(r + i);
            n.AD = o
        }
        $.ajax({
            url: "/goform/goform_set_cmd_process",
            data: n,
            cache: !1,
            dataType: "json",
            success: function (n) {
                "success" == n.result ? t() : e(!1)
            }
        })
    }

    function getDlnaSetting() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "dlna_language,dlna_name,dlna_share_audio,dlna_share_video,dlna_share_image,dlna_scan_state,sd_card_state,sdcard_mode_option,dlna_rescan_end", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                return {
                    language: e.dlna_language,
                    deviceName: e.dlna_name,
                    shareAudio: e.dlna_share_audio,
                    shareVideo: e.dlna_share_video,
                    shareImage: e.dlna_share_image,
                    needRescan: "1" == e.dlna_scan_state,
                    dlnaEnable: !0,
                    dlna_scan: e.dlna_rescan_end
                }
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setDlnaSetting() {
        function e(e, t) {
            return {
                isTest: isTest,
                notCallback: !0,
                goformId: "DLNA_SETTINGS",
                dlna_language: e.language,
                dlna_name: e.deviceName,
                dlna_share_audio: e.shareAudio,
                dlna_share_video: e.shareVideo,
                dlna_share_image: e.shareImage
            }
        }

        function t(e) {
            e && "success" == e.result ? addTimerThings("dlna_rescan_end", n) : r(e)
        }

        function n(e) {
            checkRescanStatus(e, r, n)
        }
        var r = arguments[1];
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function rescanDlna() {
        function e(e, t) {
            return {
                isTest: isTest,
                notCallback: !0,
                goformId: "DLNA_RESCAN"
            }
        }

        function t(e) {
            e && "success" == e.result ? addTimerThings("dlna_rescan_end", n) : r(e)
        }

        function n(e) {
            checkRescanStatus(e, r, n)
        }
        var r = arguments[1];
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function checkRescanStatus(e, t, n) {
        "1" == e.dlna_rescan_end && (removeTimerThings("dlna_rescan_end", n), t({
            result: "success"
        }))
    }

    function unlockNetwork() {
        function e(e) {
            return {
                isTest: isTest,
                goformId: "UNLOCK_NETWORK",
                notCallback: !0,
                unlock_network_code: e.unlock_network_code
            }
        }

        function t(e) {
            e && "success" == e.result ? addCallback(n) : r({
                result: "fail"
            })
        }

        function n() {
            i > 5 ? (removeCallback(n), r({
                result: "fail"
            })) : "modem_imsi_waitnck" != timerInfo.simStatus && (removeCallback(n), r({
                result: "success"
            })), i++
        }
        var r = arguments[1],
            i = 0;
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getNetworkUnlockTimes() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "unlock_nck_time"
            }
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setUpdateInfoWarning() {
        function e(e) {
            return {
                isTest: isTest,
                goformId: "SET_UPGRADE_NOTICE",
                upgrade_notice_flag: e.upgrade_notice_flag,
                notCallback: !0
            }
        }

        function t(e) {
            n("success" == e.result ? !0 : !1)
        }
        var n = arguments[1];
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getUpdateInfoWarning() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "upgrade_notice_flag"
            }
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getAPStationBasic() {
        function e(e, t) {
            return {
                isTest: isTest,
                multi_data: 1,
                cmd: "wifi_sta_connection,ap_station_mode,m_ssid_enable"
            }
        }

        function t(e) {
            return e ? {
                multi_ssid_enable: e.m_ssid_enable,
                ap_station_enable: e.wifi_sta_connection,
                ap_station_mode: e.ap_station_mode
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setAPStationBasic() {
        function e(e) {
            return {
                isTest: isTest,
                goformId: "WIFI_STA_CONTROL",
                wifi_sta_connection: e.ap_station_enable,
                ap_station_mode: e.ap_station_mode
            }
        }

        function t(e) {
            return e && "success" == e.result ? (timerInfo.ap_station_enable = 1 == n.ap_station_enable, timerInfo.ap_station_mode = n.ap_station_mode, e) : unknownErrorObject
        }
        var n = arguments[0];
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function refreshAPStationStatus() {
        return getAPStationBasic({}, function (e) {
            timerInfo.ap_station_enable = 1 == e.ap_station_enable, timerInfo.ap_station_mode = e.ap_station_mode
        })
    }

    function getHotspotList() {
        function e(e, t) {
            return {
                isTest: isTest,
                multi_data: 1,
                cmd: "wifi_profile,wifi_profile1,wifi_profile2,wifi_profile3,wifi_profile4,wifi_profile5,wifi_profile_num"
            }
        }

        function t(e) {
            if (e) {
                for (var t = [], n = 0; n <= 5; n++) {
                    var r = "";
                    r = 0 == n ? e.wifi_profile : e["wifi_profile" + n];
                    for (var i = r.split(";"), o = 0; o < i.length; o++) {
                        var s = i[o].split(",");
                        if (!s[0]) break;
                        var _ = {
                            profileName: s[0],
                            fromProvider: s[1],
                            connectStatus: s[2],
                            signal: s[3],
                            ssid: s[4],
                            authMode: s[5],
                            encryptType: s[6],
                            password: "0" == s[7] ? "" : s[7],
                            keyID: s[8]
                        };
                        t.push(_)
                    }
                }
                return {
                    hotspotList: t
                }
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function searchHotspot() {
        function e(e) {
            return {
                isTest: isTest,
                goformId: "WLAN_SET_STA_REFRESH"
            }
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getSearchHotspotList() {
        function e(e, t) {
            return {
                isTest: isTest,
                multi_data: 1,
                cmd: "scan_finish,EX_APLIST,EX_APLIST1"
            }
        }

        function t(e) {
            if (e) {
                if ("0" == e.scan_finish) return {
                    scan_finish: !1,
                    hotspotList: []
                };
                for (var t = [], n = 0; n <= 1; n++) {
                    var r;
                    r = 0 == n ? e.EX_APLIST : e.EX_APLIST1;
                    for (var i = r.split(";"), o = 0; o < i.length; o++) {
                        var s = i[o].split(",");
                        if (!s[0]) break;
                        var _ = {
                            fromProvider: s[0],
                            connectStatus: s[1],
                            ssid: s[2],
                            signal: s[3],
                            channel: s[4],
                            authMode: s[5],
                            encryptType: s[6]
                        };
                        t.push(_)
                    }
                }
                return {
                    scan_finish: !0,
                    hotspotList: t
                }
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getSearchHotspotListWithoutScanFinish() {
        function e(e, t) {
            return {
                isTest: isTest,
                multi_data: 1,
                cmd: "EX_APLIST,EX_APLIST1"
            }
        }

        function t(e) {
            if (e) {
                for (var t = [], n = 0; n <= 1; n++) {
                    var r;
                    r = 0 == n ? e.EX_APLIST : e.EX_APLIST1;
                    for (var i = r.split(";"), o = 0; o < i.length; o++) {
                        var s = i[o].split(",");
                        if (!s[0]) break;
                        var _ = {
                            fromProvider: s[0],
                            connectStatus: s[1],
                            ssid: s[2],
                            signal: s[3],
                            channel: s[4],
                            authMode: s[5],
                            encryptType: s[6]
                        };
                        t.push(_)
                    }
                }
                return {
                    hotspotList: t
                }
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function creatHotspotString(e) {
        var t = [];
        return t.push(e.profileName), t.push(e.fromProvider || "0"), t.push(e.connectStatus || "0"), t.push(e.signal), t.push(e.ssid), t.push(e.authMode), t.push(e.encryptType), t.push(e.password || "0"), t.push(e.keyID), t.join(",")
    }

    function saveHotspot() {
        function e(e) {
            var t = e.apList,
                n = "modify";
            if ("2" == e.saveAddFlag) {
                n = "add", t.reverse();
                t.push({
                    profileName: e.profileName,
                    fromProvider: "0",
                    connectStatus: "0",
                    signal: e.signal,
                    ssid: e.ssid,
                    authMode: e.authMode,
                    encryptType: e.encryptType,
                    password: e.password || "0",
                    keyID: e.keyID
                }), t.reverse()
            }
            for (var r = {
                    profile0: [],
                    profile1: [],
                    profile2: [],
                    profile3: [],
                    profile4: [],
                    profile5: []
                }, i = "", o = 0; o < t.length; o++) {
                var s = "";
                e.profileNameInit == t[o].profileName ? (s = creatHotspotString(e), i = s) : s = creatHotspotString(t[o]);
                r["profile" + parseInt(o / 5)].push(s)
            }
            return {
                isTest: isTest,
                goformId: "WIFI_SPOT_PROFILE_UPDATE",
                wifi_profile: r.profile0.join(";"),
                wifi_profile1: r.profile1.join(";"),
                wifi_profile2: r.profile2.join(";"),
                wifi_profile3: r.profile3.join(";"),
                wifi_profile4: r.profile4.join(";"),
                wifi_profile5: r.profile5.join(";"),
                wifi_profile_num: t.length,
                wifi_update_profile: i,
                action: n
            }
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function deleteHotspot() {
        function e(e) {
            for (var t = e.apList, n = {
                    profile0: [],
                    profile1: [],
                    profile2: [],
                    profile3: [],
                    profile4: [],
                    profile5: []
                }, r = !1, i = "", o = 0; o < t.length; o++) {
                var s = creatHotspotString(t[o]);
                if (t[o].profileName != e.profileName) {
                    var _ = o;
                    r && (_ = o - 1);
                    n["profile" + parseInt(_ / 5)].push(s)
                } else r = !0, i = s
            }
            var a = r ? t.length - 1 : t.length;
            return {
                isTest: isTest,
                goformId: "WIFI_SPOT_PROFILE_UPDATE",
                wifi_profile: n.profile0.join(";"),
                wifi_profile1: n.profile1.join(";"),
                wifi_profile2: n.profile2.join(";"),
                wifi_profile3: n.profile3.join(";"),
                wifi_profile4: n.profile4.join(";"),
                wifi_profile5: n.profile5.join(";"),
                wifi_profile_num: a,
                wifi_update_profile: i,
                action: "delete"
            }
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function connectHotspot() {
        function e(e) {
            return {
                isTest: isTest,
                goformId: "WLAN_SET_STA_CON",
                EX_SSID1: e.EX_SSID1,
                EX_AuthMode: e.EX_AuthMode,
                EX_EncrypType: e.EX_EncrypType,
                EX_DefaultKeyID: e.EX_DefaultKeyID,
                EX_WEPKEY: e.EX_WEPKEY,
                EX_WPAPSK1: e.EX_WPAPSK1,
                EX_wifi_profile: e.EX_wifi_profile
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function disconnectHotspot() {
        function e(e) {
            return {
                isTest: isTest,
                goformId: "WLAN_SET_STA_DISCON"
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getOpMode() {
        function e(e, t) {
            return {
                isTest: isTest,
                multi_data: 1,
                cmd: "opms_wan_mode,opms_wan_auto_mode,loginfo,ppp_status,ethernet_port_specified"
            }
        }

        function t(e) {
            if (e) {
                var t = {};
                return "AUTO" == e.opms_wan_mode ? t.opms_wan_mode = e.opms_wan_auto_mode ? e.opms_wan_auto_mode : "" : t.opms_wan_mode = e.opms_wan_mode ? e.opms_wan_mode : "", t.loginfo = e.loginfo, t.ppp_status = e.ppp_status, t.ethernet_port_specified = "1" == e.ethernet_port_specified ? e.ethernet_port_specified : "0", t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function SetOperationMode(e, t) {
        function n(e) {
            return $.extend({
                isTest: isTest,
                goformId: "OPERATION_MODE"
            }, e)
        }

        function r(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, n, r, null, !0)
    }

    function SendUpgradeMessage(e, t) {
        function n(e) {
            return $.extend({
                isTest: isTest
            }, e)
        }

        function r(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, n, r, null, !0)
    }

    function getPppoeParams() {
        function e(e, t) {
            return {
                isTest: isTest,
                multi_data: 1,
                cmd: "opms_wan_auto_mode,pppoe_username,pppoe_password,pppoe_dial_mode,pppoe_status,static_wan_ipaddr,static_wan_netmask,static_wan_gateway,static_wan_primary_dns,static_wan_secondary_dns,dhcp_wan_status,static_wan_status"
            }
        }

        function t(e) {
            return e ? {
                opms_wan_auto_mode: e.opms_wan_auto_mode,
                pppoe_username: e.pppoe_username,
                pppoe_password: e.pppoe_password,
                pppoe_dial_mode: e.pppoe_dial_mode,
                ppp_status: e.pppoe_status,
                static_wan_ipaddr: e.static_wan_ipaddr,
                static_wan_netmask: e.static_wan_netmask,
                static_wan_gateway: e.static_wan_gateway,
                static_wan_primary_dns: e.static_wan_primary_dns,
                static_wan_secondary_dns: e.static_wan_secondary_dns,
                dhcp_wan_status: e.dhcp_wan_status,
                static_wan_status: e.static_wan_status
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setPppoeDialMode(e, t) {
        function n(e) {
            return $.extend({
                isTest: isTest,
                notCallback: !0
            }, e)
        }

        function r(n) {
            "success" == n.result ? "WAN_GATEWAYMODE_PPPOE" == e.goformId && "connect" == e.action_link ? (showLoading("connecting"), checkPoint = (new Date).getTime(), addCallback(i)) : "WAN_GATEWAYMODE_PPPOE" == e.goformId && "disconnect" == e.action_link ? (checkPoint = (new Date).getTime(), addCallback(o)) : t({
                result: !0
            }) : t({
                result: !1
            })
        }

        function i(e) {
            "ppp_connecting" == e.pppoe_status ? timerInfo.connectStatus = "ppp_connecting" : checkConnectedStatus(e.pppoe_status) ? (removeCallback(i), timerInfo.connectStatus = "ppp_connected", t({
                result: !0,
                status: timerInfo.connectStatus
            })) : (new Date).getTime() - checkPoint < 1e4 ? timerInfo.connectStatus = "ppp_connecting" : (removeCallback(i), t({
                result: !1
            }))
        }

        function o(e) {
            "ppp_disconnecting" == e.pppoe_status ? timerInfo.connectStatus = "ppp_disconnecting" : "ppp_disconnected" == e.pppoe_status ? (removeCallback(o), timerInfo.connectStatus = "ppp_disconnected", t({
                result: !0,
                status: timerInfo.connectStatus
            })) : (new Date).getTime() - checkPoint < 1e4 ? timerInfo.connectStatus = "ppp_disconnecting" : (removeCallback(o), t({
                result: !1
            }))
        }
        return doStuff(arguments, {}, n, r, null, !0)
    }

    function getSntpParams(e, t) {
        function n(e, t) {
            return {
                isTest: isTest,
                multi_data: 1,
                cmd: "sntp_year,sntp_month_temp,sntp_day,sntp_hour,sntp_minute,sntp_second,sntp_time_set_mode,sntp_server_list1,sntp_server_list2,sntp_server_list3,sntp_server_list4,sntp_server_list5,sntp_server_list6,sntp_server_list7,sntp_server_list8,sntp_server_list9,sntp_server_list10,sntp_server0,sntp_server1,sntp_server2,sntp_other_server0,sntp_other_server1,sntp_other_server2,sntp_timezone,sntp_dst_enable,ppp_status,opms_wan_mode,syn_done"
            }
        }

        function r(e) {
            if (e) {
                var t = i(e);
                return {
                    sntp_year: e.sntp_year,
                    sntp_month: e.sntp_month_temp,
                    sntp_day: e.sntp_day,
                    sntp_hour: e.sntp_hour,
                    sntp_minute: e.sntp_minute,
                    sntp_second: e.sntp_second,
                    sntp_time_set_mode: e.sntp_time_set_mode,
                    sntp_servers: t,
                    sntp_server0: e.sntp_server0,
                    sntp_server1: e.sntp_server1,
                    sntp_server2: e.sntp_server2,
                    sntp_other_server0: e.sntp_other_server0,
                    sntp_other_server1: e.sntp_other_server1,
                    sntp_other_server2: e.sntp_other_server2,
                    sntp_timezone: e.sntp_timezone,
                    sntp_dst_enable: e.sntp_dst_enable,
                    ppp_status: e.ppp_status,
                    opms_wan_mode: e.opms_wan_mode,
                    syn_done: e.syn_done
                }
            }
            return unknownErrorObject
        }

        function i(e) {
            for (var t = [], n = 0; n < 10; n++) {
                var r = "sntp_server_list" + (n + 1).toString();
                if ("" != e[r]) {
                    var i = {};
                    i.name = e[r], i.value = e[r], t.push(i)
                }
            }
            for (var o = [{
                    name: "Other",
                    value: "Other"
                }, {
                    name: "NONE",
                    value: ""
                }], s = 0; s < 2; s++) t.push(o[s]);
            return t
        }
        return doStuff(arguments, {}, n, r, null, !1)
    }

    function setSNTPDate(e, t) {
        function n(e) {
            return $.extend({
                isTest: isTest
            }, e)
        }

        function r(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, n, r, null, !0)
    }

    function setSntpSetting(e, t) {
        function n() {
            $.ajax({
                url: "/goform/goform_get_cmd_process",
                dataType: "json",
                data: {
                    cmd: "syn_done,nitz_sync_flag",
                    multi_data: "1"
                },
                cache: !1,
                async: !1,
                success: function (e) {
                    "1" == e.syn_done || "1" == e.nitz_sync_flag ? t(!0) : "0" == e.syn_done ? t(!1) : setTimeout(n, 2e3)
                },
                error: function () {
                    t(!1)
                }
            })
        }
        var r = $.extend({
            isTest: isTest
        }, e);
        if (r.isTest) result = simulate.simulateRequest(e, t, t, !0, !0), setTimeout(function () {
            t(result)
        }, getRandomInt(120) + 50);
        else {
            if (config.ACCESSIBLE_ID_SUPPORT) {
                var i = hex_md5(rd0 + rd1),
                    o = getParams({
                        nv: "RD"
                    }).RD,
                    s = hex_md5(i + o);
                r.AD = s
            }
            $.post("/goform/goform_set_cmd_process", r, function (r) {
                r && "success" == r.result ? "auto" == e.manualsettime ? setTimeout(n, 2e3) : t(!0) : t(!1)
            }, "json")
        }
    }

    function addUrlFilterRule(e, t) {
        function n(e) {
            return $.extend({
                isTest: isTest
            }, e)
        }

        function r(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, n, r, null, !0)
    }

    function getUrlFilterList() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "websURLFilters"
            }
        }

        function t(e) {
            var t = [];
            if (e) {
                if (0 == e.websURLFilters.length) return {
                    urlFilterRules: []
                };
                for (var n = e.websURLFilters.split(";"), r = 0; r < n.length; r++) {
                    var i = {};
                    i.index = r, i.url = n[r], t.push(i)
                }
                return {
                    urlFilterRules: t
                }
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function deleteSelectedRules(e, t) {
        function n(e) {
            return $.extend({
                isTest: isTest
            }, e)
        }

        function r(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, n, r, null, !0)
    }

    function getWdsInfo() {
        function e(e, t) {
            return {
                isTest: isTest,
                multi_data: "1",
                cmd: "wifi_wds_mode,wifi_wds_ssid,wifi_wds_AuthMode,wifi_wds_EncrypType,wifi_wds_WPAPSK1,RadioOff"
            }
        }

        function t(e) {
            return e ? {
                currentMode: e.wifi_wds_mode,
                wdsSSID: e.wifi_wds_ssid,
                wdsAuthMode: e.wifi_wds_AuthMode,
                wdsEncrypType: e.wifi_wds_EncrypType,
                wdsWPAPSK1: e.wifi_wds_WPAPSK1,
                RadioOff: e.RadioOff
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setWDS(e, t) {
        function n(e) {
            return $.extend({
                isTest: isTest
            }, e)
        }

        function r(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, n, r, null, !0)
    }

    function getSyslogInfo() {
        function e(e, t) {
            return {
                isTest: isTest,
                multi_data: "1",
                cmd: "syslog_mode,debug_level"
            }
        }

        function t(e) {
            return e ? {
                currentMode: e.syslog_mode,
                debugLevel: e.debug_level
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setSysLog(e, t) {
        function n(e) {
            return $.extend({
                isTest: isTest
            }, e)
        }

        function r(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, n, r, null, !0)
    }

    function getTR069Config() {
        function e(e, t) {
            return {
                isTest: isTest,
                multi_data: "1",
                cmd: "tr069_ReqURL,tr069_ServerURL,tr069_CPEPortNo,tr069_ServerUsername,tr069_ServerPassword,tr069_ConnectionRequestUname,tr069_ConnectionRequestPassword,wan_ipaddr,tr069_PeriodicInformEnable,tr069_PeriodicInformInterval,tr069_CertEnable,tr069_DataModule,tr069_Webui_DataModuleSupport"
            }
        }

        function t(e) {
            return e ? {
                tr069_ReqURL: e.tr069_ReqURL,
                serverUrl: e.tr069_ServerURL,
                tr069_CPEPortNo: e.tr069_CPEPortNo,
                serverUserName: e.tr069_ServerUsername,
                serverPassword: e.tr069_ServerPassword,
                requestUserName: e.tr069_ConnectionRequestUname,
                requestPassword: e.tr069_ConnectionRequestPassword,
                wanIpAddress: e.wan_ipaddr,
                tr069_PeriodicInformEnable: e.tr069_PeriodicInformEnable,
                tr069_PeriodicInformInterval: e.tr069_PeriodicInformInterval,
                tr069_CertEnable: e.tr069_CertEnable,
                tr069_DataModule: e.tr069_DataModule,
                tr069_Webui_DataModuleSupport: e.tr069_Webui_DataModuleSupport
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setTR069Configuration(e, t) {
        function n(e) {
            return $.extend({
                isTest: isTest
            }, e)
        }

        function r(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, n, r, null, !0)
    }

    function getVoipSettings() {
        function e(e, t) {
            return {
                isTest: isTest,
                multi_data: "1",
                cmd: "voip_display_name,voip_user_name,voip_authorization_user_name,voip_authorization_password,voip_registration_server,voip_registration_server_port,voip_proxy_server,voip_proxy_server_port,voip_outbound_proxy_enable,voip_outbound_proxy,voip_outbound_proxy_port,voip_register_status"
            }
        }

        function t(e) {
            return e ? {
                display_name: e.voip_display_name,
                user_name: e.voip_authorization_user_name,
                authorization_user_name: e.voip_user_name,
                authorization_password: e.voip_authorization_password,
                registration_server: e.voip_registration_server,
                registration_server_port: e.voip_registration_server_port,
                proxy_server: e.voip_proxy_server,
                proxy_server_port: e.voip_proxy_server_port,
                outboundEnable: e.voip_outbound_proxy_enable,
                outboundServer: e.voip_outbound_proxy,
                outboundPort: e.voip_outbound_proxy_port,
                voip_register_status: e.voip_register_status
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setVoipSettings(e, t) {
        function n(e) {
            return $.extend({
                isTest: isTest
            }, e)
        }

        function r(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, n, r, null, !0)
    }

    function getVoipUserDetails() {
        function e(e, t) {
            return {
                isTest: isTest,
                multi_data: "1",
                cmd: "voip_sip_register_server1,voip_sip_domain1,voip_sip_realm1,voip_sip_proxy_enable1,voip_sip_proxy_server1,voip_account_display_account1,voip_account_auth1,voip_account_password1,voip_user1_register_status"
            }
        }

        function t(e) {
            return e ? {
                sipRegisterServer: e.voip_sip_register_server1,
                sipDomain: e.voip_sip_domain1,
                sipRealm: e.voip_sip_realm1,
                sipProxyMode: e.voip_sip_proxy_enable1,
                voipSipProxyServer: e.voip_sip_proxy_server1,
                displayName: e.voip_account_display_account1,
                authorizedUserName: e.voip_account_auth1,
                authorizedPassword: e.voip_account_password1,
                voipRegisterStatus: e.voip_user1_register_status
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getVoipUserRegisterStatus() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "voip_user1_register_status"
            }
        }

        function t(e) {
            return e ? {
                voipRegisterStatus: e.voip_user1_register_status
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setVoipUserDetails() {
        function e(e) {
            return $.extend({
                isTest: isTest
            }, e)
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getVoipAdvancedSettings() {
        function e(e, t) {
            return {
                isTest: isTest,
                multi_data: "1",
                cmd: "voip_sip_t38_enable1,voip_sip_dtmf_method,voip_sip_encoder1,voip_sip_vad_enable1,voip_sip_cng_enable1"
            }
        }

        function t(e) {
            return e ? {
                sipT38Mode: e.voip_sip_t38_enable1,
                currentDtmfMethod: e.voip_sip_dtmf_method,
                currentVoipSipEncoderMethod: e.voip_sip_encoder1,
                sipVadMode: e.voip_sip_vad_enable1,
                sipCngMode: e.voip_sip_cng_enable1
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setVoipAdvancedSettings() {
        function e(e) {
            return $.extend({
                isTest: isTest
            }, e)
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getVoipSupplementaryService() {
        function e(e, t) {
            return {
                isTest: isTest,
                multi_data: "1",
                cmd: "voip_call_waiting_enable,voip_call_hold_enable,voip_three_way_talking_enable,voip_call_transfer_enable,voip_call_fwd_unconditional_enable,voip_call_fwd_unconditional_number,voip_call_fwd_busy_enable,voip_call_fwd_busy_number,voip_call_fwd_no_answer_enable,voip_call_fwd_no_answer_number"
            }
        }

        function t(e) {
            return e ? {
                voip_call_waiting_enable: e.voip_call_waiting_enable,
                voip_call_hold_enable: e.voip_call_hold_enable,
                voip_three_way_talking_enable: e.voip_three_way_talking_enable,
                voip_call_transfer_enable: e.voip_call_transfer_enable,
                voip_call_fwd_unconditional_enable: e.voip_call_fwd_unconditional_enable,
                voip_call_fwd_unconditional_number: e.voip_call_fwd_unconditional_number,
                voip_call_fwd_busy_enable: e.voip_call_fwd_busy_enable,
                voip_call_fwd_busy_number: e.voip_call_fwd_busy_number,
                voip_call_fwd_no_answer_enable: e.voip_call_fwd_no_answer_enable,
                voip_call_fwd_no_answer_number: e.voip_call_fwd_no_answer_number,
                selectedMode: "1" == e.voip_call_fwd_unconditional_enable ? 1 : 0
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setVoipSupplementaryService() {
        function e(e) {
            return $.extend({
                isTest: isTest
            }, e)
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getMacFilterInfo() {
        function e(e, t) {
            return {
                isTest: isTest,
                multi_data: "1",
                cmd: "ACL_mode,wifi_mac_black_list,wifi_hostname_black_list,RadioOff,user_ip_addr"
            }
        }

        function t(e) {
            return e ? {
                ACL_mode: e.ACL_mode,
                wifi_mac_black_list: e.wifi_mac_black_list,
                wifi_hostname_black_list: e.wifi_hostname_black_list,
                RadioOff: e.RadioOff,
                user_ip_addr: e.user_ip_addr
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setMacFilter() {
        function e(e) {
            return {
                goformId: "WIFI_MAC_FILTER",
                isTest: isTest,
                ACL_mode: e.ACL_mode,
                macFilteringMode: e.ACL_mode,
                wifi_hostname_black_list: e.wifi_hostname_black_list,
                wifi_mac_black_list: e.wifi_mac_black_list
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getFastbootSetting() {
        function e(e) {
            return {
                isTest: isTest,
                cmd: "mgmt_quicken_power_on,need_hard_reboot",
                multi_data: 1
            }
        }

        function t(e) {
            return {
                fastbootEnabled: "1" == e.mgmt_quicken_power_on ? "1" : "0",
                need_hard_reboot: e.need_hard_reboot
            }
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setFastbootSetting() {
        function e(e) {
            return {
                isTest: isTest,
                goformId: "MGMT_CONTROL_POWER_ON_SPEED",
                mgmt_quicken_power_on: e.fastbootEnabled,
                need_hard_reboot: e.need_hard_reboot
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function restart() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "REBOOT_DEVICE", n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function shutdown() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "SHUTDOWN_DEVICE", n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getNewVersionState() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "new_version_state", n
        }

        function t(e) {
            if (e) {
                var t = "1" == e.new_version_state || "version_has_new_critical_software" == e.new_version_state || "version_has_new_optional_software" == e.new_version_state;
                return e.hasNewVersion = t, e
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getNewVersionInfo() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "dm_new_version", n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getMandatory() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, "OTA" == config.UPGRADE_TYPE ? n.cmd = "is_mandatory" : n.cmd = "new_version_state", n
        }

        function t(e) {
            return e ? "OTA" == config.UPGRADE_TYPE ? {
                is_mandatory: "1" == e.is_mandatory
            } : {
                is_mandatory: "version_has_new_critical_software" == e.new_version_state
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getUpgradeResult() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "upgrade_result", n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getCurrentUpgradeState() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "current_upgrade_state", n
        }

        function t(e) {
            return e ? ("downloading" == e.current_upgrade_state && (e.current_upgrade_state = "upgrading"), e) : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function dmUpdatePackageExit() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "dm_update_package_file_exist", n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getPackSizeInfo() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "pack_size_info", n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getUserChoice() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "if_has_select", n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setUpgradeSelectOp() {
        function e(e, t) {
            var n = {};
            return n.goformId = "IF_UPGRADE", n.isTest = isTest, n.select_op = e.selectOp, "check" == n.select_op && (n.ota_manual_check_roam_state = 1), n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getOTAUpdateSetting() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "GetUpgAutoSetting", n
        }

        function t(e) {
            return e ? {
                updateMode: e.UpgMode,
                updateIntervalDay: e.UpgIntervalDay,
                allowRoamingUpdate: e.UpgRoamPermission
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setOTAUpdateSetting() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "SetUpgAutoSetting", n.UpgMode = e.updateMode, n.UpgIntervalDay = e.updateIntervalDay, n.UpgRoamPermission = e.allowRoamingUpdate, n
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getOTAlastCheckTime() {
        return getParams({
            nv: ["dm_last_check_time"]
        }, arguments[1], arguments[2])
    }

    function getOTASuccessTime() {
        return getParams({
            nv: ["dm_update_successful_time"]
        }, arguments[1], arguments[2])
    }

    function getSignalStrength() {
        return getParams({
            nv: ["network_type", "rssi", "rscp", "lte_rsrp", "Z5g_snr", "Z5g_rsrp", "ZCELLINFO_band", "Z5g_dlEarfcn", "lte_ca_pcell_arfcn", "lte_ca_pcell_band", "lte_ca_scell_band", "lte_ca_pcell_bandwidth", "lte_ca_scell_info", "lte_ca_scell_bandwidth", "wan_lte_ca", "lte_pci", "Z5g_CELL_ID", "Z5g_SINR", "cell_id", "wan_lte_ca", "lte_ca_pcell_band", "lte_ca_pcell_bandwidth", "lte_ca_scell_band", "lte_ca_scell_bandwidth", "lte_ca_pcell_arfcn", "lte_ca_scell_arfcn", "lte_multi_ca_scell_info", "wan_active_band", "nr5g_pci", "nr5g_action_band", "nr5g_cell_id", "lte_snr", "ecio", "wan_active_channel", "nr5g_action_channel"]
        }, arguments[1], arguments[2])
    }

    function clearUpdateResult() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "RESULT_RESTORE", n
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function clearTraffic() {
        function e(e) {
            return {
                isTest: isTest,
                goformId: "RESET_DATA_COUNTER"
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function switchPortForLog() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "CHANGE_MODE", n.change_mode = e.change_mode, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function childGroupList() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "childGroupList"
            }
        }

        function t(e) {
            return e && (e.childGroupList || e.devices) ? isTest ? e.childGroupList : e : {
                devices: []
            }
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function addChildGroup() {
        function e(e, t) {
            return {
                isTest: isTest,
                goformId: "ADD_DEVICE",
                mac: e.macAddress
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, 0 == config.currentUserInChildGroup ? {} : {
            errorType: "no_auth"
        }, e, t, null, !0)
    }

    function removeChildGroup() {
        function e(e, t) {
            return {
                isTest: isTest,
                goformId: "DEL_DEVICE",
                mac: e.mac
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, 0 == config.currentUserInChildGroup ? {} : {
            errorType: "no_auth"
        }, e, t, null, !0)
    }

    function checkCurrentUserInChildGroup(e) {
        if (void 0 === config.currentUserInChildGroup) {
            var t = [];
            t = void 0 !== e ? e : childGroupList({}).devices;
            var n = getUserMacAddr({}).get_user_mac_addr || getUserMacAddr({}).user_mac_addr,
                r = _.find(t, function (e) {
                    return e.mac == n
                });
            return config.currentUserInChildGroup = void 0 !== r, {
                result: void 0 !== r
            }
        }
        return {
            result: config.currentUserInChildGroup
        }
    }

    function getChildMacRuleInfo() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "child_mac_rule_info",
                mac_addr: e.mac_addr
            }
        }

        function t(e) {
            return e && void 0 !== e.child_mac_rule_info ? e : {
                child_mac_rule_info: ""
            }
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function removeChildMacRule() {
        function e(e, t) {
            return {
                isTest: isTest,
                goformId: "CHILD_MAC_RULE_DELETE",
                mac_addr: e.mac
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, 0 == config.currentUserInChildGroup ? {} : {
            errorType: "no_auth"
        }, e, t, null, !0)
    }

    function addChildAccessTimeRule() {
        function e(e, t) {
            return {
                isTest: isTest,
                goformId: "CHILD_MAC_RULE_ADD",
                child_mac_rule_info: e.child_mac_rule_info
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, 0 == config.currentUserInChildGroup ? {} : {
            errorType: "no_auth"
        }, e, t, null, !0)
    }

    function updateChildAccessTimeRule() {
        function e(e, t) {
            return {
                isTest: isTest,
                goformId: "CHILD_MAC_RULE_UPDATE",
                mac_addr: e.mac_addr,
                child_mac_rule_info: e.child_mac_rule_info
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, 0 == config.currentUserInChildGroup ? {} : {
            errorType: "no_auth"
        }, e, t, null, !0)
    }

    function getUserMacAddr() {
        return getParams({
            nv: "get_user_mac_addr"
        }, arguments[1], arguments[2])
    }

    function getCurretnMAC() {
        return getUserMacAddr({}).get_user_mac_addr || getUserMacAddr({}).user_mac_addr
    }

    function getHostNameList() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "hostNameList"
            }
        }

        function t(e) {
            return e && (e.hostNameList || e.devices) ? isTest ? e.hostNameList : e : {
                devices: []
            }
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function editHostName() {
        function e(e, t) {
            return {
                isTest: isTest,
                goformId: "EDIT_HOSTNAME",
                mac: e.mac,
                hostname: e.hostname
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getSiteWhiteList() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "site_white_list"
            }
        }

        function t(e) {
            return e && (e.site_white_list || e.siteList) ? isTest ? e.site_white_list : e : {
                siteList: []
            }
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function removeSiteWhite() {
        function e(e, t) {
            return {
                isTest: isTest,
                goformId: "REMOVE_WHITE_SITE",
                ids: e.ids.join(",")
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, 0 == config.currentUserInChildGroup ? {} : {
            errorType: "no_auth"
        }, e, t, null, !0)
    }

    function saveSiteWhite() {
        function e(e, t) {
            return {
                isTest: isTest,
                goformId: "ADD_WHITE_SITE",
                name: e.name,
                site: e.site
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, 0 == config.currentUserInChildGroup ? {} : {
            errorType: "no_auth"
        }, e, t, null, !0)
    }

    function getTimeLimited() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "time_limited"
            }
        }

        function t(e) {
            return e ? n(e) : r
        }

        function n(e) {
            if ("" == e.time_limited) return {
                time_limited: []
            };
            var t = e.time_limited.split(";");
            return _.each(t, function (e) {
                var t = e.split("+");
                2 == t.length && (r[t[0]] = t[1].split(","))
            }), r
        }
        var r = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: []
        };
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function saveTimeLimited() {
        function e(e, t) {
            return {
                isTest: isTest,
                goformId: "SAVE_TIME_LIMITED",
                time_limited: e.time
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, 0 == config.currentUserInChildGroup ? {} : {
            errorType: "no_auth"
        }, e, t, null, !0)
    }

    function getTsw() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "web_wake_switch,web_sleep_switch,web_wake_time,web_sleep_time",
                multi_data: "1"
            }
        }

        function t(e) {
            if (e) {
                if (-1 != e.web_wake_time.indexOf(":")) {
                    var t = e.web_wake_time.split(":");
                    e.openH = leftInsert(t[0], 2, "0"), e.openM = leftInsert(t[1], 2, "0")
                } else e.openH = "06", e.openM = "00";
                if (-1 != e.web_sleep_time.indexOf(":")) {
                    var n = e.web_sleep_time.split(":");
                    e.closeH = leftInsert(n[0], 2, "0"), e.closeM = leftInsert(n[1], 2, "0")
                } else e.closeH = "22", e.closeM = "00";
                return e
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function saveTsw() {
        function e(e, t) {
            var n = {
                isTest: isTest,
                goformId: "SAVE_TSW",
                web_wake_switch: e.openEnable,
                web_sleep_switch: e.closeEnable
            };
            return "1" == e.openEnable && (n.web_wake_time = e.openTime, n.web_sleep_time = e.closeTime), n
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getSysTimeMode() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "systime_mode,syn_done,nitz_sync_flag",
                multi_data: "1"
            }
        }

        function t(e) {
            return !e || "sntp" != e.systime_mode && "nitz" != e.systime_mode && "manual" != e.systime_mode && "1" != e.syn_done && "1" != e.nitz_sync_flag ? {
                result: !1
            } : {
                result: !0
            }
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function trafficCalibration() {
        function e(e, t) {
            return {
                isTest: isTest,
                goformId: "FLOW_CALIBRATION_MANUAL",
                calibration_way: e.way,
                time: "time" == e.way ? e.value : 0,
                data: "data" == e.way ? e.value : 0
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getParams() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, _.isArray(e.nv) ? (n.cmd = e.nv.join(","), n.multi_data = 1) : n.cmd = e.nv, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getRedirectData() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "vwim_mc_state,traffic_overrun,detect_new_version", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.vwim_mc_state = e.vwim_mc_state, t.traffic_overrun = e.traffic_overrun, t.detect_new_version = e.detect_new_version, t.opms_wan_mode = "AUTO" == timerInfo.opms_wan_mode || "AUTO_BACKUP" == timerInfo.opms_wan_mode ? timerInfo.opms_wan_auto_mode : timerInfo.opms_wan_mode, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function clearRedirectFlag() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "CLEAR_REDIRECT_FLAG", n.flag_id = e.redirectFlags, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setBindIPInfo() {
        function e(e, t) {
            return $.extend({
                goformId: "DHCP_RESERVATION_TO_STATIC",
                isTest: isTest
            }, e)
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getBindIPInfo() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "host_name_web,mac_addr_web,ip_addr_web,lan_ipaddr,lan_netmask", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.ipAddress = e.lan_ipaddr, t.subnetMask = e.lan_netmask, t.host_name_web = e.host_name_web, t.mac_addr_web = e.mac_addr_web, t.ip_addr_web = e.ip_addr_web, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function delStaticAddrRules(e, t) {
        function n(e) {
            return $.extend({
                isTest: isTest
            }, e)
        }

        function r(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, n, r, null, !0)
    }

    function getStaticMacIpAddressList() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "current_static_addr_list"
            }
        }

        function t(e) {
            var t = [];
            if (e) {
                if (null == e.current_static_addr_list || "" == e.current_static_addr_list) return {
                    StaticAddressFilterRules: []
                };
                for (var n = e.current_static_addr_list, r = 0; r < n.length; r++) {
                    var i = {};
                    i.index = r, i.hostName = n[r].hostname, i.macAddress = n[r].mac, i.ipAddress = n[r].ip, i.domainName = n[r].domain, t.push(i)
                }
                return {
                    StaticAddressFilterRules: t
                }
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getStaticIpAddrList() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "current_static_addr_list"
            }
        }

        function t(e) {
            if (e) {
                var t = {};
                if (null == e.current_static_addr_list || "" == e.current_static_addr_list) t.bindStaticIPInfo = [];
                else {
                    for (var n = e.current_static_addr_list, r = [], i = 0; i < n.length; i++) r.push(n[i].ip);
                    t.bindStaticIPInfo = r
                }
                return t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getDHCPStaticAddressRules() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "mac_ip_status", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.mac_ip_status = "1" == e.mac_ip_status ? "1" : "0", t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function addStaticAddress(e, t) {
        function n(e) {
            return $.extend({
                isTest: isTest
            }, e)
        }

        function r(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, n, r, null, !0)
    }

    function setHotspotListSpan() {
        function e(e) {
            return $.extend({
                goformId: "WIFI_SPOT_PROFILE_UPDATE",
                isTest: isTest
            }, e)
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getHotspotListSort() {
        function e(e, t) {
            return {
                isTest: isTest,
                multi_data: 1,
                cmd: "wifi_profile,wifi_profile1,wifi_profile2,wifi_profile3,wifi_profile4,wifi_profile5,wifi_profile_num"
            }
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setNV() {
        function e(e) {
            return $.extend({
                goformId: "SET_NV",
                isTest: isTest
            }, e)
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setWifiBand() {
        function e(e) {
            return {
                goformId: "SET_WIFI_BAND",
                isTest: isTest,
                wifiEnabled: e.wifiEnabled,
                wifi_band: e.wifi_band
            }
        }

        function t(e) {
            return e || unknownErrorObject
        }
        doStuffAndCheckServerIsOnline(arguments, e, t)
    }

    function getSTKFlagInfo() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "stk_write_flag", n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.stk_write_flag = e.stk_write_flag, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getSTKInfo() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "stk", n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.stk = e.stk, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getSTKMenuInfo() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "stk_menu", n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.stk_menu = e.stk_menu, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setSTKMenuInfo() {
        function e(e, t) {
            var n = {};
            return n.goformId = "STK_PROCESS", n.isTest = isTest, n.operator = e.operator, n.item_no = e.item_no, n.stk_content = e.stk_content, n.stk_encode_type = e.stk_encode_type, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getSntpDSTByTimeZone(e, t) {
        function n(e) {
            return $.extend({
                isTest: isTest
            }, e)
        }

        function r(e) {
            return e ? {
                sntp_dst_start: e.sntp_dst_start,
                sntp_dst_end: e.sntp_dst_end,
                sntp_dst_bias: e.sntp_dst_bias
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, n, r, null, !0)
    }

    function setBindMacIpSwitch(e, t) {
        function n(e, t) {
            return $.extend({
                goformId: "SET_BIND_STATIC_ADDRESS",
                isTest: isTest
            }, e)
        }

        function r(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, n, r, null, !0)
    }

    function setRedirectOff() {
        function e(e) {
            return {
                goformId: "REDIRECT_REDIRECT_OFF"
            }
        }

        function t(e) {
            return e || unknownErrorObject
        }
        doStuffAndCheckServerIsOnline(arguments, e, t)
    }

    function getSleepModeStatus() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "SleepStatusForSingleChipCpe", n
        }

        function t(e) {
            return e ? (e.curSleepStatus = "1" == e.SleepStatusForSingleChipCpe ? "1" : "2", e) : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setHaveReadPrivacyNote() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "SET_PRIVACY_NOTICE", n.privacy_read_flag = e.privacy_read_flag, n
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setUserImprovNote() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "USER_IMPROV_SET", n.tr069_user_improv_flag = e.tr069_user_improv_flag, n.tr069_user_improv_notify_flag = "1", n
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setUserGrantNote() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "USER_GRANT_CHANGE_SET", n.dm_user_grant_flag = e.dm_user_grant_flag, n.dm_user_grant_notify_flag = "1", n
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function diagnosisSettings() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "modem_main_state,ppp_status,ipsec_status,RadioOff,puknumber,pinnumber,m_ssid_enable,HideSSID,m_HideSSID,wifi_start_fail,wifi_chip1_ssid1_wifi_coverage,NoForwarding,m_NoForwarding,wan_apn,monthly_tx_bytes,monthly_rx_bytes,station_mac,opms_wan_mode,opms_wan_auto_mode,ACL_mode,network_type,ppp_dial_fail_times,RemoteManagement,WANPingFilter,dhcpEnabled,pdp_type,prefer_dns_manual,standby_dns_manual,ipv6_prefer_dns_manual,ipv6_standby_dns_manual,web_wake_switch,upnpEnabled,prefer_dns_auto,standby_dns_auto,static_wan_primary_dns,static_wan_secondary_dns,apn_mode,ipv6_prefer_dns_auto,ipv6_standby_dns_auto,IPPortFilterEnable,DefaultFirewallPolicy,PortForwardEnable,wifi_anti_brute_force_attack_func,guest_ssid_router_enable,dns_mode,ipv6_dns_mode", n.multi_data = 1, n
        }

        function t(e) {
            return "" == e || "0.0.0.0" == e || "::0" == e
        }

        function n(e) {
            if (e) {
                var n = {};
                return n.simCardStatus = e.modem_main_state, n.networkStatus = e.ppp_status, n.wifiSwitch = e.RadioOff, n.puknumber = e.puknumber, n.pinnumber = e.pinnumber, n.m_ssid_enable = e.m_ssid_enable, n.HideSSID = e.HideSSID, n.m_HideSSID = e.m_HideSSID, n.wifiDriverNormal = e.wifi_start_fail, n.wifi_coverage = e.wifi_chip1_ssid1_wifi_coverage, n.NoForwarding = e.NoForwarding, n.m_NoForwarding = e.m_NoForwarding, n.wanAPN = e.wan_apn, n.monthlySent = "" == e.monthly_tx_bytes ? 0 : e.monthly_tx_bytes, n.monthlyReceived = "" == e.monthly_rx_bytes ? 0 : e.monthly_rx_bytes, n.curr_connected_devices = e.station_mac && "" != e.station_mac ? e.station_mac.split(";") : [], n.currMode = e.opms_wan_mode, n.networkType = e.network_type, n.ACL_mode = e.ACL_mode, -1 != n.networkType.toLowerCase().indexOf("limited_service") || -1 != n.networkType.toLowerCase().indexOf("limited service") ? n.networkType = "limited_service" : -1 == n.networkType.toLowerCase().indexOf("no_service") && -1 == n.networkType.toLowerCase().indexOf("no service") || (n.networkType = "no_service"), n.connectFailCount = e.ppp_dial_fail_times, n.remoteFlag = e.RemoteManagement, n.pingFlag = e.WANPingFilter, n.dhcpEnabled = e.dhcpEnabled, "PPP" == e.opms_wan_mode || "AUTO" == e.opms_wan_mode && "AUTO_LTE_GATEWAY" == e.opms_wan_auto_mode ? "ip" == e.pdp_type.toLowerCase() ? "auto" == e.dns_mode ? n.dnsDataIsError = t(e.prefer_dns_auto) && t(e.standby_dns_auto) : n.dnsDataIsError = !1 : "ipv6" == e.pdp_type.toLowerCase() ? "auto" == e.ipv6_dns_mode ? n.dnsDataIsError = t(e.ipv6_prefer_dns_auto) && t(e.ipv6_standby_dns_auto) : n.dnsDataIsError = !1 : "auto" == e.dns_mode ? n.dnsDataIsError = t(e.prefer_dns_auto) && t(e.standby_dns_auto) && t(e.ipv6_prefer_dns_auto) && t(e.ipv6_standby_dns_auto) : n.dnsDataIsError = !1 : "DHCP" == e.opms_wan_mode || "AUTO" == e.opms_wan_mode && "AUTO_DHCP" == e.opms_wan_auto_mode ? n.dnsDataIsError = t(e.prefer_dns_auto) && t(e.standby_dns_auto) : "PPPOE" == e.opms_wan_mode || "AUTO" == e.opms_wan_mode && "AUTO_PPPOE" == e.opms_wan_auto_mode ? n.dnsDataIsError = t(e.prefer_dns_auto) && t(e.standby_dns_auto) : n.dnsDataIsError = !1, n.wifiAwakeSwitch = "" == e.web_wake_switch ? "0" : e.web_wake_switch, n.upnpSwitch = e.upnpEnabled, n.portFilterEnable = e.IPPortFilterEnable, n.defaultPolicy = e.DefaultFirewallPolicy, n.PortForwardEnable = e.PortForwardEnable, n.antiVioCraEnable = e.wifi_anti_brute_force_attack_func, n.guestRouterEnable = e.guest_ssid_router_enable, n
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, n, null, !1)
    }

    function getDeviceAccessControlList() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "queryDeviceAccessControlList"
            }
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.aclMode = e.AclMode, t.WhiteMacList = e.WhiteMacList, t.BlackMacList = e.BlackMacList, t.WhiteNameList = e.WhiteNameList, t.BlackNameList = e.BlackNameList, t.wifiMacWhiteList = e.WhiteMacList, t.wifiMacBlackList = e.BlackMacList, t.wifiHostnameWhiteList = e.WhiteNameList, t.wifiHostnameBlackList = e.BlackNameList, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getThermalControlSetting() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "thermal_control_enable,thermal_led_enable", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.thermal_control_enable = "1" == e.thermal_control_enable ? "1" : "0", t.thermal_led_enable = e.thermal_led_enable, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setThermalControlSetting() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "SET_THERMAL_CONTROL", n.thermal_control_enable = e.thermal_control_enable, n.thermal_led_enable = e.thermal_led_enable, n
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getPinglogInfo() {
        function e(e, t) {
            return {
                isTest: isTest,
                multi_data: "1",
                cmd: "DIAG_URL,DIAG_CHECK,traceroute_flag,udp_echo_plus_status"
            }
        }

        function t(e) {
            return e ? {
                IpUrl: e.DIAG_URL,
                CheckPingMode: e.DIAG_CHECK,
                traceroute_flag: e.traceroute_flag,
                udp_echo_plus_status: e.udp_echo_plus_status
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getUdpEchoInfo() {
        function e(e, t) {
            return {
                isTest: isTest,
                multi_data: "1",
                cmd: "tr069_udpechos_prcv,tr069_udpechos_prsp,tr069_udpechos_brcv,tr069_udpechos_brsp,tr069_udpechos_tfr,tr069_udpechos_tlr"
            }
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setPinglogInfo(e, t) {
        function n(e) {
            return $.extend({
                isTest: isTest
            }, e)
        }

        function r(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, n, r, null, !0)
    }

    function getsleepProtection() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "night_mode_switch,night_mode_start_time,night_mode_end_time,night_mode_close_all_led",
                multi_data: "1"
            }
        }

        function t(e) {
            if (e) {
                if (-1 != e.night_mode_start_time.indexOf(":")) {
                    var t = e.night_mode_start_time.split(":");
                    e.openH = leftInsert(t[0], 2, "0"), e.openM = leftInsert(t[1], 2, "0")
                } else e.openH = "22", e.openM = "00";
                if (-1 != e.night_mode_end_time.indexOf(":")) {
                    var n = e.night_mode_end_time.split(":");
                    e.closeH = leftInsert(n[0], 2, "0"), e.closeM = leftInsert(n[1], 2, "0")
                } else e.closeH = "07", e.closeM = "00";
                return e
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function saveSleepProtection() {
        function e(e, t) {
            var n = {
                isTest: isTest,
                goformId: "SET_DEVICE_LED",
                night_mode_switch: e.sleepProtectionEnable
            };
            return "1" == e.sleepProtectionEnable && (n.night_mode_start_time = e.openTime, n.night_mode_end_time = e.closeTime, n.night_mode_close_all_led = e.night_mode_close_all_led), n
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getRebootInfo() {
        function e(e, t) {
            return {
                isTest: isTest,
                multi_data: "1",
                cmd: "reboot_timeframe_hours1,reboot_timeframe_hours2,reboot_dow,reboot_dod,reboot_schedule_enable,reboot_schedule_mode,reboot_hour1,reboot_min1,reboot_hour2,reboot_min2"
            }
        }

        function t(e) {
            return e ? {
                reboot_dow: e.reboot_dow,
                reboot_dod: e.reboot_dod,
                reboot_schedule_enable: e.reboot_schedule_enable,
                reboot_schedule_mode: e.reboot_schedule_mode,
                reboot_hour1: e.reboot_hour1,
                reboot_min1: e.reboot_min1,
                reboot_hour2: e.reboot_hour2,
                reboot_min2: e.reboot_min2,
                reboot_threshold_hours1: e.reboot_timeframe_hours1,
                reboot_threshold_hours2: e.reboot_timeframe_hours2
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setRebootScheduleFixTime(e, t) {
        function n(e) {
            return $.extend({
                isTest: isTest
            }, e)
        }

        function r(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, n, r, null, !0)
    }

    function getWifiModuleSwitchStatus() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "queryWiFiModuleSwitch", n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.WiFiModuleSwitch = "" == e.WiFiModuleSwitch ? "0" : e.WiFiModuleSwitch, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getWifiAccessPointInfo() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "queryAccessPointInfo", n
        }

        function t(e) {
            if (e) {
                return e.ResponseList
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getWiFiGuestLeftTime() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "queryWiFiGuestLeftTime", n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.WiFiGuestLeftTime = e.WiFiGuestLeftTime, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getWifiWpsStatus() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "queryWpsStatus", n
        }

        function t(e) {
            if (e) {
                var t = e.ResponseList;
                return _.map(t, function (e, t) {
                    e.ChipIndex = e.ChipIndex, e.ActiveWpsAccessPointIndex = e.ActiveWpsAccessPointIndex, e.WpsStatus = e.WpsStatus, e.WpsMode = e.WpsMode
                }), t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setWifiAccessPointInfo() {
        function e(e) {
            var t = {
                goformId: void 0 !== e.goformId ? e.goformId : "setAccessPointInfo",
                isTest: isTest,
                ChipIndex: e.ChipIndex,
                AccessPointIndex: e.AccessPointIndex,
                QrImageShow: e.QrImageShow,
                lan_sec_ssid_control: e.lan_sec_ssid_control,
                wifi_syncparas_flag: e.wifi_syncparas_flag
            };
            return 0 == e.ChipIndex && 1 == e.AccessPointIndex && (t = $.extend(t, {
                GuestSSIDActiveTime: e.GuestSSIDActiveTime
            })), e.AccessPointSwitchStatus != e.originAccessPointSwitchStatus ? t = $.extend(t, {
                AccessPointSwitchStatus: e.AccessPointSwitchStatus
            }) : (t = $.extend(t, {
                AccessPointSwitchStatus: e.AccessPointSwitchStatus,
                SSID: e.SSID,
                ApIsolate: e.ApIsolate,
                AuthMode: e.AuthMode,
                ApBroadcastDisabled: e.ApBroadcastDisabled
            }), "WPAPSKWPA2PSK" == e.AuthMode || "WPA2PSK" == e.AuthMode ? (t.EncrypType = e.cipher, t.Password = config.PASSWORD_ENCODE ? Base64.encode(e.Password) : e.Password) : t.EncrypType = "NONE", "setAccessPointInfo_24G_5G" == t.goformId && (t.SSID_CHIP1 = e.SSID + "_5G", t.wifi_syncparas_flag = e.wifi_syncparas_flag)), t
        }

        function t(e) {
            return e || unknownErrorObject
        }
        doStuffAndCheckServerIsOnline(arguments, e, t)
    }

    function setWifiModuleSwitchStatus() {
        function e(e) {
            return {
                goformId: "switchWiFiModule",
                isTest: isTest,
                SwitchOption: "" == e.SwitchOption ? "0" : e.SwitchOption
            }
        }

        function t(e) {
            return e || unknownErrorObject
        }
        doStuffAndCheckServerIsOnline(arguments, e, t)
    }

    function setWifiWholeChipAdvanceInfo() {
        function e(e) {
            var t = {
                goformId: "setWiFiChipAdvancedInfo24G_5G",
                isTest: isTest,
                ChipIndex: e.ChipIndex,
                WirelessMode: e.WirelessMode,
                CountryCode: e.CountryCode,
                Channel: e.Channel,
                ApMaxStationNumber: e.ApMaxStationNumber
            };
            return e.wifi5GIsOn && (t.WirelessMode_5G = e.WirelessMode_5G, t.CountryCode_5G = e.CountryCode_5G, t.Channel_5G = e.Channel_5G), config.WIFI_BANDWIDTH_SUPPORT && (t.BandWidth = e.BandWidth, e.wifi5GIsOn && (t.BandWidth_5G = e.BandWidth_5G)), config.WIFI_BAND_SUPPORT && (t.Band = e.Band, e.wifi5GIsOn && (t.Band_5G = e.Band_5G)), config.WIFI_BAND_SUPPORT && "a" == e.wifiBand || (t.abg_rate = e.rate), t
        }

        function t(e) {
            return e || unknownErrorObject
        }
        doStuffAndCheckServerIsOnline(arguments, e, t)
    }

    function setWifiChipAdvanceInfo() {
        function e(e) {
            var t = {
                goformId: "setWiFiChipAdvancedInfo",
                isTest: isTest,
                ChipIndex: e.ChipIndex,
                WirelessMode: e.WirelessMode,
                CountryCode: e.CountryCode,
                Channel: e.Channel
            };
            return config.WIFI_BANDWIDTH_SUPPORT && (t.BandWidth = e.BandWidth), config.WIFI_BAND_SUPPORT && (t.Band = e.Band), config.WIFI_BAND_SUPPORT && "a" == e.wifiBand || (t.abg_rate = e.rate), t
        }

        function t(e) {
            return e || unknownErrorObject
        }
        doStuffAndCheckServerIsOnline(arguments, e, t)
    }

    function setWifiWpsStart() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "startWps", n.ChipIndex = e.ChipIndex, n.ActiveWpsAccessPointIndex = e.ActiveWpsAccessPointIndex, n.WpsMode = e.WpsMode, "PIN" == n.WpsMode && (n.WpsPin = e.WpsPin), n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getMacFilterStatus() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "queryDeviceAccessControlList", n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.aclMode = e.AclMode, t.wifiMacWhiteList = e.WhiteMacList, t.wifiMacBlackList = e.BlackMacList, t.wifiHostnameWhiteList = e.WhiteNameList, t.wifiHostnameBlackList = e.BlackNameList, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getAntiVioCraSetting() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "wifi_anti_brute_force_attack_func", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.prevent_attack_enable = e.wifi_anti_brute_force_attack_func, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setMacFilterStatus() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "setDeviceAccessControlList", n.AclMode = e.aclMode, n.WhiteMacList = e.wifiMacWhiteList, n.BlackMacList = e.wifiMacBlackList, n.WhiteNameList = e.wifiHostnameWhiteList, n.BlackNameList = e.wifiHostnameBlackList, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getUserIPAddr() {
        return getParams({
            nv: ["user_ip_addr"]
        }, arguments[1], arguments[2])
    }

    function setDeviceAccessControlList() {
        function e(e) {
            return {
                goformId: "setDeviceAccessControlList",
                isTest: isTest,
                AclMode: e.AclMode,
                WhiteMacList: e.WhiteMacList,
                BlackMacList: e.BlackMacList,
                WhiteNameList: e.WhiteNameList,
                BlackNameList: e.BlackNameList
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getVPNClientSetting() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "vpn_type,vpn_l2tp_passwd,vpn_account,vpn_passwd,vpn_server_ip,vpn_conn_status,vpn_auto_start,vpn_remote_ip,vpn_local_ip", n.multi_data = 1, n
        }

        function t(e) {
            return e ? {
                vpn_type: e.vpn_type,
                vpn_l2tp_passwd: e.vpn_l2tp_passwd,
                vpn_account: e.vpn_account,
                vpn_passwd: e.vpn_passwd,
                vpn_server_ip: e.vpn_server_ip,
                vpn_conn_status: e.vpn_conn_status,
                vpn_auto_start: e.vpn_auto_start,
                vpn_remote_ip: e.vpn_remote_ip,
                vpn_local_ip: e.vpn_local_ip
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setVPNClientSetting() {
        function e(e, t) {
            var n = {
                goformId: "VPN_CLIENT_SET",
                vpn_type: e.vpn_type,
                vpn_account: e.vpn_account,
                vpn_passwd: e.vpn_passwd,
                vpn_server_ip: e.vpn_server_ip,
                vpn_auto_start: e.vpn_auto_start,
                isTest: isTest
            };
            return "L2TP" == e.vpn_type && $.extend(n, {
                vpn_l2tp_passwd: e.vpn_l2tp_passwd
            }), n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function vpnConnect() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.notCallback = !0, n.goformId = "VPN_CONNECT", n
        }

        function t(e) {
            "success" == e.result ? (i = (new Date).getTime(), addCallback(n)) : r({
                result: !1
            })
        }

        function n(e) {
            "connecting" == e.vpn_conn_status ? timerInfo.vpn_conn_status = "connecting" : checkVpnConnectedStatus(e.vpn_conn_status) ? (removeCallback(n), timerInfo.vpn_conn_status = "connected", r({
                result: !0,
                status: timerInfo.connectStatus
            })) : (new Date).getTime() - i < 1e4 ? timerInfo.vpn_conn_status = "connecting" : (removeCallback(n), r({
                result: !1
            }))
        }
        var r = arguments[1],
            i = 0;
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function vpnDisconnect() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.notCallback = !0, n.goformId = "VPN_DISCONNECT", n
        }

        function t(e) {
            "success" == e.result ? (i = (new Date).getTime(), addCallback(n)) : r({
                result: !1
            })
        }

        function n(e) {
            "disconnecting" == e.vpn_conn_status ? timerInfo.vpn_conn_status = "disconnecting" : "disconnected" == e.vpn_conn_status ? (removeCallback(n), timerInfo.vpn_conn_status = "disconnected", r({
                result: !0,
                status: timerInfo.vpn_conn_status
            })) : (new Date).getTime() - i < 1e4 ? timerInfo.vpn_conn_status = "disconnecting" : (removeCallback(n), r({
                result: !1
            }))
        }
        var r = arguments[1],
            i = 0;
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getVoipVolteSetting() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "voice_work_type", n.multi_data = 1, n
        }

        function t(e) {
            return e ? {
                voice_work_type: e.voice_work_type
            } : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setVoipVolteSetting() {
        function e(e, t) {
            return {
                goformId: "VOIP_VOICE_WORK_TYPE_SET",
                voice_work_type: e.voice_work_type,
                isTest: isTest
            }
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setTr069Module() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "TR069_MODULE_SET", n.tr069_DataModule = e.tr069_DataModule, n
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setSuggestedPositionDetect() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "SIGNAL_QUALITY_DETECT_START", n
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setSuggestedPositionCancel() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "SIGNAL_QUALITY_DETECT_CANCEL", n
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getSuggestedPositionDetectProgress() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "signal_detect_progress", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.signal_detect_progress = e.signal_detect_progress, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getSuggestedPositionDetectResult() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "signal_detect_quality", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.signal_detect_quality = e.signal_detect_quality, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function getSuggestedPositionDetectRecord() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "signal_detect_record_0,signal_detect_record_1,signal_detect_record_2,signal_detect_record_3,signal_detect_record_4,signal_detect_record_5,signal_detect_record_6,signal_detect_record_7,signal_detect_record_8,signal_detect_record_9", n.multi_data = 1, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function addSuggestedPositionRecord() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "SIGNAL_QUALITY_RECORD_ADD", n.index = e.index, n.date = e.date, n.location = e.location, n.quality = e.quality, n
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function deleteSingleSuggestedPositionRecord() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "SIGNAL_QUALITY_RECORD_DEL", n.index = e.index, n
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function deleteAllSuggestedPositionRecord() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "SIGNAL_QUALITY_RECORD_CLEAR", n
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getTempStatus() {
        function e(e, t) {
            return {
                isTest: isTest,
                cmd: "wifi_chip_temp,therm_pa_level,therm_pa_frl_level,therm_tj_level,pm_sensor_pa1,pm_sensor_mdm,pm_modem_5g",
                multi_data: 1
            }
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setWifiAccessPointInfo_24G5G() {
        function e(e) {
            var t = {
                goformId: e.goformId,
                isTest: isTest,
                ChipIndex: e.ChipIndex,
                AccessPointIndex: e.AccessPointIndex,
                QrImageShow: e.QrImageShow,
                lan_sec_ssid_control: e.lan_sec_ssid_control,
                wifi_syncparas_flag: e.wifi_syncparas_flag
            };
            return e.AccessPointSwitchStatus != e.originAccessPointSwitchStatus ? t = $.extend(t, {
                AccessPointSwitchStatus: e.AccessPointSwitchStatus
            }) : (t = $.extend(t, {
                AccessPointSwitchStatus: e.AccessPointSwitchStatus,
                SSID: e.SSID,
                ApIsolate: e.ApIsolate,
                AuthMode: e.AuthMode,
                ApBroadcastDisabled: e.ApBroadcastDisabled
            }), "WPAPSKWPA2PSK" == e.AuthMode || "WPA2PSK" == e.AuthMode ? (t.EncrypType = e.cipher, t.Password = config.PASSWORD_ENCODE ? Base64.encode(e.Password) : e.Password) : t.EncrypType = "NONE"), e.wifi5GIsOn && (t.QrImageShow_5G = e.QrImageShow_5G, e.AccessPointSwitchStatus_5G != e.originAccessPointSwitchStatus_5G ? t = $.extend(t, {
                AccessPointSwitchStatus_5G: e.AccessPointSwitchStatus_5G
            }) : (t = $.extend(t, {
                AccessPointSwitchStatus_5G: e.AccessPointSwitchStatus_5G,
                SSID_5G: e.SSID_5G,
                ApIsolate_5G: e.ApIsolate_5G,
                AuthMode_5G: e.AuthMode_5G,
                ApBroadcastDisabled_5G: e.ApBroadcastDisabled_5G
            }), "WPAPSKWPA2PSK" == e.AuthMode_5G || "WPA2PSK" == e.AuthMode_5G ? (t.EncrypType_5G = e.cipher_5G, t.Password_5G = config.PASSWORD_ENCODE ? Base64.encode(e.Password_5G) : e.Password_5G) : t.EncrypType_5G = "NONE")), t
        }

        function t(e) {
            return e || unknownErrorObject
        }
        doStuffAndCheckServerIsOnline(arguments, e, t)
    }

    function getAntennaControlSetting() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "ant_switch_enable", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.ant_switch_enable = "1" == e.ant_switch_enable ? "1" : "0", t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setAntennaControlSetting() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "WAN_ANT_SWITCH_SET", n.ant_switch_enable = e.ant_switch_enable, n
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getDebugInfo() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "lte_band_lock,operate_mode,zte_voice_debug_ims_set,zte_voice_debug_voice_set,wifi_tputs_test_ip,wifi_tputs_test_mode,rf_mmw_status,mec_url,mec_port,mec_username,mec_password,mec_groupid,mec_alivePeriod,mec_status,mec_tls_en,mec_aes_key,mec_aes_iv,mec_enable,mec_sim_num,lte_band_lock,lte_freq_lock,lte_pci_lock,lte_earfcn_lock,zte_N79_wlan5G_priority", n.multi_data = 1, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setBandSelect() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "BAND_SELECT", n.is_gw_band = e.is_gw_band, n.gw_band_mask = e.gw_band_mask, n.is_lte_band = e.is_lte_band, n.lte_band_mask = e.lte_band_mask, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setOnlineLpm() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "WAN_OPERATE_MODE_SET", n.operate_mode = e.operate_mode, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setIMS() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "VOICE_DEBUG_IMS_SET", n.zte_voice_debug_ims_set = e.zte_voice_debug_ims_set, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setVOICE() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "VOICE_DEBUG_VOICE_SET", n.zte_voice_debug_voice_set = e.zte_voice_debug_voice_set, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setWlanTputs() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "WLAN_TEST_TPUTS_SET", n.wifi_tputs_test_ip = e.wifi_tputs_test_ip, n.wifi_tputs_test_mode = e.wifi_tputs_test_mode, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setNr5gBandSelect() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "WAN_PERFORM_NR5G_BAND_LOCK", n.nr5g_band_mask = e.nr5g_band_mask, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setAntennaState() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "BSP_ANTENNA_STATE_SET", n.antenna_name = e.antenna_name, n.state = e.state, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setRFMMW() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "RF_MMW_DISABLE_SET", n.rf_mmw_status = e.rf_mmw_status, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setMbnMode() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "WAN_MBN_MODE_SET", n.mbn_mode = e.mbn_mode, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setMqttMecAes() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "MQTT_MEC_AES_SET", n.mec_enable = e.mec_enable, "1" == e.mec_enable && (n.mec_url = e.mec_url, n.mec_port = e.mec_port, n.mec_username = e.mec_username, n.mec_password = e.mec_password, n.mec_groupid = e.mec_groupid, n.mec_alivePeriod = e.mec_alivePeriod, n.mec_tls_en = e.mec_tls_en, n.mec_aes_key = e.mec_aes_key, n.mec_aes_iv = e.mec_aes_iv, n.mec_sim_num = e.mec_sim_num), n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setPsRestart() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "PS_NO_SERVICE_RESTART_SET", n.ps_no_service_restart_flag = e.ps_no_service_restart_flag, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setCellLockSetting() {
        function e(e) {
            return {
                isTest: isTest,
                goformId: "LTE_LOCK_CELL_SET",
                lte_pci_lock: e.lte_pci_lock,
                lte_earfcn_lock: e.lte_earfcn_lock
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setN79Wlan5gPrioritySetting() {
        function e(e) {
            return {
                isTest: isTest,
                goformId: "WLAN_N79_WLAN5G_PRIORITY_SET",
                zte_N79_wlan5G_priority: e.zte_N79_wlan5G_priority
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getWatchDogSetting() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "net_link_detect_enable,net_link_detect_url,net_link_detect_time_gap,net_link_detect_ping_times,net_link_detect_timeout,watch_dog_reboot_enable", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.watchDogSetting = "1" == e.net_link_detect_enable ? "1" : "0", t.linkUrl = e.net_link_detect_url, t.net_link_detect_time_gap = e.net_link_detect_time_gap, t.net_link_detect_ping_times = e.net_link_detect_ping_times, t.net_link_detect_timeout = e.net_link_detect_timeout, t.watch_dog_reboot_enable = e.watch_dog_reboot_enable, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setWatchDogSetting() {
        function e(e, t) {
            var n = {};
            return n.notCallback = !0, n.goformId = "WATCH_DOG_SWITCH", n.isTest = isTest, n.net_link_detect_enable = e.net_link_detect_enable, r = e.net_link_detect_enable, "1" == n.net_link_detect_enable && (n.net_link_detect_url = e.net_link_detect_url, n.net_link_detect_ping_times = e.net_link_detect_ping_times, n.net_link_detect_time_gap = e.net_link_detect_time_gap, n.net_link_detect_timeout = e.net_link_detect_timeout, n.watch_dog_reboot_enable = e.watch_dog_reboot_enable), n
        }

        function t(e) {
            e && "success" == e.result && "1" == r ? addTimerThings("check_watchdog_urlip_valid", n) : i(e)
        }

        function n(e) {
            checkWatchDogStatus(e, i, checkWatchDogStatus)
        }
        var r, i = arguments[1];
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function checkWatchDogStatus(e, t, n) {
        "valid" == e.check_watchdog_urlip_valid ? (removeTimerThings("check_watchdog_urlip_valid", n), t({
            result: "success"
        })) : "invalid" == e.check_watchdog_urlip_valid && (removeTimerThings("check_watchdog_urlip_valid", n), t({
            result: "failure"
        }))
    }

    function getUpgradeUrlSetting() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "fota_download_url,dm_install_time", n.multi_data = 1, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setUpgradeUrl() {
        function e(e, t) {
            var n = {};
            return n.goformId = "FOTA_UPGRADE_URL_SET", n.isTest = isTest, n.fota_download_url = e.fota_download_url, n.dm_install_time = e.dm_install_time, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        arguments[1];
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getSliceSetting() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "nssai_pdn3_switch,nssai_pdn4_switch,MP_APN_config3,MP_APN_config4,multi_vlan_pdns_map_tmp,multi_vlan_pdns_map_ip_rule_3_1,multi_vlan_pdns_map_ip_rule_4_1,multi_pdns_wan_ipaddr_3,multi_pdns_ipv6_wan_ipaddr_3,multi_pdns_wan_ipaddr_4,multi_pdns_ipv6_wan_ipaddr_4", n.multi_data = 1, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setSliceSetting() {
        function e(e, t) {
            var n = {};
            return n.goformId = "PPP_DIAL_MULTI_PDNS_PARAM_SET", n.isTest = isTest, n.cid = e.cid, n.nssai_pdn_switch = e.nssai_pdn_switch, n.MP_APN_config = e.MP_APN_config, n.multi_vlan_pdns_map_tmp = e.multi_vlan_pdns_map_tmp, n.multi_vlan_pdns_map_ip_rule = e.multi_vlan_pdns_map_ip_rule, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        arguments[1];
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getNatSetting() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "nat_mode,telnet_lan_enable,telnet_wan_enable", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.nat_mode = "0" == e.nat_mode ? "0" : "1", t.telnet_lan_enable = e.telnet_lan_enable, t.telnet_wan_enable = e.telnet_wan_enable, t
            }
            return unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setNatSetting() {
        function e(e, t) {
            var n = {};
            return n.goformId = "NAT_SETTING", n.isTest = isTest, "0" == e.natSetting ? n.nat_mode = "0" : n.nat_mode = "", n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function setUdpEchologInfo(e, t) {
        function n(e) {
            return $.extend({
                isTest: isTest
            }, e)
        }

        function r(e) {
            return e && "success" == e.result ? e : unknownErrorObject
        }
        return doStuff(arguments, {}, n, r, null, !0)
    }

    function getVxlanTunnelSetting() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "vxlan_config,vxlan_enable,vxlan_auth_enable", n.multi_data = 1, n
        }

        function t(e) {
            return e ? n(e) : unknownErrorObject
        }

        function n(e) {
            var t = {
                    vxlan_config: e.vxlan_config,
                    vxlan_enable: e.vxlan_enable,
                    vxlan_auth_enable: e.vxlan_auth_enable,
                    tunnel_type: "",
                    ipv4_address: "",
                    ipv6_address: "",
                    port: "",
                    access_type: "",
                    vni: ""
                },
                n = e.vxlan_config.split(",");
            return n.length > 1 && (t.tunnel_type = n[0], t.ipv4_address = n[1], t.ipv6_address = n[2], t.port = n[3], t.access_type = n[4], t.vni = n[5]), t
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setVxlanTunnelSetting() {
        function e(e, t) {
            var n = {};
            return n.goformId = "VXLAN_TUNNEL_SETTINGS", n.vxlan_config = e.vxlan_config, n.vxlan_enable = e.vxlan_enable, n.vxlan_auth_enable = e.vxlan_auth_enable, n.isTest = isTest, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }

    function getVxlanInfo() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.cmd = "vxlan_mec_url,vxlan_mec_port,vxlan_mec_enable,vxlan_mec_tls_en,vxlan_mec_username,vxlan_mec_password,vxlan_mec_msgType,vxlan_mec_alivePeriod,vxlan_mec_pingPeriod,vxlan_mec_groupid,vxlan_mec_aes_key,vxlan_mec_aes_iv,vxlan_mec_authUsername,vxlan_mec_authPassword,vxlan_mec_status", n.multi_data = 1, n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !1)
    }

    function setVxlanAes() {
        function e(e, t) {
            var n = {};
            return n.isTest = isTest, n.goformId = "VXLAN_MEC_SETTINGS", n.vxlan_mec_enable = e.vxlan_mec_enable, "1" == e.vxlan_mec_enable && (n.vxlan_mec_url = e.vxlan_mec_url, n.vxlan_mec_port = e.vxlan_mec_port, n.vxlan_mec_username = e.vxlan_mec_username, n.vxlan_mec_password = e.vxlan_mec_password, n.vxlan_mec_groupid = e.vxlan_mec_groupid, n.vxlan_mec_alivePeriod = e.vxlan_mec_alivePeriod, n.vxlan_mec_tls_en = e.vxlan_mec_tls_en, n.vxlan_mec_aes_key = e.vxlan_mec_aes_key, n.vxlan_mec_aes_iv = e.vxlan_mec_aes_iv, n.vxlan_mec_authUsername = e.vxlan_mec_authUsername, n.vxlan_mec_authPassword = e.vxlan_mec_authPassword), n
        }

        function t(e) {
            return e || unknownErrorObject
        }
        return doStuff(arguments, {}, e, t, null, !0)
    }
    var wifiCallbackDestination = window,
        unknownErrorObject = {
            errorType: "UnknownError",
            errorId: "123",
            errorText: "UnknownError"
        },
        isTest = config.IS_TEST,
        timerUpdaterEnable = !0,
        isLoggedInFlag = 0,
        timerInfo = {
            networkType: "",
            signalImg: "0",
            spn_b1_flag: "1",
            spn_name_data: "",
            spn_b2_flag: "1",
            networkOperator: "",
            connectStatus: "ppp_disconnected",
            attachedDevices: [],
            curr_connected_devices: [],
            wifiSwitchStatus: "",
            data_counter: {
                uploadRate: 0,
                downloadRate: 0,
                totalSent: 0,
                totalReceived: 0,
                totalConnectedTime: 0,
                currentSent: 0,
                currentReceived: 0,
                currentConnectedTime: 0,
                monthlySent: 0,
                monthlyReceived: 0,
                monthlyConnectedTime: 0,
                month: ""
            },
            newSmsReceived: !1,
            smsReportReceived: !1,
            smsUnreadCount: "0",
            isLoggedIn: void 0,
            limitVolumeEnable: !1,
            limitVolumeType: "1",
            limitVolumePercent: "100",
            limitVolumeSize: "0",
            limitVolumeSizeSource: "0",
            allowRoamingUpdate: "0",
            opms_wan_mode: "",
            ap_station_enable: void 0,
            ap_station_mode: void 0,
            dialMode: "",
            is_night_mode: "0"
        },
        timerQueryString = ["modem_main_state", "pin_status", "opms_wan_mode", "opms_wan_auto_mode", "loginfo", "new_version_state", "current_upgrade_state", "is_mandatory", "wifi_dfs_status", "battery_value", "ppp_dial_conn_fail_counter"],
        loginTimerQueryString = ["signalbar", "network_type", "network_provider", "opms_wan_auto_mode", "dhcp_wan_status", "ppp_status", "EX_SSID1", "sta_ip_status", "EX_wifi_profile", "m_ssid_enable", "RadioOff", "wifi_onoff_state", "wifi_chip1_ssid1_ssid", "wifi_chip2_ssid1_ssid", "wifi_chip1_ssid1_access_sta_num", "wifi_chip2_ssid1_access_sta_num", "simcard_roam", "lan_ipaddr", "station_mac", "wifi_access_sta_num", "battery_charging", "battery_vol_percent", "battery_pers", "spn_name_data", "spn_b1_flag", "spn_b2_flag", "realtime_tx_bytes", "realtime_rx_bytes", "realtime_time", "realtime_tx_thrpt", "realtime_rx_thrpt", "monthly_rx_bytes", "monthly_tx_bytes", "monthly_time", "date_month", "data_volume_limit_switch", "data_volume_limit_size", "data_volume_alert_percent", "data_volume_limit_unit", "roam_setting_option", "upg_roam_switch", "ssid", "wifi_enable", "wifi_5g_enable", "check_web_conflict", "dial_mode", "ppp_dial_conn_fail_counter", "wan_lte_ca", "privacy_read_flag", "is_night_mode", "pppoe_status", "dhcp_wan_status", "static_wan_status", "vpn_conn_status", "rmcc", "rmnc", "wan_connect_status", "wifi_onoff_wifi5g_by_n79_mutex"];
    config.HAS_SMS && $.merge(loginTimerQueryString, ["sms_received_flag", "sts_received_flag", "sms_unread_num"]), config.HAS_MULTI_SSID && $.merge(loginTimerQueryString, ["wifi_chip1_ssid2_access_sta_num", "wifi_chip2_ssid2_access_sta_num"]);
    var timerCallbackStack = [],
        timerCallbacks = [timerUpdateStatus];
    $(document).ready(function () {
        setTimeout(function () {
            timerUpdater()
        }, config.IS_TEST ? 1e3 : 0)
    });
    var deviceInfo2 = {
        apn_interface_version: "",
        wifi_coverage: "",
        m_ssid_enable: "",
        imei: "",
        network_type: "",
        rssi: "",
        rscp: "",
        imsi: "",
        sim_imsi: "",
        cr_version: "",
        wa_version: "",
        hardware_version: "",
        web_version: "",
        wa_inner_version: "",
        MAX_Access_num: "",
        SSID1: "",
        AuthMode: "",
        WPAPSK1_encode: "",
        m_SSID: "",
        m_AuthMode: "",
        m_HideSSID: "",
        m_WPAPSK1_encode: "",
        m_MAX_Access_num: "",
        lan_ipaddr: "",
        mac_address: "",
        msisdn: "",
        LocalDomain: "",
        wan_ipaddr: "",
        static_wan_ipaddr: "",
        ipv6_wan_ipaddr: "",
        ipv6_pdp_type: "",
        ipv6_pdp_type_ui: "",
        pdp_type: "",
        pdp_type_ui: "",
        opms_wan_mode: "",
        ppp_status: "",
        wan_lte_ca: "",
        lte_ca_pcell_band: "",
        lte_ca_pcell_bandwidth: "",
        lte_ca_scell_band: "",
        lte_ca_scell_bandwidth: "",
        lte_ca_scell_freq: "",
        cell_id: "",
        lte_snr: "",
        wan_active_band: "",
        lte_ca_pcell_freq: "",
        lte_rsrq: "",
        lte_rsrp: ""
    };
    return {
        setDeviceAccessControlList: setDeviceAccessControlList,
        getUserIPAddr: getUserIPAddr,
        setMacFilterStatus: setMacFilterStatus,
        getAntiVioCraSetting: getAntiVioCraSetting,
        getMacFilterStatus: getMacFilterStatus,
        setWifiWpsStart: setWifiWpsStart,
        setWifiChipAdvanceInfo: setWifiChipAdvanceInfo,
        setWifiModuleSwitchStatus: setWifiModuleSwitchStatus,
        setWifiAccessPointInfo: setWifiAccessPointInfo,
        getWifiWpsStatus: getWifiWpsStatus,
        getWifiAccessPointInfo: getWifiAccessPointInfo,
        getWifiModuleSwitchStatus: getWifiModuleSwitchStatus,
        getSleepModeStatus: getSleepModeStatus,
        setRedirectOff: setRedirectOff,
        setBindMacIpSwitch: setBindMacIpSwitch,
        clearRedirectFlag: clearRedirectFlag,
        getRedirectData: getRedirectData,
        getSntpDSTByTimeZone: getSntpDSTByTimeZone,
        getBindIPInfo: getBindIPInfo,
        setBindIPInfo: setBindIPInfo,
        delStaticAddrRules: delStaticAddrRules,
        addStaticAddress: addStaticAddress,
        getStaticMacIpAddressList: getStaticMacIpAddressList,
        getStaticIpAddrList: getStaticIpAddrList,
        getWifiBasic: getWifiBasic,
        setWifiBasicSync: setWifiBasicSync,
        setWifiBasic: setWifiBasic,
        setWifiBasic4SSID2: setWifiBasic4SSID2,
        setWifiBasicMultiSSIDSwitch: setWifiBasicMultiSSIDSwitch,
        getSecurityInfo: getSecurityInfo,
        setSecurityInfo: setSecurityInfo,
        getCurrentlyAttachedDevicesInfo: getCurrentlyAttachedDevicesInfo,
        getAttachedCableDevices: getAttachedCableDevices,
        getLanguage: getLanguage,
        setLanguage: setLanguage,
        getNetSelectInfo: getNetSelectInfo,
        setBearerPreference: setBearerPreference,
        scanForNetwork: scanForNetwork,
        getConnectionInfo: getConnectionInfo,
        getStatusInfo: getStatusInfo,
        connect: connect,
        disconnect: disconnect,
        setNetwork: setNetwork,
        getCurrentNetwork: getCurrentNetwork,
        savePhoneBook: savePhoneBook,
        deletePhoneBooks: deletePhoneBooks,
        deleteAllPhoneBooks: deleteAllPhoneBooks,
        deleteAllPhoneBooksByGroup: deleteAllPhoneBooksByGroup,
        getDevicePhoneBooks: getDevicePhoneBooks,
        getSIMPhoneBooks: getSIMPhoneBooks,
        getPhoneBooks: getPhoneBooks,
        getPhoneBookReady: getPhoneBookReady,
        getPhoneBooksByGroup: getPhoneBooksByGroup,
        getConnectionMode: getConnectionMode,
        setConnectionMode: setConnectionMode,
        getApnSettings: getApnSettings,
        deleteApn: deleteApn,
        setDefaultApn: setDefaultApn,
        addOrEditApn: addOrEditApn,
        getSIMPhoneBookCapacity: getSIMPhoneBookCapacity,
        getDevicePhoneBookCapacity: getDevicePhoneBookCapacity,
        getLoginData: getLoginData,
        login: login,
        logout: logout,
        getLoginStatus: getLoginStatus,
        enterPIN: enterPIN,
        enterPUK: enterPUK,
        getSMSReady: getSMSReady,
        getSMSMessages: getSMSMessages,
        sendSMS: sendSMS,
        saveSMS: saveSMS,
        deleteAllMessages: deleteAllMessages,
        deleteMessage: deleteMessage,
        setSmsRead: setSmsRead,
        resetNewSmsReceivedVar: resetNewSmsReceivedVar,
        resetSmsReportReceivedVar: resetSmsReportReceivedVar,
        getSMSDeliveryReport: getSMSDeliveryReport,
        getSmsCapability: getSmsCapability,
        changePassword: changePassword,
        getPinData: getPinData,
        enablePin: enablePin,
        disablePin: disablePin,
        changePin: changePin,
        getLanInfo: getLanInfo,
        setLanInfo: setLanInfo,
        getSmsSetting: getSmsSetting,
        setSmsSetting: setSmsSetting,
        restoreFactorySettings: restoreFactorySettings,
        checkRestoreStatus: checkRestoreStatus,
        getWpsInfo: getWpsInfo,
        openWps: openWps,
        getSleepMode: getSleepMode,
        setSleepMode: setSleepMode,
        getSysSecurity: getSysSecurity,
        setSysSecurity: setSysSecurity,
        getPortForward: getPortForward,
        setPortForward: setPortForward,
        deleteForwardRules: deleteForwardRules,
        enableVirtualServer: enableVirtualServer,
        getSDConfiguration: getSDConfiguration,
        setSdCardMode: setSdCardMode,
        checkFileExists: checkFileExists,
        getFileList: getFileList,
        fileRename: fileRename,
        getSdMemorySizes: getSdMemorySizes,
        deleteFilesAndFolders: deleteFilesAndFolders,
        createFolder: createFolder,
        checkUploadFileStatus: checkUploadFileStatus,
        setSdCardSharing: setSdCardSharing,
        getQuickSettingInfo: getQuickSettingInfo,
        setQuickSetting: setQuickSetting,
        setQuickSetting4IPv6: setQuickSetting4IPv6,
        getPortFilter: getPortFilter,
        setPortFilterBasic: setPortFilterBasic,
        setPortFilter: setPortFilter,
        deleteFilterRules: deleteFilterRules,
        getWifiAdvance: getWifiAdvance,
        setWifiAdvance: setWifiAdvance,
        getWifiRange: getWifiRange,
        getWifiCoverageInfo: getWifiCoverageInfo,
        setWifiRange: setWifiRange,
        setWifiCoverageInfo: setWifiCoverageInfo,
        getUpnpSetting: getUpnpSetting,
        setUpnpSetting: setUpnpSetting,
        getDmzSetting: getDmzSetting,
        setDmzSetting: setDmzSetting,
        getDeviceInfo: getDeviceInfo,
        getPortMap: getPortMap,
        setPortMap: setPortMap,
        enablePortMap: enablePortMap,
        deleteMapRules: deleteMapRules,
        getTrafficAlertInfo: getTrafficAlertInfo,
        setTrafficAlertInfo: setTrafficAlertInfo,
        getDlnaSetting: getDlnaSetting,
        setDlnaSetting: setDlnaSetting,
        rescanDlna: rescanDlna,
        getUSSDResponse: getUSSDResponse,
        USSDReplyCancel: USSDReplyCancel,
        getNetworkUnlockTimes: getNetworkUnlockTimes,
        unlockNetwork: unlockNetwork,
        setUpdateInfoWarning: setUpdateInfoWarning,
        getUpdateInfoWarning: getUpdateInfoWarning,
        getAPStationBasic: getAPStationBasic,
        setAPStationBasic: setAPStationBasic,
        getHotspotList: getHotspotList,
        searchHotspot: searchHotspot,
        getSearchHotspotList: getSearchHotspotList,
        saveHotspot: saveHotspot,
        deleteHotspot: deleteHotspot,
        connectHotspot: connectHotspot,
        disconnectHotspot: disconnectHotspot,
        getOpMode: getOpMode,
        SetOperationMode: SetOperationMode,
        SendUpgradeMessage: SendUpgradeMessage,
        getPppoeParams: getPppoeParams,
        setPppoeDialMode: setPppoeDialMode,
        getSntpParams: getSntpParams,
        setSntpSetting: setSntpSetting,
        setSNTPDate: setSNTPDate,
        addUrlFilterRule: addUrlFilterRule,
        getUrlFilterList: getUrlFilterList,
        deleteSelectedRules: deleteSelectedRules,
        getWdsInfo: getWdsInfo,
        setWDS: setWDS,
        getSyslogInfo: getSyslogInfo,
        setSysLog: setSysLog,
        getTR069Config: getTR069Config,
        setTR069Configuration: setTR069Configuration,
        getVoipSettings: getVoipSettings,
        setVoipSettings: setVoipSettings,
        getVoipUserDetails: getVoipUserDetails,
        getVoipUserRegisterStatus: getVoipUserRegisterStatus,
        setVoipUserDetails: setVoipUserDetails,
        setVoipAdvancedSettings: setVoipAdvancedSettings,
        getVoipAdvancedSettings: getVoipAdvancedSettings,
        getVoipSupplementaryService: getVoipSupplementaryService,
        setVoipSupplementaryService: setVoipSupplementaryService,
        getMacFilterInfo: getMacFilterInfo,
        setMacFilter: setMacFilter,
        getFastbootSetting: getFastbootSetting,
        setFastbootSetting: setFastbootSetting,
        restart: restart,
        shutdown: shutdown,
        timerUpdaterEnable: timerUpdaterEnable,
        clearTraffic: clearTraffic,
        switchPortForLog: switchPortForLog,
        childGroupList: childGroupList,
        addChildGroup: addChildGroup,
        removeChildGroup: removeChildGroup,
        checkCurrentUserInChildGroup: checkCurrentUserInChildGroup,
        getChildMacRuleInfo: getChildMacRuleInfo,
        removeChildMacRule: removeChildMacRule,
        addChildAccessTimeRule: addChildAccessTimeRule,
        updateChildAccessTimeRule: updateChildAccessTimeRule,
        getCurretnMAC: getCurretnMAC,
        editHostName: editHostName,
        getSiteWhiteList: getSiteWhiteList,
        removeSiteWhite: removeSiteWhite,
        saveSiteWhite: saveSiteWhite,
        getTimeLimited: getTimeLimited,
        saveTimeLimited: saveTimeLimited,
        getHostNameList: getHostNameList,
        getTsw: getTsw,
        saveTsw: saveTsw,
        getSysTimeMode: getSysTimeMode,
        trafficCalibration: trafficCalibration,
        getParams: getParams,
        getNewVersionState: getNewVersionState,
        getUpgradeResult: getUpgradeResult,
        getCurrentUpgradeState: getCurrentUpgradeState,
        dmUpdatePackageExit: dmUpdatePackageExit,
        setUpgradeSelectOp: setUpgradeSelectOp,
        addTimerThings: addTimerThings,
        removeTimerThings: removeTimerThings,
        getPackSizeInfo: getPackSizeInfo,
        getNewVersionInfo: getNewVersionInfo,
        getMandatory: getMandatory,
        getUserChoice: getUserChoice,
        getOTAUpdateSetting: getOTAUpdateSetting,
        setOTAUpdateSetting: setOTAUpdateSetting,
        getSignalStrength: getSignalStrength,
        getOTAlastCheckTime: getOTAlastCheckTime,
        getOTASuccessTime: getOTASuccessTime,
        clearUpdateResult: clearUpdateResult,
        getSearchHotspotListWithoutScanFinish: getSearchHotspotListWithoutScanFinish,
        setHotspotListSpan: setHotspotListSpan,
        getHotspotListSort: getHotspotListSort,
        setNV: setNV,
        setWifiBand: setWifiBand,
        refreshAPStationStatus: refreshAPStationStatus,
        getSTKFlagInfo: getSTKFlagInfo,
        getSTKInfo: getSTKInfo,
        getSTKMenuInfo: getSTKMenuInfo,
        setSTKMenuInfo: setSTKMenuInfo,
        getAutoPowerSave: getAutoPowerSave,
        setAutoPowerSave: setAutoPowerSave,
        getDHCPStaticAddressRules: getDHCPStaticAddressRules,
        setMtuMss: setMtuMss,
        setHaveReadPrivacyNote: setHaveReadPrivacyNote,
        setUserImprovNote: setUserImprovNote,
        setUserGrantNote: setUserGrantNote,
        setWifiFrequency: setWifiFrequency,
        setWifiAdvanceGuest: setWifiAdvanceGuest,
        setSkipSetting: setSkipSetting,
        setWifiAdvance24G5G: setWifiAdvance24G5G,
        diagnosisSettings: diagnosisSettings,
        getDeviceAccessControlList: getDeviceAccessControlList,
        getThermalControlSetting: getThermalControlSetting,
        setThermalControlSetting: setThermalControlSetting,
        getPinglogInfo: getPinglogInfo,
        setPinglogInfo: setPinglogInfo,
        getsleepProtection: getsleepProtection,
        saveSleepProtection: saveSleepProtection,
        getRebootInfo: getRebootInfo,
        setRebootScheduleFixTime: setRebootScheduleFixTime,
        getVPNClientSetting: getVPNClientSetting,
        setVPNClientSetting: setVPNClientSetting,
        vpnConnect: vpnConnect,
        vpnDisconnect: vpnDisconnect,
        setWifiWholeChipAdvanceInfo: setWifiWholeChipAdvanceInfo,
        getVoipVolteSetting: getVoipVolteSetting,
        setVoipVolteSetting: setVoipVolteSetting,
        setTr069Module: setTr069Module,
        setSuggestedPositionDetect: setSuggestedPositionDetect,
        setSuggestedPositionCancel: setSuggestedPositionCancel,
        getSuggestedPositionDetectProgress: getSuggestedPositionDetectProgress,
        getSuggestedPositionDetectResult: getSuggestedPositionDetectResult,
        getSuggestedPositionDetectRecord: getSuggestedPositionDetectRecord,
        addSuggestedPositionRecord: addSuggestedPositionRecord,
        deleteSingleSuggestedPositionRecord: deleteSingleSuggestedPositionRecord,
        deleteAllSuggestedPositionRecord: deleteAllSuggestedPositionRecord,
        getTempStatus: getTempStatus,
        setWifiAccessPointInfo_24G5G: setWifiAccessPointInfo_24G5G,
        getAntennaControlSetting: getAntennaControlSetting,
        setAntennaControlSetting: setAntennaControlSetting,
        getDebugInfo: getDebugInfo,
        setBandSelect: setBandSelect,
        setOnlineLpm: setOnlineLpm,
        setIMS: setIMS,
        setVOICE: setVOICE,
        setWlanTputs: setWlanTputs,
        setNr5gBandSelect: setNr5gBandSelect,
        setAntennaState: setAntennaState,
        setRFMMW: setRFMMW,
        setMbnMode: setMbnMode,
        setMqttMecAes: setMqttMecAes,
        setPsRestart: setPsRestart,
        getWiFiGuestLeftTime: getWiFiGuestLeftTime,
        getWatchDogSetting: getWatchDogSetting,
        setWatchDogSetting: setWatchDogSetting,
        getUpgradeUrlSetting: getUpgradeUrlSetting,
        setUpgradeUrl: setUpgradeUrl,
        getSliceSetting: getSliceSetting,
        setSliceSetting: setSliceSetting,
        setCellLockSetting: setCellLockSetting,
        setN79Wlan5gPrioritySetting: setN79Wlan5gPrioritySetting,
        getNatSetting: getNatSetting,
        setNatSetting: setNatSetting,
        getUdpEchoInfo: getUdpEchoInfo,
        setUdpEchologInfo: setUdpEchologInfo,
        getVxlanTunnelSetting: getVxlanTunnelSetting,
        setVxlanTunnelSetting: setVxlanTunnelSetting,
        getVxlanInfo: getVxlanInfo,
        setVxlanAes: setVxlanAes
    }
});
//# sourceMappingURL=../sourcemaps/service.js.map