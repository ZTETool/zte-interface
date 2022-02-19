define(["jquery", "service", "knockout", "config/config"], function (e, s, a, n) {
    function i() {
        var e = this,
            i = s.getDeviceInfo();
        e.ssid = a.observable(verifyDeviceInfo(i.ssid)), e.passPhrase = a.observable(), e.showPassPhrase = a.observable("OPEN" != i.authMode), e.showPassPhrase() && e.passPhrase(verifyDeviceInfo(i.passPhrase)), e.m_ssid = a.observable(verifyDeviceInfo(i.m_ssid)), e.m_passPhrase = a.observable(), e.m_showPassPhrase = a.observable("OPEN" != i.m_authMode), e.m_showPassPhrase() && e.m_passPhrase(verifyDeviceInfo(i.m_passPhrase)), e.m_max_access_num = a.observable(verifyDeviceInfo(i.m_max_access_num)), e.showMssid = a.observable("1" == i.multi_ssid_enable && n.HAS_MULTI_SSID), e.ipAddress = a.observable(verifyDeviceInfo(i.ipAddress)), e.wanIpAddress = a.observable(), e.ipv6WanIpAddress = a.observable(), e.macAddress = a.observable(verifyDeviceInfo(i.macAddress)), e.simSerialNumber = a.observable(verifyDeviceInfo(i.simSerialNumber)), e.lanDomain = a.observable(verifyDeviceInfo(i.lanDomain)), e.imei = a.observable(verifyDeviceInfo(i.imei)), e.sw_version = a.observable(verifyDeviceInfo(i.sw_version)), e.fw_version = a.observable(verifyDeviceInfo(i.fw_version)), e.hw_version = a.observable(verifyDeviceInfo(i.hw_version)), e.max_access_num = a.observable(verifyDeviceInfo(i.max_access_num)), e.showMacAddress = a.observable(n.SHOW_MAC_ADDRESS), e.hasWifi = a.observable(n.HAS_WIFI);
        var o = i.ipv6PdpType.toLowerCase().indexOf("v6") > 0;
        if (e.showIpv6WanIpAddr = a.observable(), e.showIpv4WanIpAddr = a.observable(), e.imsi = a.observable(verifyDeviceInfo(i.imsi)), e.signal = a.observable(signalFormat(i.signal)), "LTE_BRIDGE" == i.opms_wan_mode ? (e.showIpv6WanIpAddr(!1), e.showIpv4WanIpAddr(!1)) : "DHCP" == i.opms_wan_mode || "PPPOE" == i.opms_wan_mode ? (e.showIpv6WanIpAddr(!1), e.showIpv4WanIpAddr(!0), e.wanIpAddress(verifyDeviceInfo(i.wanIpAddress))) : "STATIC" == i.opms_wan_mode ? (e.showIpv6WanIpAddr(!1), e.showIpv4WanIpAddr(!0), e.wanIpAddress(verifyDeviceInfo(i.staticWanIpAddress))) : n.IPV6_SUPPORT ? "IP" == i.pdpType ? (e.showIpv6WanIpAddr(!1), e.showIpv4WanIpAddr(!0)) : o && ("IPv6" == i.ipv6PdpType ? (e.showIpv6WanIpAddr(!0), e.showIpv4WanIpAddr(!1)) : (e.showIpv6WanIpAddr(!0), e.showIpv4WanIpAddr(!0))) : (e.showIpv6WanIpAddr(!1), e.showIpv4WanIpAddr(!0)), "PPP" == i.opms_wan_mode) {
            var v = r(i.connectStatus);
            1 == v ? (e.wanIpAddress(verifyDeviceInfo(i.wanIpAddress)), e.ipv6WanIpAddress("— —")) : 2 == v ? (e.wanIpAddress("— —"), e.ipv6WanIpAddress(verifyDeviceInfo(i.ipv6WanIpAddress))) : 3 == v ? (e.wanIpAddress(verifyDeviceInfo(i.wanIpAddress)), e.ipv6WanIpAddress(verifyDeviceInfo(i.ipv6WanIpAddress))) : (e.wanIpAddress("— —"), e.ipv6WanIpAddress("— —"))
        }
        e.wifiRange = a.observable("wifi_" + i.wifiRange)
    }

    function r(e) {
        return "ppp_disconnected" == e || "ppp_connecting" == e || "ppp_disconnecting" == e ? 0 : "ppp_connected" == e ? 1 : "ipv6_connected" == e ? 2 : "ipv4_ipv6_connected" == e ? 3 : void 0
    }

    function o() {
        var n = e("#container")[0];
        a.cleanNode(n);
        var r = new i;
        a.applyBindings(r, n), addInterval(function () {
            s.getDeviceInfo({}, function (e) {
                r.signal(signalFormat(e.signal))
            })
        }, 1e3)
    }
    return {
        init: o
    }
});
//# sourceMappingURL=../../sourcemaps/status/device_info.js.map