define(["jquery", "knockout", "config/config", "service", "underscore"], function (e, o, n, a, r) {
    function s() {
        function n() {
            "0" == f.CheckPingMode() ? DiaMessages = "PingMessages" : "1" == f.CheckPingMode() ? DiaMessages = "TracerouteMessages" : DiaMessages = "NslookupMessages", "3" != f.CheckPingMode() ? e.ajax({
                url: DiaMessages,
                cache: !1,
                success: function (e) {
                    "0" == f.CheckPingMode() ? f.logInfomation(e) : "1" == f.CheckPingMode() ? f.TRACEROUTEinfo(e) : "3" == f.CheckPingMode() ? f.UDPECHOinfo(e) : f.NSLOOKUPinfo(e)
                },
                error: function () {}
            }) : u()
        }

        function r() {
            e.ajax({
                url: "PingMessages",
                cache: !1,
                success: function (e) {
                    f.logInfomation(e), successOverlay()
                },
                error: function () {
                    errorOverlay()
                }
            })
        }

        function s() {
            e.ajax({
                url: "TracerouteMessages",
                cache: !1,
                success: function (e) {
                    f.TRACEROUTEinfo(e), successOverlay()
                },
                error: function () {
                    errorOverlay()
                }
            })
        }

        function c() {
            e.ajax({
                url: "NslookupMessages",
                cache: !1,
                success: function (e) {
                    f.NSLOOKUPinfo(e), successOverlay()
                },
                error: function () {
                    errorOverlay()
                }
            })
        }

        function t() {
            e.ajax({
                url: "PingMessages",
                cache: !1,
                success: function (e) {
                    f.logInfomation(e)
                },
                error: function () {}
            })
        }

        function i() {
            e.ajax({
                url: "TracerouteMessages",
                cache: !1,
                success: function (e) {
                    f.TRACEROUTEinfo(e)
                },
                error: function () {}
            })
        }

        function u() {
            a.getUdpEchoInfo({}, function (o) {
                var n = e.i18n.prop("UDP_log_info_1") + o.tr069_udpechos_prcv + "\r\n" + e.i18n.prop("UDP_log_info_2") + o.tr069_udpechos_prsp + "\r\n" + e.i18n.prop("UDP_log_info_3") + o.tr069_udpechos_brcv + "\r\n" + e.i18n.prop("UDP_log_info_4") + o.tr069_udpechos_brsp + "\r\n" + e.i18n.prop("UDP_log_info_5") + o.tr069_udpechos_tfr + "\r\n" + e.i18n.prop("UDP_log_info_6") + o.tr069_udpechos_tlr;
                f.UDPECHOinfo(n), hideLoading()
            })
        }
        var l = a.getPinglogInfo(),
            f = this;
        f.enableFlag = o.observable(!0), f.IpUrl = o.observable(l.IpUrl), f.CheckPingMode = o.observable("0" == l.CheckPingMode ? "0" : 1 == l.CheckPingMode ? 1 : 2), f.udp_echo_plus_status = o.observable("1" != l.udp_echo_plus_status ? "0" : l.udp_echo_plus_status), f.logInfomation = o.observable(), f.TRACEROUTEinfo = o.observable(), f.NSLOOKUPinfo = o.observable(), f.UDPECHOinfo = o.observable(), f.traceroute_flag = o.observable(l.traceroute_flag), f.UpdIpUrl = o.observable(""), f.UpdPort = o.observable(""), f.echoPlus = o.observable(""), f.refreshStatus = function () {
            f.checkEnable(), t(), i()
        }, f.apply = function () {
            "1" == f.traceroute_flag() && "1" == f.CheckPingMode() ? showAlert("traceroute_alert") : (showLoading(), a.setPinglogInfo({
                goformId: "DIAGLOG",
                DIAG_URL: e("#DIAG_URL").val(),
                DIAG_CHECK: f.CheckPingMode()
            }, function (e) {
                "success" == e.result ? (successOverlay(), n()) : errorOverlay()
            }))
        }, f.deletepingLog = function () {
            a.setPinglogInfo({
                goformId: "DIAGLOG",
                DIAG_CHECK: "0",
                diag_del_action: "0"
            }, function (e) {
                "success" == e.result ? r() : errorOverlay()
            })
        }, f.deleteTRACELog = function () {
            a.setPinglogInfo({
                goformId: "DIAGLOG",
                DIAG_CHECK: "1",
                diag_del_action: "0"
            }, function (e) {
                "success" == e.result ? s() : errorOverlay()
            })
        }, f.deleteNSLOOKLog = function () {
            a.setPinglogInfo({
                goformId: "DIAGLOG",
                diag_del_action: "2"
            }, function (e) {
                "success" == e.result ? c() : errorOverlay()
            })
        }, f.clear = function () {
            e("#DIAG_URL").val("")
        }, f.setUDPECHOLog = function () {
            showLoading(), a.setUdpEchologInfo({
                goformId: "UDPECHO_PLUS_SETTINGS",
                client_ip: e("#UDP_URL").val(),
                port: f.UpdPort(),
                echoplus: f.echoPlus(),
                action: "start"
            }, function (e) {
                "success" == e.result ? u() : errorOverlay()
            })
        }, f.stopUDPECHOLog = function () {
            showLoading(), a.setUdpEchologInfo({
                goformId: "UDPECHO_PLUS_SETTINGS",
                action: "stop"
            }, function (e) {
                "success" == e.result ? u() : errorOverlay()
            })
        }, f.readUDPECHOLog = function () {
            showLoading(), a.setUdpEchologInfo({
                goformId: "UDPECHO_PLUS_SETTINGS",
                action: "read"
            }, function (e) {
                "success" == e.result ? u() : errorOverlay()
            })
        }, f.checkEnable = function () {
            var e = a.getStatusInfo();
            checkConnectedStatus(e.connectStatus) ? f.enableFlag(!0) : f.enableFlag(!1)
        }, f.checkEnable()
    }

    function c() {
        var n = e("#container");
        o.cleanNode(n[0]);
        var r = new s;
        o.applyBindings(r, n[0]), e("#pingLogForm").validate({
            submitHandler: function () {
                "3" != r.CheckPingMode() ? r.apply() : r.setUDPECHOLog()
            },
            rules: {
                DIAG_URL: "ping_log_url_check",
                UDP_URL: "ping_log_url_check",
                UDP_PORT: {
                    digits: !0,
                    range: [1, 65535]
                }
            }
        }), addInterval(function () {
            a.getPinglogInfo({}, function (e) {
                r.traceroute_flag(e.traceroute_flag), r.udp_echo_plus_status("1" != e.udp_echo_plus_status ? "0" : e.udp_echo_plus_status)
            })
        }, 1e3), addInterval(r.refreshStatus, 1e3), e.validator.addMethod("ping_log_url_check", function (e, o, n) {
            var a = new RegExp("^((https|http|ftp|rtsp|mms)?://)?(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((/?)|(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)$"),
                r = new RegExp("^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b).){3}(\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b).){3}(\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b).){3}(\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$");
            return this.optional(o) || a.test(e) || r.test(e)
        }, "Please enter a valid url.")
    }
    return {
        init: c
    }
});
//# sourceMappingURL=../../sourcemaps/status/ping_log.js.map