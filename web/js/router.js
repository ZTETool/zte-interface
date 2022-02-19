define(["config/menu", "jquery", "config/config", "service", "underscore"], function (o, a, n, i, e) {
    function t() {
        s(), window.location.hash = window.location.hash || "#home", "onhashchange" in window && (void 0 === document.documentMode || 8 == document.documentMode) ? (window.onhashchange = r, r()) : setInterval(r, 200), a("a[href^='#']").die("click").live("click", function () {
            var o = a(this);
            return n.CONTENT_MODIFIED.checkChangMethod(), checkFormContentModify(o.attr("href"))
        })
    }

    function s() {
        setInterval(function () {
            var n = i.getStatusInfo(),
                e = o.findMenu();
            if (0 == e.length) return !1;
            var t = ["phonebook/phonebook", "sms/smslist"],
                s = -1 != a.inArray(e[0].path, t);
            if (!0 === e[0].checkSIMStatus) {
                var d = "modem_sim_undetected" == n.simStatus || "modem_sim_destroy" == n.simStatus || "modem_waitpin" == n.simStatus || "modem_waitpuk" == n.simStatus,
                    r = "modem_imsi_waitnck" == n.simStatus;
                n.isLoggedIn && (void 0 == a("#div-nosimcard")[0] && d || void 0 == a("#div-network-lock")[0] && r || (void 0 != a("#div-nosimcard")[0] || void 0 != a("#div-network-lock")[0]) && "modem_init_complete" == n.simStatus) && c(e[0], n.simStatus, s)
            }
        }, 1e3)
    }

    function d() {
        var o = window.location.hash;
        if ("#login" == o || -1 != e.indexOf(n.GUEST_HASH, o) ? a("#themeContainer").attr("style", "margin-top:-36px;") : a("#themeContainer").attr("style", "margin-top:0px;"), "#login" == window.location.hash) a("#mainContainer").addClass("loginBackgroundBlue");
        else {
            var i = a("#mainContainer");
            i.hasClass("loginBackgroundBlue") && (a("#container").css({
                margin: 0
            }), i.removeClass("loginBackgroundBlue").height("auto"))
        }
    }

    function r() {
        function t() {
            var o = i.getStatusInfo();
            void 0 == o.simStatus || -1 != a.inArray(o.simStatus, n.TEMPORARY_MODEM_MAIN_STATE) ? addTimeout(t, 500) : (c(u[0], o.simStatus, f), hideLoading())
        }
        if (window.location.hash != m) {
            var s = i.getStatusInfo();
            if ((window.location.hash == n.defaultRoute || -1 != e.indexOf(n.GUEST_HASH, window.location.hash)) && s.isLoggedIn) return void(window.location.hash = "" == m ? "#home" : m);
            var r = i.getParams({
                    nv: ["privacy_read_flag", "tr069_user_improv_notify_flag", "dm_user_grant_notify_flag"]
                }),
                l = i.getParams({
                    nv: ["web_wifi_password_remind"]
                });
            ("0" == r.privacy_read_flag || "0" == r.tr069_user_improv_notify_flag || "0" == r.dm_user_grant_notify_flag) && s.isLoggedIn && n.HAS_GDPR && "#dataCardReject" != window.location.hash ? "1" == l.web_wifi_password_remind ? window.location.hash = "#change_password" : window.location.hash = "#home" : s.isLoggedIn && ("1" == l.web_wifi_password_remind ? window.location.hash = "#change_password" : "#change_password" == window.location.hash && (window.location.hash = "#home"));
            var u = o.findMenu();
            if (0 == u.length) window.location.hash = n.defaultRoute;
            else {
                var _ = o.findMenu(m);
                if (m = u[0].hash, "#login" == m || "#dataCardReject" == m ? (a("#indexContainer").addClass("login-page-bg"), o.rebuild()) : a("#indexContainer").removeClass("login-page-bg"), 0 != _.length && u[0].path == _[0].path && u[0].level != _[0].level && "1" != u[0].level && "1" != _[0].level) return;
                d();
                var w = ["phonebook/phonebook", "sms/smslist"],
                    f = -1 != a.inArray(u[0].path, w);
                !0 === u[0].checkSIMStatus || f ? void 0 == s.simStatus ? (showLoading("waiting"), t()) : c(u[0], s.simStatus, f) : h(u[0])
            }
        }
    }

    function c(o, n, i) {
        var e = {};
        a.extend(e, o), "modem_sim_undetected" == n || "modem_sim_destroy" == n ? i || (e.path = "nosimcard") : "modem_waitpin" == n || "modem_waitpuk" == n ? e.path = "nosimcard" : "modem_imsi_waitnck" == n && (e.path = "network_lock"), h(e)
    }

    function h(n) {
        var i = n.path.replace(/\//g, "_"),
            e = a("body").removeClass();
        "nosimcard" == i || "network_lock" == i ? e.addClass("beautiful_bg page_" + i) : e.addClass("page_" + i), clearTimer(), hideLoading();
        var t = "text!tmpl/" + n.path + ".html";
        require([t, n.path], function (n, i) {
            l.stop(!0, !0), l.hide(), l.html(n), i.init(), o.refreshMenu(), a("#container").translate(), o.activeSubMenu(), a("form").attr("autocomplete", "off"), l.fadeIn()
        })
    }
    var m = "",
        l = a("#container");
    return checkFormContentModify = function (o) {
        return !n.CONTENT_MODIFIED.modified || window.location.hash == o || ("sms_to_save_draft" == n.CONTENT_MODIFIED.message ? (n.CONTENT_MODIFIED.callback.ok(n.CONTENT_MODIFIED.data), n.resetContentModifyValue(), window.location.hash = o) : showConfirm(n.CONTENT_MODIFIED.message, {
            ok: function () {
                n.CONTENT_MODIFIED.callback.ok(n.CONTENT_MODIFIED.data), n.resetContentModifyValue(), window.location.hash = o
            },
            no: function () {
                n.CONTENT_MODIFIED.callback.no(n.CONTENT_MODIFIED.data) || (window.location.hash = o, n.resetContentModifyValue())
            }
        }), !1)
    }, {
        init: t
    }
});
//# sourceMappingURL=../sourcemaps/router.js.map