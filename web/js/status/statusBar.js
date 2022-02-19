define(["knockout", "jquery", "underscore", "service", "config/config", "config/menu", "tooltip"], function (e, t, n, o, i, s, a) {
    function r() {
        function n() {
            X().isLoggedIn ? o.getSMSReady({}, function (e) {
                "1" == e.sms_cmd_status_result ? window.setTimeout(function () {
                    n()
                }, 1e3) : V = !0
            }) : window.setTimeout(function () {
                n()
            }, 1e3)
        }

        function r(e) {
            if (t("#statusItemSimStatus").attr("tipTitle", "sim_status_" + e.simStatus), 0 != e.wifiSwitchStatus) {
                0 == e.deviceSize ? (t("#wifi_status").removeAttr("tipTitle2"), t("#wifi_status").attr("tipTitle", "wifi_status_on")) : (t("#wifi_status").attr("tipTitle", "wifi_num"), t("#wifi_status").attr("tipTitle2", e.deviceSize));
                var n = t("#h_ssid");
                "1" == e.wifiSwitchStatus && e.isLoggedIn ? (n.html(setStatusBarAllSSID(e.ssid, e.mainSSID5g, !0, e.wifi_onoff_wifi5g_by_n79_mutex)), n.attr("tipTitle", setStatusBarAllSSID(e.ssid, e.mainSSID5g, !1)), n.show()) : n.hide()
            } else t("#wifi_status").removeAttr("tipTitle2"), t("#wifi_status").attr("tipTitle", "wifi_status_off")
        }

        function l(e, n, o, i) {
            e.connectStatus(n), "ppp_connecting" == n ? (e.connectStatusTrans("connecting"), e.connectStatusText(t.i18n.prop("connecting"))) : checkConnectedStatus(n) ? (e.connectStatusTrans("connected"), e.connectStatusText(t.i18n.prop("connected"))) : "ppp_disconnecting" == n ? (e.connectStatusTrans("disconnecting"), e.connectStatusText(t.i18n.prop("disconnecting"))) : o ? "connect" == i ? (e.connectStatus("wifi_connect"), e.connectStatusTrans("connected"), e.connectStatusText(t.i18n.prop("connected"))) : "connecting" == i ? (e.connectStatus("wifi_connecting"), e.connectStatusTrans("connecting"), e.connectStatusText(t.i18n.prop("connecting"))) : (e.connectStatus("ppp_disconnected"), e.connectStatusTrans("disconnected"), e.connectStatusText(t.i18n.prop("disconnected"))) : (e.connectStatusTrans("disconnected"), e.connectStatusText(t.i18n.prop("disconnected")))
        }

        function _() {
            var e = 5,
                t = 1;
            i.dbMsgs && 0 != i.dbMsgs.length || (e = 500, t = 10), o.getSMSMessages({
                page: 0,
                smsCount: e,
                nMessageStoreType: 1,
                tags: t,
                orderBy: "order by id desc"
            }, function (e) {
                e && e.messages && u(e.messages), K = !1
            })
        }
        window.setTimeout(function () {
            function s(e) {
                o.getSmsCapability({}, function (n) {
                    var o = !1;
                    0 != n.nvTotal && n.nvUsed >= n.nvTotal ? (t("#sms_unread_count").attr("tipTitle", "sms_capacity_is_full"), o = !0) : 0 != n.nvTotal && n.nvUsed + 5 >= n.nvTotal ? (t("#sms_unread_count").attr("tipTitle", "sms_capacity_will_full"), o = !0) : t("#sms_unread_count").attr("tipTitle", "sms_unread_count"), a.showSmsDeleteConfirm(o), void 0 !== e && a.smsUnreadCount(e), z = !0
                })
            }
            var a = new c;
            e.applyBindings(a, t("#statusBar")[0]), window.setInterval(function () {
                var e = X(),
                    n = t("#h_ssid");
                "1" == e.wifiSwitchStatus && e.isLoggedIn ? (n.html(setStatusBarAllSSID(e.ssid, e.mainSSID5g, !0, e.wifi_onoff_wifi5g_by_n79_mutex)), n.show()) : n.hide(), a.cpeMode = e.opms_wan_mode, a.OTAStatus(e.new_version_state), a.sleep_protection_mode_status("1" == e.is_night_mode), a.isShowConnectionIcon("CPE" != i.PRODUCT_TYPE || f(e.opms_wan_mode, e.opms_wan_auto_mode)), a.networkType(getNetworkType(e.networkType, e.isCaStatus)), a.signalCssClass(w(e.signalImg, e.networkType, e.simStatus));
                var o = !!e.roamingStatus;
                a.networkOperator(d(e.spn_b1_flag, e.spn_name_data, e.spn_b2_flag, e.networkOperator, o, e.rmcc, e.rmnc)), a.roamingStatus(e.roamingStatus ? "R" : ""), a.wifiStatusImg(v(e.wifiStatus, e.attachedDevices)), a.wifiStatusCssClass(S(e.wifiStatus, e.attachedDevices)), a.simStatus(T(e.simStatus)), a.batteryPers(I(e.battery_value, e.batteryStatus)), a.batteryLevel(e.battery_value + "%"), a.pinStatus(e.pinStatus), a.batteryStatus(e.batteryStatus), a.attachedDevices(e.attachedDevices), a.showAttachedDevices(e.wifiStatus), a.isLoggedIn(e.isLoggedIn), i.HAS_SMS && V && !b(e.simStatus) && (!z && e.isLoggedIn ? s(e.smsUnreadCount) : a.smsUnreadCount(e.smsUnreadCount)), h(a, e.opms_wan_mode, e.opms_wan_auto_mode, e.dhcp_wan_status, e.connectStatus, e.data_counter, e.connectWifiSSID, e.connectWifiStatus), l(a, e.connectStatus, e.connectWifiSSID, e.connectWifiStatus), checkTrafficLimitAlert(a, e), r({
                    simStatus: e.simStatus,
                    wifiSwitchStatus: e.wifiSwitchStatus,
                    deviceSize: e.attachedDevices,
                    networkType: e.networkType,
                    isLoggedIn: e.isLoggedIn,
                    ssid: e.ssid,
                    mainSSID5g: e.mainSSID5g
                });
                var c = t("#langLogoBar");
                e.isLoggedIn ? (c.hasClass("langborderBg") || c.addClass("langborderBg"), t("#statusBar:hidden").show()) : (c.hasClass("langborderBg") && c.removeClass("langborderBg"), t("#statusBar:visible").hide()), "AUTO" == e.opms_wan_mode && void 0 !== Q && "" != Q && Q != e.opms_wan_auto_mode && (Q = e.opms_wan_auto_mode, window.location.reload())
            }, 500), i.HAS_SMS && (window.setInterval(function () {
                a.isLoggedIn() && s()
            }, 1e4), n()), window.setInterval(function () {
                var e = X();
                1 != a.isLoggedIn() || t("#progress").is(":visible") || 0 != i.HAS_GDPR && "1" != e.privacy_read_flag || "connecting_server" != e.current_upgrade_state && "upgrading" != e.current_upgrade_state && "accept" != e.current_upgrade_state && "connect_server_success" != e.current_upgrade_state || (null == F ? (e.is_mandatory || t.modal.close(), O()) : 0 == F && (F = null))
            }, 1e3);
            var u = function () {
                if ("FOTA" == i.UPGRADE_TYPE || "OTA" == i.UPGRADE_TYPE) {
                    var e = o.getStatusInfo();
                    !e.isLoggedIn || 0 != i.HAS_GDPR && "1" != e.privacy_read_flag ? window.setTimeout(u, 1e3) : o.getUpgradeResult({}, function (e) {
                        "success" == e.upgrade_result ? P(!0) : "fail" == e.upgrade_result ? P(!1) : window.setTimeout(u, 1e3)
                    }, function () {
                        window.setTimeout(u, 1e3)
                    })
                }
            };
            u(), "TWO_PORTION" == i.UPGRADE_TYPE && window.setInterval(function () {
                var e = X();
                checkConnectedStatus(e.connectStatus) && e.isLoggedIn && (i.ALREADY_NOTICE || o.getUpdateInfoWarning({}, function (e) {
                    2 == e.upgrade_notice_flag && (i.ALREADY_NOTICE = !0, showAlert("update_notice"))
                }))
            }, 6e4);
            var _ = window.setInterval(function () {
                if (!i.ALREADY_OTA_NOTICE && i.HAS_OTA_NEW_VERSION && (q > 3 && window.clearInterval(_), q++, checkConnectedStatus(a.connectStatus()))) {
                    window.clearInterval(_), i.ALREADY_OTA_NOTICE = !0;
                    var e = X();
                    e.is_mandatory || E(e)
                }
            }, 1e3)
        }, 1200), a.init(), checkTrafficLimitAlert = function (e, n) {
            if ("#login" == window.location.hash) return !1;
            var s = i.AP_STATION_SUPPORT ? o.getStatusInfo().ap_station_enable : "undefined";
            if (i.AP_STATION_SUPPORT && (void 0 === s || "" === s)) return o.refreshAPStationStatus({}, t.noop()), !1;
            s = 1 == s;
            var a = t("#confirm-container:visible").length > 0,
                r = "CPE" == i.PRODUCT_TYPE && ("PPP" != n.opms_wan_mode && "LTE_BRIDGE" != n.opms_wan_mode && ("AUTO" != n.opms_wan_mode || "AUTO_LTE_GATEWAY" != n.opms_wan_auto_mode));
            if (!n.isLoggedIn || a || W && Y || !n.limitVolumeEnable || !s && !checkConnectedStatus(n.connectStatus) || r) return !1;
            if (G) return window.setTimeout(function () {
                G = !1
            }, 2e3), !1;
            var c = R(n);
            if (c.showConfirm && (0 == i.HAS_GDPR || "1" == n.privacy_read_flag)) {
                var d = null;
                if (c.usedPercent > 100 && !Y ? (W = Y = !0, d = {
                        msg: "traffic_beyond_disconnect_msg"
                    }) : W || (W = !0, Y = !1, d = {
                        msg: "traffic_limit_disconnect_msg",
                        params: [c.limitPercent]
                    }), null != d) {
                    if (s && "wifi_connected" == n.wan_connect_status || "no_connected" == n.wan_connect_status) return !1;
                    showConfirm(d, function () {
                        showLoading("disconnecting"), o.disconnect({}, function (e) {
                            e.result ? successOverlay() : errorOverlay()
                        })
                    })
                }
            }
        }, setStatusBarAllSSID = function (e, n, o, i) {
            var s = "";
            return o ? (s = e.length > 10 ? t.i18n.prop("ssid_title") + ":" + e.slice(0, 10) + "...;" : t.i18n.prop("ssid_title") + ":" + e + ";", "1" != i && (n.length > 10 ? s += t.i18n.prop("ssid_title_5g") + ":" + n.slice(0, 10) + "...;" : s += t.i18n.prop("ssid_title_5g") + ":" + n)) : s = e.length >= 20 || n.length >= 20 ? "1" != i ? t.i18n.prop("ssid_title") + ":" + e + ";<br>" + t.i18n.prop("ssid_title_5g") + ":" + n : t.i18n.prop("ssid_title") + ":" + e : "1" != i ? t.i18n.prop("ssid_title") + ":" + e + ";" + t.i18n.prop("ssid_title_5g") + ":" + n : t.i18n.prop("ssid_title") + ":" + e, s
        }, i.HAS_SMS && s.checkIsMenuExist("sms/smslist") && (window.setInterval(function () {
            var e = X();
            if ("#login" != window.location.hash && !b(e.simStatus)) {
                for (key in j) {
                    var n = j[key];
                    if (t.now() - n > 5e3) {
                        delete j["m" + n];
                        t(".bubbleItem#m" + n, "#buttom-bubble").fadeOut(1e3, function () {
                            t(this).remove()
                        })
                    }
                }
                e.isLoggedIn && (e.newSmsReceived && !K && (K = !0, o.resetNewSmsReceivedVar(), _()), e.smsReportReceived && (o.resetSmsReportReceivedVar(), m()))
            }
        }, 1e3), i.SMS_DATABASE_SORT_SUPPORT && window.setInterval(function () {
            if (s.checkIsMenuExist("sms/smslist")) {
                var e = X();
                e.isLoggedIn && V && !K && !b(e.simStatus) && (K = !0, _())
            }
        }, 20001)), i.HAS_SMS && (t(".bubbleItem", "#buttom-bubble").live("mouseover", function () {
            var e = t(this);
            delete j[e.attr("id")]
        }).live("mouseout", function () {
            var e = t(this),
                n = t.now();
            j["m" + n] = n, e.attr("id", "m" + n), t(".bubbleItem h3 a.bubbleCloseBtn", "#buttom-bubble").data("targetid", "m" + n)
        }), t(".bubbleItem h3 a.bubbleCloseBtn", "#buttom-bubble").die().live("click", function () {
            var e = t(this).data("targetid");
            delete j[e], t(".bubbleItem#" + e, "#buttom-bubble").fadeOut(1e3, function () {
                t(this).remove()
            })
        }))
    }

    function c() {
        var n = this,
            s = X(),
            a = t("#h_ssid");
        "1" == s.wifiSwitchStatus && s.isLoggedIn ? (a.html(setStatusBarAllSSID(s.ssid, s.mainSSID5g, !0, s.wifi_onoff_wifi5g_by_n79_mutex)), a.show()) : a.hide(), Q = s.opms_wan_auto_mode, n.cpeMode = s.opms_wan_mode, n.OTAStatus = e.observable(s.new_version_state), n.sleep_protection_mode_status = e.observable("1" == s.is_night_mode), n.isShowConnectionIcon = e.observable(!1), n.hasWifi = e.observable(i.HAS_WIFI), n.hasBattery = e.observable(i.HAS_BATTERY), n.networkType = e.observable(getNetworkType(s.networkType, s.isCaStatus)), n.signalCssClass = e.observable(w(s.signalImg, s.networkType, s.simStatus));
        var r = !!s.roamingStatus;
        n.networkOperator = e.observable(d(s.spn_b1_flag, s.spn_name_data, s.spn_b2_flag, s.networkOperator, r, s.rmcc, s.rmnc)), n.roamingStatus = e.observable(s.roamingStatus ? "R" : ""), n.wifiStatusImg = e.observable(v(s.wifiStatus, s.attachedDevices)), n.wifiStatusCssClass = e.observable(S(s.wifiStatus, s.attachedDevices)), n.simStatus = e.observable(T(s.simStatus)), n.pinStatus = e.observable(s.pinStatus), n.pinStatusText = e.observable(), n.batteryStatus = e.observable(s.batteryStatus), n.batteryPers = e.observable(I(s.battery_value, s.batteryStatus)), n.batteryLevel = e.observable(s.battery_value + "%"), n.connectStatus = e.observable(s.connectStatus), n.connectStatusText = e.observable(), n.connectStatusTrans = e.observable(), n.attachedDevices = e.observable(s.attachedDevices), n.showAttachedDevices = e.observable(s.wifiStatus), n.isLoggedIn = e.observable(s.isLoggedIn), n.showSmsDeleteConfirm = e.observable(!1), n.smsUnreadCount = e.observable(0), n.connectionCssClass = e.observable(""), h(n, s.opms_wan_mode, s.opms_wan_auto_mode, s.dhcp_wan_status, s.connectStatus, s.data_counter, s.connectWifiSSID, s.connectWifiStatus), n.wifi_5g_enable = e.observable(s.wifi_5g_enable), B(n.wifi_5g_enable());
        var c = t("#langLogoBar");
        s.isLoggedIn ? (c.hasClass("langborderBg") || c.addClass("langborderBg"), t("#statusBar:hidden").show()) : (c.hasClass("langborderBg") && c.removeClass("langborderBg"), t("#statusBar:visible").hide()), n.connect = function () {
            showLoading("connecting"), o.connect({}, function (e) {
                e.result && refreshConnectStatus(n, e.status), successOverlay()
            }, function (e) {
                errorOverlay()
            })
        }, n.disconnect = function () {
            showLoading("disconnecting"), o.disconnect({}, function (e) {
                e.result && refreshConnectStatus(n, e.status), successOverlay()
            }, function (e) {
                errorOverlay()
            })
        }
    }

    function d(e, t, n, o, i, s, a) {
        return "46008" == o && (o = "中国移动"), "460" != s || "20" != a && "24" != a ? "" == t ? o : (t = decodeMessage(t), "1" == e && "1" == n ? i ? o : t == o ? o : t + "  " + o : "1" == e ? t == o ? o : t + "  " + o : "1" == n ? i ? o : t : "0" == e && "0" == n ? i ? t == o ? o : t + "  " + o : t : "") : "中国广电"
    }

    function u(e) {
        i.dbMsgs || (i.dbMsgs = []), 0 == Z.length && t.each(i.dbMsgs, function (e, t) {
            Z.push(t.id)
        }), t.each(e, function (e, n) {
            if (-1 == t.inArray(n.id, Z)) Z.push(n.id), i.dbMsgs.push(n), "1" == n.tag && _(n, !1);
            else
                for (var o = 0; o < i.dbMsgs.length; o++)
                    if (i.dbMsgs[o].id == n.id && i.dbMsgs[o].content != n.content && "1" == n.tag) {
                        i.dbMsgs[o].content = n.content, _(n, !0);
                        break
                    }
        }), i.listMsgs = l(i.dbMsgs)
    }

    function l(e) {
        var o = {},
            s = [];
        return i.listMsgs = [], groupDrafts = [], t.each(e, function (e, t) {
            if ("4" == t.tag && "" != t.groupId) return void groupDrafts.push(t);
            t.target = t.number, parseInt(t.id, 10) > i.smsMaxId && (i.smsMaxId = t.id);
            var n = getLast8Number(t.number);
            n in o ? o[n].push(t) : (o[n] = [t], s.push(t))
        }), s = n.sortBy(s, function (e) {
            return 0 - parseInt(e.id + "", 10)
        }), t.each(s, function (e, t) {
            for (var n = getLast8Number(t.number), s = 0, a = !1, r = 0; r < o[n].length; r++) o[n][r].isNew && s++, "4" == o[n][r].tag && "" == o[n][r].groupId && (a = !0);
            i.listMsgs.push({
                id: o[n][0].id,
                name: "",
                number: o[n][0].number,
                latestId: o[n][0].id,
                totalCount: o[n].length,
                newCount: s,
                latestSms: o[n][0].content,
                latestTime: o[n][0].time,
                checked: !1,
                itemId: getLast8Number(n),
                groupId: o[n][0].groupId,
                hasDraft: a
            })
        }), i.listMsgs
    }

    function _(e, n) {
        i.smsMaxId = e.id;
        var s = t.now();
        j["m" + s] = s;
        var a = e.number;
        $ && i.phonebook && 0 == i.phonebook.length && ($ = !1, i.HAS_PHONEBOOK ? p() : i.phonebook = []);
        for (_ in i.phonebook)
            if (getLast8Number(i.phonebook[_].pbm_number) == getLast8Number(e.number)) {
                a = i.phonebook[_].pbm_name;
                break
            } var r = {
            mark: "m" + s,
            name: a,
            title: t.i18n.prop("sms"),
            titleTrans: "sms",
            tag: e.tag,
            content: e.content,
            datetime: e.time
        };
        if (null == ee && (ee = t.template("newMessagePopTmpl", t("#newMessagePopTmpl"))), t(".bubbleItem:not(.report)", "#buttom-bubble").remove(), t.tmpl("newMessagePopTmpl", r).appendTo("#buttom-bubble"), "#sms" == window.location.hash || "#smslist" == window.location.hash) {
            var c = i.currentChatObject && i.currentChatObject == getLast8Number(e.number),
                d = getLast8Number(e.number),
                u = t("#smslist-item-" + d),
                l = "";
            if (u && u.length > 0) {
                for (var _ = 0; i.listMsgs && _ < i.listMsgs.length; _++)
                    if (getLast8Number(i.listMsgs[_].number) == getLast8Number(e.number)) {
                        i.listMsgs[_].id = e.id, i.listMsgs[_].latestId = e.id, i.listMsgs[_].latestSms = e.content, i.listMsgs[_].latestTime = e.time, n || (i.listMsgs[_].newCount++, i.listMsgs[_].totalCount++), l = HTMLEncode(e.content);
                        break
                    } if (u.find(".smslist-item-checkbox p.checkbox").attr("id", e.id), u.find(".smslist-item-checkbox input:checkbox").val(e.id).attr("id", "checkbox" + e.id), !n) {
                    var m = u.find(".smslist-item-total-count").text();
                    if (m = Number(m.substring(1, m.length - 1)), u.find(".smslist-item-total-count").text("(" + (m + 1) + ")"), !i.currentChatObject || i.currentChatObject != getLast8Number(e.number)) {
                        var f = u.find(".smslist-item-new-count").removeClass("hide");
                        f && f.text().length > 0 ? f.text(Number(f.text()) + 1) : (f.text(1), u.hasClass("font-weight-bold") || u.addClass("font-weight-bold"), u.find(".cursorhand").attr("title", l), u.find(".sms-table-content").html(l))
                    }
                }
                var g = u.find(".smslist-item-msg span").text(e.content);
                g.closest("td").prop("title", e.content), i.currentChatObject && i.currentChatObject == getLast8Number(e.number) ? g.closest("tr").removeClass("font-weight-bold") : g.closest("tr").addClass("font-weight-bold"), u.find(".smslist-item-repeat span").die().click(function () {
                    forwardClickHandler(e.id)
                }), u.find("span.clock-time").text(e.time);
                var w = u;
                u.hide().remove(), t("#smslist-table").prepend(w.show())
            } else {
                var b = "";
                if (i.phonebook && i.phonebook.length > 0)
                    for (_ in i.phonebook)
                        if (getLast8Number(i.phonebook[_].pbm_number) == getLast8Number(e.number)) {
                            b = i.phonebook[_].pbm_name;
                            break
                        } var h = {
                    id: e.id,
                    name: b,
                    number: e.number,
                    latestId: e.id,
                    totalCount: 1,
                    newCount: c ? 0 : 1,
                    latestSms: e.content,
                    latestTime: e.time,
                    checked: !1,
                    hasDraft: !1,
                    itemId: getLast8Number(e.number)
                };
                null == J && (J = t.template("smsTableTmpl", t("#smsTableTmpl"))), t.tmpl("smsTableTmpl", {
                    data: [h]
                }).prependTo("#smslist-table")
            }
            if (i.HAS_PHONEBOOK ? t(".sms-add-contact-icon").removeClass("hide") : t(".sms-add-contact-icon").addClass("hide"), c) {
                var v = t("#talk-item-" + e.id, "#chatlist");
                v && v.length > 0 ? (t(".J_content pre", v).html(dealContent(e.content)), t(".time .smslist-item-time", v).text(e.time), t(".smslist-item-repeat", v).die().click(function () {
                    forwardClickHandler(e.id)
                }), t(".smslist-item-delete", v).die().click(function () {
                    deleteSingleItemClickHandler(e.id)
                })) : (t("#smsOtherTmpl").tmpl(e).appendTo("#chatlist"), t(".clear-container", "#chatpanel").animate({
                    scrollTop: t("#chatlist").height()
                })), i.SMS_SET_READ_WHEN_COMPLETE ? i.SMS_SET_READ_WHEN_COMPLETE && e.receivedAll && o.setSmsRead({
                    ids: [e.id]
                }, t.noop) : o.setSmsRead({
                    ids: [e.id]
                }, t.noop)
            }
            enableCheckbox(t("#smslist-checkAll"))
        }
    }

    function m() {
        $ && i.phonebook && 0 == i.phonebook.length && ($ = !1, i.HAS_PHONEBOOK ? p() : i.phonebook = []), o.getSMSDeliveryReport({
            page: 0,
            smsCount: 10
        }, function (e) {
            var n = e.messages,
                o = [];
            t.each(n, function (e, n) {
                -1 == t.inArray(n.number, o) && (o.push(n.number), window.setTimeout(function () {
                    var o = t.now();
                    j["m" + o] = o, n.name = n.number;
                    for (e in i.phonebook)
                        if (getLast8Number(i.phonebook[e].pbm_number) == getLast8Number(n.number)) {
                            n.name = i.phonebook[e].pbm_name;
                            break
                        } var s = t.i18n.prop("sms_delivery_report_" + n.content),
                        a = {
                            mark: "m" + o,
                            name: n.name,
                            title: t.i18n.prop("sms_report"),
                            titleTrans: "sms_report",
                            content: s,
                            datetime: n.time,
                            report: "report"
                        };
                    null == ee && (ee = t.template("newMessagePopTmpl", t("#newMessagePopTmpl"))), t(".report", "#buttom-bubble").remove(), t.tmpl("newMessagePopTmpl", a).appendTo("#buttom-bubble")
                }, 100))
            })
        }, function () {})
    }

    function p() {
        g(o.getPhoneBooks({
            page: 0,
            data_per_page: 2e3,
            orderBy: "id",
            isAsc: !1
        }))
    }

    function f(e, t) {
        return "AUTO" != e ? "STATIC" != e && "DHCP" != e && "PPPOE" != e : "AUTO_DHCP" != t && "AUTO_STATIC" != t && "AUTO_PPPOE" != t
    }

    function g(e) {
        t.isArray(e.pbm_data) && e.pbm_data.length > 0 && (i.phonebook = e.pbm_data)
    }

    function w(e, t, n) {
        return t = t.toLowerCase(), n = n ? n.toLowerCase() : "", "" != t && "limited_service" != t && "no_service" != t && "limited service" != t && "no service" != t && "modem_init_complete" == n || (e = "_none"), "signal signal" + e
    }

    function b(e) {
        return "modem_sim_undetected" == e || "modem_undetected" == e || "modem_sim_destroy" == e || "modem_waitpin" == e || "modem_waitpuk" == e || "modem_imsi_waitnck" == e
    }

    function h(e, t, n, i, s, a, r, c) {
        var d = "icon_connection ";
        if ("AUTO" == t && "AUTO_DHCP" == n) d += "1" == i ? "connectionNone" : "disconnect";
        else if ("ppp_disconnected" == s) {
            if (r && "connect" == c) return void o.getHotspotList({}, function (t) {
                for (var n = "icon_connection ", o = "connecting ", i = 0, s = t.hotspotList.length; i < s; i++)
                    if ("1" == t.hotspotList[i].connectStatus) {
                        o = "wifi_connected";
                        break
                    } n += o, e.connectionCssClass(n)
            });
            d += r && "connecting" == c ? "connecting" : "disconnect"
        } else "ppp_connecting" == s || "wifi_connecting" == s ? d += "connecting" : checkConnectedStatus(s) ? "0" != a.uploadRate && "0" != a.downloadRate ? d += "connectionBoth" : "0" != a.uploadRate && "0" == a.downloadRate ? d += "connectionUp" : "0" == a.uploadRate && "0" != a.downloadRate ? d += "connectionDown" : d += "connectionNone" : d += "disconnect";
        e.connectionCssClass(d)
    }

    function v(e, t) {
        return e ? 0 == t ? "./img/wifi0.png" : "./img/wifi" + t + ".png" : "./img/wifi_off.png"
    }

    function S(e, t) {
        return e ? 0 == t ? "wifi_status0" : "wifi_status" + t : "wifi_status_off"
    }

    function T(e) {
        var t;
        switch (e) {
            case "modem_init_complete":
                t = "./img/ic_indicator_sd.png";
                break;
            case "modem_waitpin":
            case "modem_waitpuk":
            case "modem_sim_undetected":
            case "modem_undetected":
            case "modem_imsi_waitnck":
            case "modem_sim_destroy":
            case "modem_destroy":
                t = "./img/ic_indicator_sim_undetected.png";
                break;
            default:
                t = "./img/ic_indicator_sd.png"
        }
        return t
    }

    function I(e, t) {
        var n = parseInt(e);
        return "0" == t ? n >= 0 && n <= 5 ? "img/battery_out.png" : n > 5 && n <= 25 ? "img/battery_one.png" : n > 25 && n <= 50 ? "img/battery_two.png" : n > 50 && n < 100 ? "img/battery_three.png" : "img/battery_full.png" : "2" == t ? "img/battery_full.png" : "img/battery_charging.gif"
    }

    function P(e) {
        if (t("#loading").is(":visible") || t("#confirm").is(":visible")) window.setTimeout(function () {
            P(e)
        }, 1e3);
        else {
            var n = e ? "ota_update_success" : "ota_update_failed";
            e ? showInfo(n, function () {
                "OTA" == i.UPGRADE_TYPE && o.clearUpdateResult({}, t.noop())
            }) : showAlert(n, function () {
                "OTA" == i.UPGRADE_TYPE && o.clearUpdateResult({}, t.noop())
            })
        }
    }

    function A() {
        "low_battery" == o.getCurrentUpgradeState().current_upgrade_state && (showInfo("ota_low_battery"), clearInterval(te))
    }

    function O() {
        function e() {
            var n = ["upgrade_pack_redownload", "upgrade_prepare_install", "low_battery", "connecting_server", "connect_server_success", "upgrading", "accept"],
                i = o.getCurrentUpgradeState();
            "fota_idle" == i.current_upgrade_state.toLowerCase() ? addTimeout(e, 1e3) : -1 != t.inArray(i.current_upgrade_state, n) && (hideLoading(), D())
        }
        F = !0;
        var n = X();
        t("#progress").is(":visible") || 0 != i.HAS_GDPR && "1" != n.privacy_read_flag || e();
        var s = 0,
            a = function () {
                var e = null;
                s <= 3 ? (s += 1, e = o.getCurrentUpgradeState()) : e = X();
                var t = e.current_upgrade_state;
                if (F) {
                    if ("connecting_server" == t);
                    else {
                        if ("connect_server_failed" == t) return F = !1, window.clearTimeout(ne), hideProgressBar(), void showAlert("ota_connect_server_failed");
                        if ("connect_server_success" == t);
                        else if ("upgrading" == t) k();
                        else if ("download_success" == t);
                        else if ("upgrade_pack_check_ok" == t);
                        else {
                            if ("download_failed" == t) return hideProgressBar(), F = !1, showAlert("ota_download_failed"), void window.clearTimeout(ne);
                            if ("server_unavailable" == t) return hideProgressBar(), F = !1, showAlert("ota_connect_server_failed"), void window.clearTimeout(ne);
                            if ("network_unavailable" == t) return hideProgressBar(), F = !1, showAlert("ota_no_network"), void window.clearTimeout(ne);
                            if ("pkg_exceed" == t) return hideProgressBar(), F = !1, showAlert("ota_pkg_exceed"), void window.clearTimeout(ne);
                            if ("accept" == t);
                            else {
                                if ("low_battery" == t) return hideProgressBar(), F = !1, showInfo("ota_low_battery"), void window.clearTimeout(ne);
                                if ("upgrade_pack_error" == t) return hideProgressBar(), F = !1, showInfo("ota_md5_error"), void window.clearTimeout(ne);
                                if ("upgrade_prepare_install" == t) return hideProgressBar(), F = !1, o.removeTimerThings("current_upgrade_state", function () {}), showInfo("ota_download_success"), window.clearTimeout(ne), void(te = setInterval(function () {
                                    A()
                                }, 1e3));
                                if ("checking" == t || "fota_idle" == t);
                                else if ("upgrade_pack_redownload" != t) return F = !1, hideProgressBar(), void window.clearTimeout(ne)
                            }
                        }
                    }
                    ne = window.setTimeout(a, 1e3)
                }
            };
        F ? ne = window.setTimeout(a, 100) : window.clearTimeout(ne)
    }

    function C(e) {
        var t = o.getUserChoice();
        if (e) {
            var n = X();
            if (!checkConnectedStatus(n.connectStatus) && "connect" != n.connectWifiStatus) return void showAlert("ota_network_disconnected");
            "none" == t.if_has_select ? y() : "accept" == t.if_has_select ? O() : "cancel" == t.if_has_select ? showAlert("ota_have_cancel") : "downloading_cancel" == t.if_has_select && showAlert("ota_have_cancel")
        } else "none" == t.if_has_select ? L() : "accept" == t.if_has_select ? O() : "cancel" == t.if_has_select || t.if_has_select
    }

    function k() {
        o.getPackSizeInfo({}, function (e) {
            var n;
            n = 0 == parseInt(e.pack_total_size) ? 0 : parseInt(100 * parseInt(e.download_size) / parseInt(e.pack_total_size)), n > 100 && (n = 100), n > 0 && (n > 95 && showProgressBar("ota_update", "<br/>" + t.i18n.prop("ota_update_warning")), setProgressBar(n))
        })
    }

    function y() {
        o.setUpgradeSelectOp({
            selectOp: "1"
        }, function (e) {
            "success" == e.result && O()
        })
    }

    function L() {
        o.setUpgradeSelectOp({
            selectOp: "0"
        }, function (e) {})
    }

    function D() {
        if (o.getMandatory().is_mandatory) showProgressBar("ota_update", "<br/>" + t.i18n.prop("ota_update_warning"));
        else {
            var e = "";
            "OTA" == i.UPGRADE_TYPE && (e = "<br/><br/><button id='btnStopUpgrade' onclick='stopOTAUpgrade();' class='btn-1 btn-primary'>" + t.i18n.prop("cancel") + "</button>"), showProgressBar("ota_update", "<br/>" + t.i18n.prop("ota_update_warning") + e)
        }
        setProgressBar(0)
    }

    function E(e) {
        var n = e.current_upgrade_state;
        if ("upgrade_pack_redownload" == n) showConfirm("ota_interrupted", {
            ok: function () {
                C(1)
            },
            no: function () {
                C(0)
            }
        });
        else {
            var i = ["upgrade_prepare_install", "low_battery", "connecting_server", "connect_server_success", "upgrading", "accept"];
            if (-1 != t.inArray(n, i)) O();
            else {
                var s = o.getNewVersionInfo(),
                    a = "";
                s.dm_new_version && (a = "<br/>" + t.i18n.prop("ota_version") + s.dm_new_version);
                var r = "",
                    c = o.getParams({
                        nv: ["newsoftware_remind_times"]
                    }).newsoftware_remind_times;
                c > 1 ? r = "<br/>" + t.i18n.prop("postpone_time", c) : 1 == c && (r = "<br/>" + t.i18n.prop("ota_new_version_postpone_last_time")), showConfirm(t.i18n.prop("ota_new_version") + a + r, {
                    ok: function () {
                        C(1)
                    },
                    no: function () {
                        C(0)
                    }
                }, 140, "yes", "postpone")
            }
        }
    }

    function M(e) {
        W = !!e, Y = !!e, e || (G = !0)
    }

    function N(e) {
        Y = !!e, e || (G = !0)
    }

    function R(e) {
        var t = {
            showConfirm: !1,
            limitPercent: e.limitVolumePercent
        };
        if ("1" == e.limitVolumeType) {
            var n = parseInt(e.data_counter.monthlySent, 10) + parseInt(e.data_counter.monthlyReceived, 10);
            t.usedPercent = n / e.limitVolumeSize * 100, t.usedPercent > t.limitPercent && (t.showConfirm = !0, t.type = "data")
        } else t.usedPercent = e.data_counter.monthlyConnectedTime / e.limitVolumeSize * 100, t.usedPercent > t.limitPercent && (t.showConfirm = !0, t.type = "time");
        return t
    }

    function B(e) {
        function t() {
            var e = o.getStatusInfo();
            "0" == e.radio_off || "1" == e.radio_off ? successOverlay() : n <= 20 ? (n += 1, addTimeout(function () {
                t()
            }, 2e3)) : successOverlay()
        }
        if ("0" == e) {
            var n = 0;
            o.getWifiAdvance({}, function (e) {
                if ("a" == e.wifiBand) {
                    var n = {};
                    n.name = "wifi_5g_enable", n.value = "1", o.setNV(n, function () {
                        showConfirm("wifi_5g_enalbe_alert", function () {
                            showLoading(), o.setWifiBand({
                                wifiEnabled: "1",
                                wifi_band: "b"
                            }, function (e) {
                                "success" == e.result ? setTimeout(function () {
                                    t()
                                }, 2e3) : errorOverlay()
                            })
                        })
                    })
                }
            })
        }
    }

    function U() {
        var e = window.location.href;
        if (-1 != e.indexOf("?no_connect")) {
            var t = o.getStatusInfo();
            "PPPOE" == t.opms_wan_mode || ("AUTO" == t.opms_wan_mode || "AUTO_BACKUP" == t.opms_wan_mode) && "AUTO_PPPOE" == t.opms_wan_auto_mode ? window.location.href = e.slice(0, e.indexOf("?no_connect")) + "#net_setting" : window.location.href = e.slice(0, e.indexOf("?no_connect")) + "#home"
        } else -1 != e.indexOf("?flow_beyond") ? window.location.href = e.slice(0, e.indexOf("?flow_beyond")) + "#traffic_alert" : -1 != e.indexOf("?fota_upgrade") ? window.location.href = e.slice(0, e.indexOf("?fota_upgrade")) + "#ota_update" : window.location.hash = "#home"
    }

    function x() {
        if ("#login" != window.location.hash) {
            var e = window.location.href;
            window.location.href = e.slice(0, e.indexOf("?no_connect")) + "#home"
        }
    }

    function H(e) {
        var t = o.getStatusInfo(),
            n = window.location.href; - 1 != window.location.href.indexOf("?no_connect") ? "PPPOE" == t.opms_wan_mode || ("AUTO" == t.opms_wan_mode || "AUTO_BACKUP" == t.opms_wan_mode) && "AUTO_PPPOE" == t.opms_wan_auto_mode ? e ? showPromptNoImg("pppoe_error_jump_login", function () {
            window.location.href = n.slice(0, n.indexOf("?no_connect")) + "#net_setting"
        }) : showPromptNoImg("pppoe_error_jump") : "modem_init_complete" == t.simStatus ? "0" == t.ppp_dial_conn_fail_counter || "" == t.ppp_dial_conn_fail_counter ? e ? showPromptNoImg("no_connect_jump_login", function () {
            x()
        }) : showPromptNoImg("no_connect_jump") : e ? showPromptNoImg("connect_failed_jump_login", function () {
            x()
        }) : showPromptNoImg("connect_failed_jump") : "modem_sim_undetected" == t.simStatus ? showPromptNoImg("no_simcard_jump", function () {
            x()
        }) : "modem_sim_destroy" == t.simStatus || "modem_destroy" == t.simStatus ? showPromptNoImg("invalid_simcard_jump", function () {
            x()
        }) : "modem_imsi_waitnck" == t.simStatus || "modem_waitpin" == t.simStatus || "modem_waitpuk" == t.simStatus ? e ? showPromptNoImg("locked_simcard_jump_login", function () {
            x()
        }) : showPromptNoImg("locked_simcard_jump") : e ? showPromptNoImg("connect_failed_jump_login", function () {
            x()
        }) : showPromptNoImg("connect_failed_jump") : -1 != window.location.href.indexOf("?flow_beyond") ? e ? showPromptNoImg("flow_beyond_jump_login", function () {
            o.setRedirectOff(), window.location.href = n.slice(0, n.indexOf("?flow_beyond")) + "#traffic_alert"
        }) : showPromptNoImg("flow_beyond_jump", function () {
            o.setRedirectOff()
        }) : -1 != window.location.href.indexOf("?fota_upgrade") && (e ? showPromptNoImg("fota_upgrade_jump_login", function () {
            o.setRedirectOff(), window.location.href = n.slice(0, n.indexOf("?fota_upgrade")) + "#ota_update"
        }) : showPromptNoImg("fota_upgrade_jump", function () {
            o.setRedirectOff()
        }))
    }
    var j = {},
        W = !1,
        Y = !1,
        G = !1,
        V = !1,
        z = !1,
        K = !1,
        F = null,
        q = 0,
        J = null,
        Q = "",
        X = function () {
            return o.getStatusInfo()
        },
        Z = [],
        $ = !0,
        ee = null;
    gotoSmsList = function () {
        var e = "#sms";
        "#sms" == window.location.hash && (e = "#smslist"), checkFormContentModify(e) && (window.location.hash = e)
    };
    var te = 0,
        ne = 0;
    return showOTAAlert = function () {
        if (o.getMandatory().is_mandatory) O();
        else {
            var e = {};
            e = o.getCurrentUpgradeState(), E(e)
        }
    }, stopOTAUpgrade = function () {
        o.setUpgradeSelectOp({
            selectOp: "2"
        }, function (e) {}), F = !1, window.clearTimeout(ne), hideLoading(), showAlert("ota_cancel")
    }, {
        init: r,
        setTrafficAlertPopuped: M,
        setTrafficAlert100Popuped: N,
        getTrafficResult: R,
        showOTAAlert: showOTAAlert,
        gotoRelevantHashByFlag: U,
        setRedirectTips: H
    }
});
//# sourceMappingURL=../../sourcemaps/status/statusBar.js.map