define(["jquery", "knockout", "config/config", "service", "underscore"], function (e, t, n, r, o) {
    function a() {
        var o = this;
        o.enableFlag = t.observable(!0), o.types = t.observableArray(l), o.selectedType = t.observable(), o.selectMode = t.observable(), o.networkList = t.observableArray([]), o.selectNetwork = t.observable(""), o.networkStatus = function (t) {
            return e.i18n.prop(s(t.nState))
        }, o.networkStatusId = function (e) {
            return s(e.nState)
        }, o.networkText = function (e) {
            return e.strNumeric
        }, o.operatorName = function (e) {
            return e.strShortName
        }, o.networkType = function (t) {
            var n = i(t.nRat);
            return "auto" == n && (n = e.i18n.prop("auto")), n
        }, o.networkTypeId = function (e) {
            return i(e.nRat)
        }, o.networkValue = function (e) {
            var t = [];
            return t.push(e.strNumeric), t.push(e.nRat), t.join(",")
        }, o.save = function () {
            n.VOLTE_SUPPORT || "Only_LTE" != o.selectedType() ? o.saveAct() : showConfirm("network_is_Lte_only", function () {
                o.saveAct()
            })
        }, o.saveAct = function () {
            showLoading();
            var e = {};
            e.strBearerPreference = o.selectedType(), r.setBearerPreference(e, function (e) {
                "success" == e.result ? (o.networkList([]), successOverlay()) : errorOverlay(), o.fetchCurrentNetwork()
            })
        }, o.search = function () {
            showLoading("searching_net", e.i18n.prop("manual_search_alert")), r.scanForNetwork(function (e, t) {
                if (hideLoading(), e) {
                    var n = c();
                    o.selectedType(n.net_select), o.networkList(t);
                    for (var r = 0; r < t.length; r++) {
                        var a = t[r];
                        if ("2" == a.nState) return void o.selectNetwork(a.strNumeric + "," + a.nRat)
                    }
                } else o.networkList([]);
                o.fetchCurrentNetwork()
            })
        }, o.register = function () {
            var e = o.selectNetwork().split(",");
            e.length <= 1 || (n.VOLTE_SUPPORT || "7" != e[1] ? o.registerAct() : showConfirm("network_is_Lte_only", function () {
                o.registerAct()
            }))
        }, o.registerAct = function () {
            showLoading("registering_net");
            var e = o.selectNetwork().split(",");
            r.setNetwork(e[0], parseInt(e[1]), function (e) {
                if (e) {
                    o.networkList([]);
                    var t = c();
                    o.selectedType(t.net_select), successOverlay()
                } else errorOverlay();
                o.fetchCurrentNetwork()
            })
        }, o.checkEnable = function () {
            var e = r.getStatusInfo();
            checkConnectedStatus(e.connectStatus) ? o.enableFlag(!1) : o.enableFlag(!0)
        }, o.checkEnable();
        var a = c();
        "manual_select" == a.net_select_mode || "manual_select" == a.m_netselect_save ? o.selectMode("manual_select") : o.selectMode("auto_select"), o.selectedType(a.net_select), o.fetchCurrentNetwork = function () {}
    }

    function c() {
        return r.getNetSelectInfo()
    }

    function s(e) {
        return "0" == e ? "unknown" : "1" == e ? "available" : "2" == e ? "current" : "3" == e ? "forbidden" : void 0
    }

    function i(e) {
        var t = r.getStatusInfo();
        return "0" == e ? "2G" : "2" == e ? "3G" : "7" == e ? t.isCaStatus ? "4G+" : "4G" : "12" == e ? "5G" : "auto"
    }

    function u() {
        var n = e("#container");
        t.cleanNode(n[0]);
        var r = new a;
        t.applyBindings(r, n[0]), addInterval(r.checkEnable, 1e3)
    }
    var l = o.map(n.AUTO_MODES, function (e) {
        return new Option(e.name, e.value)
    });
    return {
        init: u
    }
});
//# sourceMappingURL=../../sourcemaps/network/net_select.js.map