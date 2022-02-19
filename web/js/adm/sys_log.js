define(["jquery", "knockout", "config/config", "service", "underscore"], function (o, e, n, s, r) {
    function t() {
        function n() {
            o.ajax({
                url: "messages",
                cache: !1,
                success: function (o) {
                    t.logInfomation(o)
                },
                error: function () {}
            })
        }
        var r = s.getSyslogInfo(),
            t = this;
        t.logModes = e.observableArray(i), t.currentMode = e.observable(r.currentMode), t.showLogInfomation = e.observable(!1), t.showDivForLog = e.observable(!1), t.debugLevel = e.observable(), t.logInfomation = e.observable(),
            function () {
                "7" == r.debugLevel ? (t.debugLevel("open"), t.showLogInfomation(!0), t.showDivForLog(!0), n()) : (t.debugLevel("close"), t.showLogInfomation(!1))
            }(), t.FlagOnChange = function () {
                "open" == t.debugLevel() ? t.showDivForLog(!0) : t.showDivForLog(!1)
            }, t.apply = function () {
                s.setSysLog({
                    goformId: "SYSLOG",
                    syslog_flag: t.debugLevel(),
                    syslog_mode: t.currentMode()
                }, function (o) {
                    "success" == o.result ? "open" == t.debugLevel() ? (t.showLogInfomation(!0), n()) : (successOverlay(), t.showLogInfomation(!1), clearTimer()) : errorOverlay()
                })
            }, t.deleteLog = function () {
                s.setSysLog({
                    goformId: "SYSLOG",
                    syslog_flag: "delete",
                    syslog_mode: t.currentMode()
                }, function (o) {
                    "success" == o.result ? (successOverlay(), n()) : errorOverlay()
                })
            }, t.ExportSyslog = function () {
                var e = hex_md5(rd0 + rd1),
                    n = s.getParams({
                        nv: "RD"
                    }).RD,
                    r = hex_md5(e + n);
                o("#syslogInformationForm").attr("action", "/cgi-bin/ExportSyslog.sh?AD=" + r), document.syslogInformationForm.submit()
            }
    }

    function a() {
        var n = o("#container");
        e.cleanNode(n[0]);
        var s = new t;
        e.applyBindings(s, n[0]), o("#sysLogForm").validate({
            submitHandler: function () {
                s.apply()
            }
        }), o("#syslogInformationForm").validate({
            submitHandler: function () {
                s.ExportSyslog()
            }
        })
    }
    var i = r.map(n.sysLogModes, function (o) {
        return new Option(o.name, o.value)
    });
    return {
        init: a
    }
});
//# sourceMappingURL=../../sourcemaps/adm/sys_log.js.map