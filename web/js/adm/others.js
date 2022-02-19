define(["jquery", "knockout", "config/config", "service", "underscore"], function (n, e, r, i, o) {
    function s() {
        var n = this;
        n.hastr069 = r.HAS_TR069, n.wanMode = r.opms_wan_mode, n.IS_SUPORT_NIGHT_MODE = r.IS_SUPORT_NIGHT_MODE, n.hasUserImprov = r.HAS_USER_IMPROVEMENT, n.isUFI = -1 != r.DEVICE.toLowerCase().indexOf("ufi");
        var o = !1;
        r.HAS_PARENTAL_CONTROL && (o = i.checkCurrentUserInChildGroup().result), n.currentUserInChildGroup = e.observable(o)
    }

    function t() {
        var r = new s;
        e.applyBindings(r, n("#container")[0])
    }
    return {
        init: t
    }
});
//# sourceMappingURL=../../sourcemaps/adm/others.js.map