define(["jquery", "knockout", "config/config", "service", "underscore"], function (e, t, n, r, _) {
    function i() {
        l(), p()
    }

    function a(e) {
        f(e), p()
    }

    function c(e) {
        f(e), s(e), g()
    }

    function o(e) {
        l(), s(e), u(e)
    }

    function f(t) {
        var n = signalFormat(convertSignal4g(t));
        k.text(n), A.text(x(t)), U.text("" == t.cell_id ? "— —" : parseInt(t.cell_id, 16)), L.text("" == t.lte_pci ? "— —" : parseInt(t.lte_pci, 16)), h.text(frequencyFormat(t.wan_active_channel)), -1 != e.inArray(t.network_type.toUpperCase(), b) ? F.text(signalFormat_sinr(t.ecio)) : -1 == e.inArray(t.network_type.toUpperCase(), H) && -1 == e.inArray(t.network_type.toUpperCase(), R) || F.text(signalFormat_sinr(t.lte_snr))
    }

    function l() {
        h.text("— —"), A.text("— —"), k.text("— —"), F.text("— —"), L.text("— —"), U.text("— —")
    }

    function s(e) {
        m.text(getFrequency5g(e));
        var t = signalFormat(convertSignal5g(e));
        S.text(t), T.text("" == e.nr5g_pci ? "— —" : parseInt(e.nr5g_pci, 16)), D.text(signalFormat_sinr(e.Z5g_SINR)), O.text(frequencyFormat(e.nr5g_action_channel))
    }

    function u(e) {
        N.text("" == e.nr5g_cell_id ? "— —" : parseInt(e.nr5g_cell_id, 16))
    }

    function p() {
        m.text("— —"), S.text("— —"), D.text("— —"), T.text("— —"), O.text("— —"), g()
    }

    function g() {
        N.text("— —")
    }

    function E() {
        r.getSignalStrength({}, function (t) {
            -1 != t.network_type.toLowerCase().indexOf("limited_service") || -1 != t.network_type.toLowerCase().indexOf("limited service") || -1 != t.network_type.toLowerCase().indexOf("no_service") || -1 != t.network_type.toLowerCase().indexOf("no service") ? i() : -1 != e.inArray(t.network_type.toUpperCase(), Q) ? o(t) : -1 != e.inArray(t.network_type.toUpperCase(), R) ? c(t) : a(t)
        })
    }

    function d() {
        h = e("#fresh_34g_frequency"), A = e("#fresh_used_band"), k = e("#fresh_signal_network"), F = e("#fresh_34g_sinr"), L = e("#fresh_4g_pci"), U = e("#fresh_cell_id"), m = e("#fresh_used_band_5g"), S = e("#fresh_signal_network_5g"), D = e("#fresh_sinr"), T = e("#fresh_5g_pci"), O = e("#fresh_5g_frequency"), N = e("#fresh_5g_cell_id"), E(), addInterval(function () {
            E()
        }, 3e3)
    }

    function C(e) {
        if (void 0 === e || "" == e) return "";
        for (var t = e.split(";"), n = "", r = 0; r < t.length; r++)
            if ("" != t[r]) {
                var _ = t[r].split(",");
                n = n + " + " + _[5] + "MHz@" + v(_[3])
            } return n
    }

    function v(e) {
        for (var t = 0; t < n.LTE_FREQUENCY_CODE.length; t++)
            if (n.LTE_FREQUENCY_CODE[t].name == e) return n.LTE_FREQUENCY_CODE[t].value + "(B" + n.LTE_FREQUENCY_CODE[t].name + ")";
        return ""
    }

    function x(t) {
        return -1 != e.inArray(t.network_type, b) ? "" == t.wan_active_band ? "— —" : t.wan_active_band : -1 != e.inArray(t.network_type, H) || -1 != e.inArray(t.network_type, R) ? w(t) : "— —"
    }

    function w(e) {
        var t = "";
        if ("ca_deactivated" == e.wan_lte_ca || "ca_activated" == e.wan_lte_ca) {
            var r = v(e.lte_ca_pcell_band);
            t = e.lte_ca_pcell_bandwidth + "MHz@" + r + C(e.lte_multi_ca_scell_info)
        } else {
            var _ = "";
            if ("" != e.wan_active_band)
                for (var i = n.LTE_FREQUENCY_CODE.length, a = e.wan_active_band.replace(/[^0-9]/gi, ""), c = 0; c < i; c++)
                    if (n.LTE_FREQUENCY_CODE[c].name == a) {
                        _ = n.LTE_FREQUENCY_CODE[c].value + "MHz(B" + n.LTE_FREQUENCY_CODE[c].name + ")";
                        break
                    } t = _
        }
        return "" == t && (t = "— —"), t
    }

    function y() {
        var n = new d;
        t.applyBindings(n, e("#container")[0])
    }
    var h, A, k, F, L, U, m, S, D, T, O, N, b = ["UMTS", "HSDPA", "HSUPA", "HSPA", "HSPA+", "DC", "DC-HSPA", "DC-HSPA+"],
        H = ["LTE", "LTE_CA", "LTE_A", "LTE-NSA"],
        R = ["ENDC"],
        Q = ["SA"];
    return {
        init: y
    }
});
//# sourceMappingURL=../../sourcemaps/adm/network_info.js.map