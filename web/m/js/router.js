define(["jquery", "configPath", "director"], function (i, t) {
    function e() {
        a = Router(s), a.configure({
            notfound: function () {
                r(t.isLogin ? t.homeRoute : t.defaultRouteM)
            },
            before: function () {
                return !0
            }
        }), a.init(), "" == window.location.hash && r(t.defaultRouteM)
    }

    function o(i) {
        return -1 != _.indexOf(c, i) ? "mode_limit" : i
    }

    function n(i) {
        if (-1 != _.indexOf(d, i)) {
            var e = ["modem_sim_undetected", "modem_sim_destroy", "modem_waitpin", "modem_waitpuk"],
                o = -1 != _.indexOf(e, t.SIM_CARD_STATUS),
                n = -1 != _.indexOf(t.TEMPORARY_MODEM_MAIN_STATE, t.SIM_CARD_STATUS);
            if (o || n) return "nosimcard";
            if ("modem_imsi_waitnck" == t.SIM_CARD_STATUS) return "network_lock"
        }
        return i
    }

    function f() {
        clearTimer(), t.lastHash = window.location.hash;
        var e = t.lastHash.slice(2);
        if (!t.isLogin && e != t.defaultRouteM) return void r(t.defaultRouteM);
        if (t.isLogin && e == t.defaultRouteM) return void r(t.homeRoute);
        "CPE" == t.DEVICE_TYPE && "PPP" != t.DEVICE_MODE && "AUTO_LTE_GATEWAY" != t.DEVICE_MODE && (e = o(e)), e = n(e);
        var f = "text!views/" + e + ".html";
        require([f, e], function (t, e) {
            u.stop(!0, !0), u.hide(), u.html(t), e.init(), u.translate(), i("form").attr("autocomplete", "off"), u.enhanceWithin(), u.show()
        })
    }

    function r(i) {
        a.setRoute(i)
    }
    var a, u = i("#container"),
        s = {
            "/home": f,
            "/login": f,
            "/network/view": f,
            "/network/mode": f,
            "/sms/list": f,
            "/others/ota_update": f,
            "/others/view": f,
            "/others/password": f,
            "/wifi/view": f,
            "/wifi/wps": f,
            "/wifi/wifi_setting": f,
            "/wifi/wifi_main": f,
            "/wifi/wifi_guest": f,
            "/nosimcard": f,
            "/traffic/view": f,
            "/traffic/traffic_adjust": f,
            "/traffic/traffic_setting": f,
            "/network_lock": f
        },
        c = ["network/view", "network/mode", "traffic/view", "traffic/traffic_adjust", "traffic/traffic_setting"],
        d = ["network/view", "network/mode", "traffic/view", "traffic/traffic_adjust", "traffic/traffic_setting", "sms/list", "update/ota_update"];
    return {
        init: e,
        redirectTo: r,
        loadResources: f
    }
});
//# sourceMappingURL=../../sourcemaps/m/router.js.map