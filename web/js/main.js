window.zte_web_ui_is_test = !1;
var rd0 = "",
    rd1 = "",
    inputContext = "",
    currentKeyID = 0;
require.config({
    paths: {
        text: "lib/require/text",
        tmpl: "../tmpl",
        underscore: "lib/underscore/underscore",
        knockout: "lib/knockout/knockout",
        jquery: "lib/require/require-jquery",
        jq_validate: "lib/jquery/jquery.validate",
        jq_additional: "lib/jquery/additional-methods",
        jq_i18n: "lib/jquery/jquery.i18n.properties-1.0.9",
        jq_translate: "lib/jquery/translate",
        jq_tmpl: "lib/jquery/jquery.tmpl.min",
        knockoutbase: "lib/knockout/knockout-2.1.0",
        jq_simplemodal: "lib/jquery/jquery.simplemodal-1.4.2",
        base64: "lib/base64",
        jqui: "lib/jqui/jquery-ui.min",
        echarts: "lib/echarts",
        "echarts/chart/pie": "lib/echarts",
        md5: "lib/md5"
    },
    shim: {
        jq_additional: ["jq_validate"],
        jq_translate: ["jq_i18n"],
        knockoutbase: ["jq_tmpl"],
        jq_simplemodal: ["lib/bootstrap"]
    }
}), require(["service", "config/config", "util", zte_web_ui_is_test ? "simulate" : ""], function (e, i, t, a) {
    function n(e) {
        require([e.menu, e.config], function (e) {
            require(["app", "jq_additional", "jq_translate", "jq_simplemodal", "base64", "md5"], function (e) {
                e.init()
            })
        })
    }
    if (zte_web_ui_is_test && (window.simulate = a), "CPE" == i.PRODUCT_TYPE) {
        var o = "menu_4ggateway";
        e.getOpMode({}, function (e) {
            switch (i.opms_wan_mode = e.opms_wan_mode, e.opms_wan_mode) {
                case "LTE_BRIDGE":
                    o = "menu_bridge";
                    break;
                case "AUTO_LTE_GATEWAY":
                    o = "menu_4ggateway";
                    break;
                case "AUTO_PPPOE":
                case "AUTO_DHCP":
                    o = "menu_pppoe";
                    break;
                case "PPPOE":
                case "DHCP":
                case "STATIC":
                    o = "menu_pppoe";
                    break;
                case "PPP":
                default:
                    o = "menu_4ggateway"
            }
            n({
                menu: "config/" + i.DEVICE + "/" + o,
                config: "config/" + i.DEVICE + "/config"
            })
        })
    } else n({
        menu: "config/" + i.DEVICE + "/menu",
        config: "config/" + i.DEVICE + "/config"
    })
});
//# sourceMappingURL=../sourcemaps/main.js.map