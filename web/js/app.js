define(["config/menu", "language", "logout", "status/statusBar", "router", "login", "config/config"], function (i, n, t, a, o, c, r) {
    function u() {
        i.init(), n.init(), o.init(), t.init(), a.init(), r.HAS_GDPR ? ($("#privacy_span").show(), $("#privacy_a").show()) : ($("#privacy_span").hide(), $("#privacy_a").hide())
    }
    return {
        init: u
    }
});
//# sourceMappingURL=../sourcemaps/app.js.map