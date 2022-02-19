define(["knockout", "service", "jquery", "config/config", "underscore"], function (e, o, a, r, s) {
    function d() {
        var s = this,
            d = "";
        s.hasLteBridge = e.observable(-1 != a.inArray("LTE_BRIDGE", r.OPERATE_MODE)), s.hasPppoe = e.observable(-1 != a.inArray("PPPOE", r.OPERATE_MODE)), s.hasPpp = e.observable(-1 != a.inArray("PPP", r.OPERATE_MODE)), s.hasAutoOpmode = e.observable(-1 != a.inArray("AUTO", r.OPERATE_MODE)), s.selectedMode = e.observable("0"), s.selectedLANWAN = e.observable("0"), s.ipAddress = e.observable(""), o.getOpMode({}, function (e) {
            d = "DHCP" == e.opms_wan_mode || "STATIC" == e.opms_wan_mode ? "PPPOE" : "AUTO_DHCP" == e.opms_wan_mode || "AUTO_PPPOE" == e.opms_wan_mode || "AUTO_LTE_GATEWAY" == e.opms_wan_mode ? "AUTO" : e.opms_wan_mode, s.selectedMode(d), s.selectedLANWAN(e.ethernet_port_specified)
        }), s.changeOpMode = function () {
            if (r.OPMODE_CHANGE_SUPPORT) {
                var e = a('input:radio[name="opMode"]:checked').val(),
                    d = ""; - 1 != a.inArray(e, r.OPERATE_MODE) && ("LTE_BRIDGE" == e || "PPPOE" == e ? changeOpMode2(e) : (d = "opmode_msg2", showConfirm(d, function () {
                    showLoading();
                    var r = {};
                    r.opMode = e, "AUTO_BACKUP" == e && "" != s.ipAddress() && (r.ping_target = s.ipAddress()), o.SetOperationMode(r, function (o) {
                        if (o && "success" == o.result) {
                            var r = "";
                            switch (e) {
                                case "LTE_BRIDGE":
                                    r = "opmode_bridge";
                                    break;
                                case "PPPOE":
                                    r = "opmode_cable";
                                    break;
                                case "PPP":
                                    r = "opmode_gateway";
                                    break;
                                case "AUTO":
                                    r = "opmode_auto";
                                    break;
                                case "AUTO_BACKUP":
                                    r = "opmode_autobackup"
                            }
                            a("#opmode").attr("data-trans", r).text(a.i18n.prop(r)), successOverlay()
                        } else errorOverlay()
                    })
                })))
            }
        }
    }

    function n() {
        var o = new d;
        e.applyBindings(o, a("#popupSettingWindow")[0]), a("#opmode_form").validate({
            submitHandler: function () {
                o.changeOpMode()
            },
            rules: {
                txtIpAddress: "ip_check"
            }
        })
    }
    return changeOpMode2 = function (e) {
        var e = e,
            r = a('input:radio[name="opMode2"]:checked').val();
        o.getOpMode({}, function (s) {
            "PPPOE" != e || "PPPOE" != s.opms_wan_mode && "DHCP" != s.opms_wan_mode && "STATIC" != s.opms_wan_mode || (e = s.opms_wan_mode), o.SetOperationMode({
                opMode: e,
                ethernet_port_specified: r
            }, function (o) {
                if (o && "success" == o.result) {
                    var r = "";
                    switch (e) {
                        case "LTE_BRIDGE":
                            r = "opmode_bridge";
                            break;
                        case "PPPOE":
                            r = "opmode_cable";
                            break;
                        case "PPP":
                            r = "opmode_gateway";
                            break;
                        case "AUTO":
                            r = "opmode_auto";
                            break;
                        case "AUTO_BACKUP":
                            r = "opmode_autobackup"
                    }
                    a("#opmode").attr("data-trans", r).text(a.i18n.prop(r)), successOverlay()
                } else errorOverlay()
            })
        })
    }, {
        init: n
    }
});
//# sourceMappingURL=../../sourcemaps/opmode/opmode_popup.js.map