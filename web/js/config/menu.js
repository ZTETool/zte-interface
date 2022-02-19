define(["knockout", "underscore", "jquery", "service", "config/config"], function (e, n, t, r, i) {
    function a() {
        function r(e) {
            return n.filter(m, function (n) {
                return n.parent && n.parent == e.hash && (n.requireLogin && i.loggedIn() || !n.requireLogin)
            })
        }
        var i = this,
            a = d();
        i.loggedIn = e.observable(a), i.showMenu = e.observable(a || p);
        var s = n.filter(m, function (e) {
            return "1" == e.level && (e.requireLogin && i.loggedIn() || !e.requireLogin) && "#login" != e.hash
        });
        i.mainMenu = e.observableArray(s), i.secondMenu = e.observableArray([]), i.curThirdMenu, i.getThirdMenu = function (e) {
            i.curThirdMenu = r(e)
        }, i.thirdMenu = function () {
            return i.curThirdMenu
        }, i.changeMenu = function (e) {
            var n = r(e);
            return 0 == n.length ? t("#container").addClass("fixContainerWidth") : t("#container").removeClass("fixContainerWidth"), i.secondMenu(n), !0
        }
    }

    function s() {
        for (var e = window.location.hash, r = n.find(m, function (n) {
                return n.hash == e
            }); r.parent;) r = n.find(m, function (e) {
            return e.hash == r.parent
        });
        if (!r.parent) {
            t("#list-nav li").removeClass("active");
            var i = r.hash.substring(1, r.hash.length);
            t("#list-nav li[mid=" + i + "]").addClass("active")
        }
        b.changeMenu(r)
    }

    function u() {
        var e = window.location.hash,
            r = n.find(m, function (n) {
                return n.hash == e
            });
        1 == r.level && o("two", r), 2 == r.level && (o("three", r), h(r.hash, r.level)), 3 == r.level && (h(r.parent, r.level), t(".menu-three-level").removeClass("active"), t(".menu-three-level." + r.hash.substring(1)).addClass("active"))
    }

    function o(e, r) {
        var i = n.find(m, function (e) {
            return e.parent == r.hash && e.path == r.path
        });
        t(".menu-" + e + "-level").removeClass("active"), i && ("two" == e && (o("three", i), h(i.hash, e)), t(".menu-" + e + "-level." + i.hash.substring(1)).addClass("active"))
    }

    function h(e, r) {
        $obj = t(".menu-two-level." + e.substring(1));
        var i = ["3", "three", "2", "two"]; - 1 != n.indexOf(i, r) && $obj.hasClass("active") || ($obj.siblings().removeClass("active"), $obj.addClass("active"), $obj.siblings().not(".menu-two-level").slideUp(), $obj.next().has("ul li").slideDown())
    }

    function l() {
        b = new a
    }

    function c(e) {
        e = e || window.location.hash;
        var t = d();
        return n.filter(m, function (n) {
            return e == n.hash && (n.requireLogin && t || !n.requireLogin)
        })
    }

    function v() {
        var e = d(),
            r = n.filter(m, function (n) {
                return "1" == n.level && (n.requireLogin && e || !n.requireLogin) && "#login" != n.hash
            });
        b.mainMenu(r), b.loggedIn(e), f(b.mainMenu().length), b.showMenu(e || p), t("#nav").translate()
    }

    function f(e) {
        var n = 100 / e;
        t("ul#list-nav li").each(function () {
            t(this).css("width", n + "%")
        })
    }

    function d() {
        return "loggedIn" == r.getLoginStatus().status
    }

    function g(e) {
        for (var n = 0; n < m.length; n++)
            if (m[n].path == e) return !0;
        return !1
    }
    var b, p = !1,
        m = [];
    if ("CPE" == i.PRODUCT_TYPE) {
        switch (i.opms_wan_mode) {
            case "LTE_BRIDGE":
                M = "menu_bridge";
                break;
            case "AUTO_LTE_GATEWAY":
                M = "menu_4ggateway";
                break;
            case "AUTO_PPPOE":
            case "AUTO_DHCP":
                M = "menu_pppoe";
                break;
            case "PPPOE":
            case "DHCP":
            case "STATIC":
                M = "menu_pppoe";
                break;
            case "PPP":
            default:
                M = "menu_4ggateway"
        }
        require(["config/" + i.DEVICE + "/" + M], function (e) {
            m = e
        })
    } else require(["config/" + i.DEVICE + "/menu"], function (e) {
        m = e, i.SD_CARD_SUPPORT && (m = m.concat([{
            hash: "#httpshare_guest",
            path: "sd/httpshare",
            level: "",
            requireLogin: !1,
            checkSIMStatus: !1
        }, {
            hash: "#sdcard",
            path: "sd/sd",
            level: "",
            requireLogin: !0,
            checkSIMStatus: !1
        }, {
            hash: "#httpshare",
            path: "sd/httpshare",
            level: "",
            requireLogin: !0,
            checkSIMStatus: !1
        }]))
    });
    var M = "";
    return m = m.concat([{
        hash: "#stk",
        path: "stk/stk",
        level: "",
        requireLogin: !0,
        checkSIMStatus: !0
    }]), {
        init: l,
        refreshMenu: s,
        findMenu: c,
        activeSubMenu: u,
        rebuild: v,
        checkIsMenuExist: g
    }
});
//# sourceMappingURL=../../sourcemaps/config/menu.js.map