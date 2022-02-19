define(["jquery", "knockout", "config/config", "service", "underscore"], function (n, t, e, i, a) {
    function r() {
        var n = this,
            e = o();
        n.natSetting = t.observable(e.nat_mode), n.save = function () {
            showLoading();
            var t = {};
            t.natSetting = n.natSetting(), i.setNatSetting(t, function (n) {
                "success" == n.result ? successOverlay() : errorOverlay()
            })
        }
    }

    function o() {
        return i.getNatSetting()
    }

    function c() {
        var e = n("#container");
        t.cleanNode(e[0]);
        var i = new r;
        t.applyBindings(i, e[0]), n("#natSettingForm").validate({
            submitHandler: function () {
                i.save()
            }
        })
    }
    return {
        init: c
    }
});
//# sourceMappingURL=../../sourcemaps/firewall/nat_setting.js.map